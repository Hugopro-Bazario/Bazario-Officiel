"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Heart, Zap, Sparkles, Award, Leaf, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Product } from "@/lib/data"
import { formatPrice, discountPercent, cn } from "@/lib/utils"

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
  const discount = product.compareAtPrice
    ? discountPercent(product.compareAtPrice, product.price)
    : 0
  const primaryBadge = product.badges[0]
  const BadgeIcon = primaryBadge ? BADGE_ICONS[primaryBadge] : null

  return (
    <Link
      href={`/p/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge variant="accent" className="font-bold">
              -{discount}%
            </Badge>
          )}
          {primaryBadge && BadgeIcon && (
            <Badge
              variant={primaryBadge === "flash" ? "destructive" : "secondary"}
              className="gap-1"
            >
              <BadgeIcon className="h-3 w-3" />
              {BADGE_LABEL[primaryBadge]}
            </Badge>
          )}
        </div>
        <button
          type="button"
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-background hover:text-accent"
          aria-label="Ajouter à la liste de souhaits"
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className={cn("flex flex-1 flex-col p-3", size === "compact" && "p-2.5")}>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
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
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount.toLocaleString("fr-FR")})</span>
          <span aria-hidden>·</span>
          <span>{product.sold.toLocaleString("fr-FR")} vendus</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            Vendu par <span className="font-medium text-foreground">{product.seller.name}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
