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
  ArrowRight,
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
    <section className="container py-12 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Nos univers
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Tout ce dont vous avez besoin,
            <br className="hidden sm:block" />
            <span className="text-muted-foreground">en un seul endroit.</span>
          </h2>
        </div>
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
        >
          Voir toutes les catégories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {CATEGORIES.map((cat, index) => {
          const Icon = ICONS[cat.icon] ?? Shirt
          const image = cat.image
          // Make first card span 2 cols on larger screens
          const featured = index === 0
          return (
            <Link
              key={cat.slug}
              href={`/c/${cat.slug}`}
              className={`group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                featured ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""
              }`}
            >
              {image && (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes={featured ? "50vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/0" />

              <div className="relative z-10 flex flex-col gap-2 p-4 text-background sm:p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 text-primary backdrop-blur sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold leading-tight sm:text-lg">
                    {cat.name}
                  </p>
                  <p className="text-xs text-background/75">
                    {cat.productCount.toLocaleString("fr-FR")} produits
                  </p>
                </div>
              </div>

              <span className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-primary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
