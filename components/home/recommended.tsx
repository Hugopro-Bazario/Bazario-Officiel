import Link from "next/link"
import { Wand2, ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { PRODUCTS } from "@/lib/data"

export function Recommended() {
  const products = [...PRODUCTS].reverse().slice(0, 5)

  return (
    <section className="container py-12 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wand2 className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Sélection IA
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Recommandé pour vous
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Notre algorithme a analysé 3 200 articles pour vous proposer ces 5 produits.
            </p>
          </div>
        </div>
        <Link
          href="/search"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all md:inline-flex"
        >
          Voir plus
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
