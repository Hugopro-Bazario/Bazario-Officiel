import Link from "next/link"
import { Wand2, ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { PRODUCTS } from "@/lib/data"

export function Recommended() {
  // For demo: show last 5 products. Will use user history later.
  const products = [...PRODUCTS].reverse().slice(0, 5)

  return (
    <section className="container py-10">
      <div className="mb-6 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Wand2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Recommandé pour vous
            </h2>
            <p className="text-sm text-muted-foreground">
              Sélection personnalisée selon vos centres d&apos;intérêt.
            </p>
          </div>
        </div>
        <Link
          href="/search"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
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
