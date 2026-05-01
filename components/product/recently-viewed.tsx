"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRecentlyViewed } from "@/lib/recently-viewed-store"
import { products, formatPrice, type Product } from "@/lib/data"

export function RecentlyViewedTracker({ slug }: { slug: string }) {
  const { push } = useRecentlyViewed()
  React.useEffect(() => {
    if (slug) push(slug)
  }, [slug, push])
  return null
}

export function RecentlyViewedStrip({
  excludeSlug,
  variant = "section",
}: {
  excludeSlug?: string
  variant?: "section" | "compact"
}) {
  const { slugs, clear } = useRecentlyViewed()

  const items = React.useMemo(() => {
    return slugs
      .filter((s) => (excludeSlug ? s !== excludeSlug : true))
      .map((s) => products.find((p) => p.slug === s))
      .filter((p): p is Product => Boolean(p))
      .slice(0, 8)
  }, [slugs, excludeSlug])

  if (items.length === 0) return null

  if (variant === "compact") {
    return (
      <section className="border-t bg-background">
        <div className="container py-6">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
              <Clock className="size-4 text-muted-foreground" />
              Vus récemment
            </h2>
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
              Effacer
            </button>
          </div>
          <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-1">
            {items.map((p) => (
              <Link
                key={p.id}
                href={`/p/${p.slug}`}
                className="group flex w-32 shrink-0 flex-col gap-1.5"
              >
                <div className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="line-clamp-2 text-xs leading-tight">{p.title}</p>
                <p className="text-xs font-semibold">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="border-t bg-secondary/30">
      <div className="container py-10">
        <div className="mb-5 flex items-baseline justify-between gap-2">
          <div>
            <h2 className="inline-flex items-center gap-2 font-serif text-2xl font-bold">
              <Clock className="size-5 text-primary" />
              Reprenez où vous en étiez
            </h2>
            <p className="text-sm text-muted-foreground">{items.length} produits récemment consultés</p>
          </div>
          <Button variant="ghost" size="sm" onClick={clear}>
            <X className="mr-1 size-4" />
            Effacer
          </Button>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/p/${p.slug}`}
              className="group flex w-44 shrink-0 flex-col gap-2 sm:w-48"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-card">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  sizes="(min-width: 640px) 192px, 176px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{p.brand}</p>
                <p className="line-clamp-2 text-sm font-medium leading-tight">{p.title}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                  {p.compareAtPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(p.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
