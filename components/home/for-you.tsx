"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { products as PRODUCTS, type Product } from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"
import { useRecentlyViewed } from "@/lib/recently-viewed-store"
import { useWishlist } from "@/lib/wishlist-store"

const PRODUCT_BY_SLUG = new Map<string, Product>(PRODUCTS.map((p) => [p.slug, p]))
const PRODUCT_BY_ID = new Map<string, Product>(PRODUCTS.map((p) => [p.id, p]))

function pickRecommendations(seenSlugs: string[], wishlistIds: string[], limit = 8): Product[] {
  const seenSet = new Set(seenSlugs)
  const wishSet = new Set(wishlistIds)

  // Score categories
  const catScore = new Map<string, number>()
  for (const slug of seenSlugs) {
    const product = PRODUCT_BY_SLUG.get(slug)
    if (!product) continue
    for (const c of product.categoryPath) {
      catScore.set(c, (catScore.get(c) ?? 0) + 3)
    }
  }
  for (const id of wishlistIds) {
    const product = PRODUCT_BY_ID.get(id)
    if (!product) continue
    for (const c of product.categoryPath) {
      catScore.set(c, (catScore.get(c) ?? 0) + 5)
    }
  }

  // Fallback: no history → return top rated bestsellers
  if (catScore.size === 0) {
    return [...PRODUCTS]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
      .slice(0, limit)
  }

  // Score each candidate by category overlap, exclude seen and wishlisted
  const scored = PRODUCTS
    .filter((p) => !seenSet.has(p.slug) && !wishSet.has(p.id))
    .map((p) => {
      let score = 0
      for (const c of p.categoryPath) {
        score += catScore.get(c) ?? 0
      }
      // Boost popular items slightly
      score += (p.rating ?? 0) * 0.5
      return { product: p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product)

  // Pad with bestsellers if not enough
  if (scored.length < limit) {
    const rest = PRODUCTS.filter((p) => !scored.some((s) => s.id === p.id) && !seenSet.has(p.slug))
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, limit - scored.length)
    scored.push(...rest)
  }
  return scored
}

export function ForYou({ title = "Recommandé pour vous" }: { title?: string }) {
  const { slugs } = useRecentlyViewed()
  const { ids } = useWishlist()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const items = React.useMemo(() => {
    if (!mounted) return [] as Product[]
    return pickRecommendations(slugs, ids, 8)
  }, [mounted, slugs, ids])

  if (!mounted || items.length === 0) return null

  const personalized = slugs.length > 0 || ids.length > 0
  const subtitle = personalized
    ? "Sélection adaptée à votre navigation et à vos coups de cœur."
    : "Les produits les mieux notés du moment, choisis avec soin."

  return (
    <section aria-labelledby="for-you-title" className="container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Recommandations IA
          </div>
          <h2 id="for-you-title" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
