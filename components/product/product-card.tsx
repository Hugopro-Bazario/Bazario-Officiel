"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  Heart,
  Zap,
  Sparkles,
  Award,
  Leaf,
  Crown,
  Truck,
  ShoppingCart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Product } from "@/lib/data"
import { formatPrice, discountPercent, cn } from "@/lib/utils"
import { useWishlist } from "@/lib/wishlist-store"

const BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  flash: Zap,
  new: Sparkles,
  bestseller: Award,
  premium: Crown,
  eco: Leaf,
}

const BADGE_LABEL: Record<string, string> = {
  flash: "Vente flash",
  new: "Nouveauté",
  bestseller: "Best-seller",
  premium: "Premium",
  eco: "Éco-responsable",
}

export function ProductCard({
  product,
  size = "default",
}: {
  product: Product
  size?: "default" | "compact"
}) {
  const { has, toggle } = useWishlist()
  const wishlisted = has(product.id)

  const discount = product.compareAtPrice
    ? discountPercent(product.compareAtPrice, product.price)
    : 0
  const primaryBadge = product.badges[0]
  const BadgeIcon = primaryBadge ? BADGE_ICONS[primaryBadge] : null
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
  const lowStock = totalStock > 0 && totalStock <= 12
  const freeShipping = product.price >= 49

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
  }

  return (
    <Link
      href={`/p/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Top-left badges stack */}
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <Badge variant="accent" className="font-bold tracking-tight shadow-sm">
              -{discount}%
            </Badge>
          )}
          {primaryBadge && BadgeIcon && (
            <Badge
              variant={primaryBadge === "flash" ? "destructive" : "secondary"}
              className="gap-1 shadow-sm backdrop-blur"
            >
              <BadgeIcon className="h-3 w-3" />
              {BADGE_LABEL[primaryBadge]}
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? "Retirer de la liste" : "Ajouter à la liste de souhaits"}
          aria-pressed={wishlisted}
          className={cn(
            "absolute right-2.5 top-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/95 shadow-sm backdrop-blur transition-all hover:scale-110",
            wishlisted ? "text-accent" : "text-muted-foreground hover:text-accent",
          )}
        >
          <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
        </button>

        {/* Bottom hover overlay: quick add */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex translate-y-2 items-center gap-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background shadow-md transition-colors hover:bg-primary"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Ajouter au panier
          </button>
        </div>

        {/* Free shipping ribbon */}
        {freeShipping && (
          <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-success px-2 py-0.5 text-[10px] font-semibold text-success-foreground shadow-sm transition-opacity group-hover:opacity-0">
            <Truck className="h-2.5 w-2.5" />
            Livraison offerte
          </div>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-3.5", size === "compact" && "p-2.5")}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </p>
        <h3
          className={cn(
            "mt-1 font-medium leading-snug text-foreground line-clamp-2",
            size === "compact" ? "text-sm" : "text-sm",
          )}
        >
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground/60">({product.reviewCount.toLocaleString("fr-FR")})</span>
          <span className="ml-auto text-[11px] text-muted-foreground">
            {product.sold.toLocaleString("fr-FR")} vendus
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold leading-none text-foreground">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compareAtPrice && (
              <span className="mt-0.5 text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </div>
          {lowStock && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold text-destructive">
              Plus que {totalStock}
            </span>
          )}
        </div>

        <p className="mt-2 truncate border-t pt-2 text-[11px] text-muted-foreground">
          Vendu par <span className="font-semibold text-foreground">{product.seller.name}</span>
          {product.seller.verified && (
            <span className="ml-1 inline-flex align-text-bottom text-primary">
              <svg viewBox="0 0 16 16" className="size-3" fill="currentColor" aria-hidden="true">
                <path d="M8 1l1.7 1.7L12 2l.3 2.3L14.3 5 14 7.3 15.3 9 14 10.7 14.3 13l-2.3.3L11.7 15 9.3 14 8 15.3 6.7 14 4.3 15 4 12.7 1.7 12 2 9.7.7 8 2 6.3 1.7 4 4 3.7 4.3 1.3 6.7 2 8 1zm-.7 9.4l4.2-4.2-1-1L7.3 8.4 5.5 6.6l-1 1 2.8 2.8z" />
              </svg>
            </span>
          )}
        </p>
      </div>
    </Link>
  )
}
