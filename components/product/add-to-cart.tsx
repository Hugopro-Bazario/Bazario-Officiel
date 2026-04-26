"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Zap, Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VariantPicker } from "@/components/product/variant-picker"
import { useCart } from "@/lib/cart-store"
import { formatPrice, discountPercent } from "@/lib/utils"
import type { Product } from "@/lib/data"

export function AddToCart({ product }: { product: Product }) {
  const router = useRouter()
  const { addItem } = useCart()
  const [variantId, setVariantId] = React.useState(product.variants[0]?.id ?? "")
  const [qty, setQty] = React.useState(1)
  const [added, setAdded] = React.useState(false)

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]
  const price = variant?.price ?? product.price
  const compareAt = variant?.compareAtPrice ?? product.compareAtPrice
  const stock = variant?.stock ?? 0
  const discount = compareAt ? discountPercent(compareAt, price) : 0

  function handleAdd() {
    addItem(product.id, variantId, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addItem(product.id, variantId, qty)
    router.push("/cart")
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold sm:text-4xl">
            {formatPrice(price, product.currency)}
          </span>
          {compareAt && (
            <>
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(compareAt, product.currency)}
              </span>
              <Badge variant="accent">-{discount}%</Badge>
            </>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          TVA incluse · Livraison calculée au paiement
        </p>
      </div>

      <VariantPicker
        variants={product.variants}
        value={variantId}
        onChange={setVariantId}
      />

      <div>
        <p className="mb-2 text-sm font-medium">Quantité</p>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-md border">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="inline-flex h-10 w-10 items-center justify-center hover:bg-muted disabled:opacity-50"
              disabled={qty <= 1}
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(stock, q + 1))}
              className="inline-flex h-10 w-10 items-center justify-center hover:bg-muted disabled:opacity-50"
              disabled={qty >= stock}
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {stock > 0 ? (
            stock < 10 ? (
              <span className="text-xs font-medium text-destructive">
                Plus que {stock} en stock !
              </span>
            ) : (
              <span className="text-xs text-success">En stock</span>
            )
          ) : (
            <span className="text-xs text-destructive">Rupture de stock</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          size="xl"
          variant="accent"
          className="flex-1"
          onClick={handleBuyNow}
          disabled={stock === 0}
        >
          <Zap className="h-5 w-5" />
          Acheter maintenant
        </Button>
        <Button
          size="xl"
          variant="default"
          className="flex-1"
          onClick={handleAdd}
          disabled={stock === 0}
        >
          {added ? (
            <>
              <Check className="h-5 w-5" />
              Ajouté !
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Ajouter au panier
            </>
          )}
        </Button>
      </div>

      <Button variant="outline" size="lg" className="w-full">
        <Heart className="h-4 w-4" />
        Ajouter aux favoris
      </Button>
    </div>
  )
}
