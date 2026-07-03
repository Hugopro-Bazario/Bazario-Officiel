"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-store"
import { formatPrice } from "@/lib/data"
import {
  type Bundle,
  getBundleOriginalPrice,
  getBundleProducts,
  getBundleSavings,
} from "@/lib/bundles"

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const { addItem } = useCart()
  const [added, setAdded] = React.useState(false)
  const items = getBundleProducts(bundle)
  const original = getBundleOriginalPrice(bundle)
  const savings = getBundleSavings(bundle)
  const percent = original > 0 ? Math.round((savings / original) * 100) : 0

  function addBundle() {
    // Le prix « pack » est matérialisé par la remise appliquée au checkout ;
    // ici on ajoute chaque produit (1re licence) au panier en une action.
    for (const p of items) {
      const variant = p.variants[0]
      if (variant) addItem(p.id, variant.id, 1)
    }
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2500)
  }

  return (
    <article
      className={`relative flex flex-col rounded-3xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-xl ${
        bundle.badge ? "border-accent/50 glow-cyan" : ""
      }`}
    >
      {bundle.badge && (
        <Badge variant="accent" className="absolute -top-3 left-6 gap-1">
          <Sparkles className="h-3 w-3" />
          {bundle.badge}
        </Badge>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-3xl" aria-hidden>
            {bundle.emoji}
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight">{bundle.name}</h2>
          <p className="text-sm font-medium text-accent">{bundle.tagline}</p>
        </div>
        <Badge variant="secondary" className="shrink-0 text-xs font-bold">
          −{percent} %
        </Badge>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{bundle.description}</p>

      <ul className="mt-5 space-y-2.5">
        {items.map((p) => (
          <li key={p.id} className="flex items-center gap-3">
            <span className="relative size-10 shrink-0 overflow-hidden rounded-lg border bg-secondary">
              <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
            </span>
            <Link
              href={`/p/${p.slug}`}
              className="line-clamp-1 flex-1 text-sm font-medium hover:text-accent"
            >
              {p.title}
            </Link>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground line-through">
              {formatPrice(p.price)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between border-t pt-5">
        <div>
          <p className="text-xs text-muted-foreground">
            Valeur : <span className="line-through">{formatPrice(original)}</span>
          </p>
          <p className="font-display text-3xl font-bold">{formatPrice(bundle.price)}</p>
          <p className="text-xs font-semibold text-success">
            Vous économisez {formatPrice(savings)}
          </p>
        </div>
        <Button variant={added ? "outline" : "accent"} size="lg" onClick={addBundle}>
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Ajouté !
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Ajouter le pack
            </>
          )}
        </Button>
      </div>
    </article>
  )
}
