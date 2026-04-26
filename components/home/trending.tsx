import Link from "next/link"
import { Flame, ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { PRODUCTS } from "@/lib/data"

export function Trending() {
  const products = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 5)

  return (
    <section className="container py-10">
      <div className="mb-6 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Flame className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Tendances chez Bazario
            </h2>
            <p className="text-sm text-muted-foreground">
              Les produits les plus vendus cette semaine.
            </p>
          </div>
        </div>
        <Link
          href="/search?sort=popular"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Voir tout
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
