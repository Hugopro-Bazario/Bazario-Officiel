import Link from "next/link"
import Image from "next/image"
import {
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  Dumbbell,
  Baby,
  Car,
  ShoppingBasket,
} from "lucide-react"
import { CATEGORIES } from "@/lib/data"

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  Dumbbell,
  Baby,
  Car,
  ShoppingBasket,
}

export function CategoriesGrid() {
  return (
    <section className="container py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Catégories populaires
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Explorez nos univers les plus tendance.
          </p>
        </div>
        <Link
          href="/search"
          className="hidden text-sm font-medium text-primary hover:underline sm:block"
        >
          Voir toutes les catégories
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {CATEGORIES.map((cat) => {
          const Icon = ICONS[cat.icon] ?? Shirt
          return (
            <Link
              key={cat.slug}
              href={`/c/${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold">{cat.name}</p>
                <p className="text-xs text-muted-foreground">
                  {cat.productCount.toLocaleString("fr-FR")} produits
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
