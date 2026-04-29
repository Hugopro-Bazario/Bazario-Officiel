import { ProductCard } from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/products";

const PAGE_SIZE = 24;

interface SearchProps {
  page?: string;
  niche?: string;
  sort?: string;
  min?: string;
  max?: string;
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchProps> }) {
  const params = await searchParams;
  const page = Math.max(Number(params.page || "1") || 1, 1);
  const niche = params.niche || "";
  const min = Number(params.min || "0") || 0;
  const max = Number(params.max || "0") || 0;
  const sort = params.sort || "new";

  let products = await getAllProducts({ niche: niche || undefined, limit: 200 });

  products = products.filter((product) => product.price >= min && (max === 0 || product.price <= max));
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);

  const niches = Array.from(new Set(products.map((product) => product.niche).filter(Boolean)));
  const totalPages = Math.max(Math.ceil(products.length / PAGE_SIZE), 1);
  const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Catalogue</h1>
      <form className="grid gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 md:grid-cols-4">
        <select name="niche" defaultValue={niche} className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
          <option value="">Toutes les niches</option>
          {niches.map((entry) => (
            <option key={entry} value={entry!}>
              {entry}
            </option>
          ))}
        </select>
        <select name="sort" defaultValue={sort} className="rounded-md border border-zinc-300 px-3 py-2 text-sm">
          <option value="new">Nouveautes</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix decroissant</option>
        </select>
        <input name="min" type="number" defaultValue={min || ""} placeholder="Prix min" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" />
        <input name="max" type="number" defaultValue={max || ""} placeholder="Prix max" className="rounded-md border border-zinc-300 px-3 py-2 text-sm" />
        <input type="hidden" name="page" value="1" />
        <button className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white md:col-span-4" type="submit">
          Appliquer les filtres
        </button>
      </form>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>
          Page {page} / {totalPages}
        </span>
        <div className="flex gap-2">
          {page > 1 ? (
            <a
              className="rounded-md border border-zinc-300 px-3 py-2"
              href={`?page=${page - 1}&niche=${encodeURIComponent(niche)}&sort=${encodeURIComponent(sort)}&min=${min || ""}&max=${max || ""}`}
            >
              Precedent
            </a>
          ) : null}
          {page < totalPages ? (
            <a
              className="rounded-md border border-zinc-300 px-3 py-2"
              href={`?page=${page + 1}&niche=${encodeURIComponent(niche)}&sort=${encodeURIComponent(sort)}&min=${min || ""}&max=${max || ""}`}
            >
              Suivant
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
