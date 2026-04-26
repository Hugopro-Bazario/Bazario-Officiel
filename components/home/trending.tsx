import Link from "next/link"
import { Flame, ArrowRight, TrendingUp } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { PRODUCTS } from "@/lib/data"

export function Trending() {
  const products = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 5)

  return (
    <section className="container py-12 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Flame className="h-6 w-6" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Top semaine
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                <TrendingUp className="h-3 w-3" />
                +24% vs semaine dernière
              </span>
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Tendances chez Bazario
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Les produits les plus achetés cette semaine, validés par 280k acheteurs.
            </p>
          </div>
        </div>
        <Link
          href="/search?sort=popular"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all md:inline-flex"
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
