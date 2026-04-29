alter table if exists public.products
add column if not exists slug text;

update public.products
set slug = lower(
  regexp_replace(
    regexp_replace(coalesce(title, cj_product_id), '[^a-zA-Z0-9]+', '-', 'g'),
    '(^-|-$)',
    '',
    'g'
  )
)
where slug is null;

create unique index if not exists products_slug_unique_idx on public.products (slug);
