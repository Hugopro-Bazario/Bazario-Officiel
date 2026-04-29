create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  cj_product_id text unique not null,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  compare_price numeric(10, 2),
  cost_price numeric(10, 2),
  currency text not null default 'EUR',
  images jsonb not null default '[]'::jsonb,
  stock integer not null default 0,
  niche text,
  is_hero boolean not null default false,
  is_active boolean not null default true,
  cj_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public peut lire les produits actifs" on public.products;
create policy "Public peut lire les produits actifs"
on public.products
for select
to anon
using (is_active = true);
