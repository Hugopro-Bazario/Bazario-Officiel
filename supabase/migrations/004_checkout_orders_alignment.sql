-- Migration d'alignement orders vers le schema checkout (non destructive)

-- 1) Colonnes manquantes
alter table if exists public.orders
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists stripe_payment_intent_id text,
  add column if not exists customer_phone text,
  add column if not exists shipping_address jsonb,
  add column if not exists items jsonb default '[]'::jsonb,
  add column if not exists subtotal numeric(10, 2),
  add column if not exists shipping_cost numeric(10, 2) default 0,
  add column if not exists tax numeric(10, 2) default 0,
  add column if not exists total numeric(10, 2),
  add column if not exists cj_order_id text,
  add column if not exists cj_tracking_number text,
  add column if not exists cj_fulfillment_attempts integer default 0,
  add column if not exists cj_last_error text,
  add column if not exists tracking_event_id text,
  add column if not exists notes text;

-- 2) Retro-compatibilite donnees existantes
update public.orders
set subtotal = coalesce(subtotal, total_amount),
    total = coalesce(total, total_amount),
    items = case
      when items is null or items = '[]'::jsonb then
        case
          when payload is not null and payload ? 'items' then payload -> 'items'
          else '[]'::jsonb
        end
      else items
    end
where subtotal is null
   or total is null
   or items is null
   or items = '[]'::jsonb;

-- 3) Contrainte id + PK sur id (on conserve reference pour compatibilite)
update public.orders
set id = gen_random_uuid()
where id is null;

alter table public.orders
  alter column id set not null;

do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname = 'orders_pkey'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders drop constraint orders_pkey;
  end if;
end $$;

alter table public.orders
  add constraint orders_pkey primary key (id);

alter table public.orders
  add constraint orders_reference_unique unique (reference);

-- 4) Contrainte status
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_status_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders
      add constraint orders_status_check check (
        status in (
          'pending',
          'paid',
          'fulfillment_pending',
          'fulfillment_review',
          'fulfillment_failed',
          'shipped',
          'delivered',
          'cancelled',
          'refunded',
          'failed'
        )
      );
  end if;
end $$;

-- 5) Index demandes
create unique index if not exists orders_stripe_session_id_uidx on public.orders (stripe_session_id);
create index if not exists orders_customer_email_idx on public.orders (customer_email);
create index if not exists orders_status_idx on public.orders (status);

-- 6) Trigger updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

-- 7) RLS: table privee (pas de policy publique)
alter table public.orders enable row level security;

do $$
declare
  p record;
begin
  for p in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'orders'
      and policyname <> 'service role manages orders'
  loop
    execute format('drop policy if exists %I on public.orders', p.policyname);
  end loop;
end $$;

drop policy if exists "service role manages orders" on public.orders;
create policy "service role manages orders"
on public.orders
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
