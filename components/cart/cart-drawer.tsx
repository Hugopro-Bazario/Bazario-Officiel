"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-store"
import { formatPrice, products } from "@/lib/data"
import { cn } from "@/lib/utils"

const FREE_SHIP_THRESHOLD = 49

export function CartDrawer() {
  const { items, count, subtotal, updateQty, remove, isOpen, closeCart, addItem } = useCart()

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  // Close on ESC
  React.useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, closeCart])

  // Group by seller
  const groupedBySeller = React.useMemo(() => {
    const map = new Map<string, typeof items>()
    for (const it of items) {
      const arr = map.get(it.sellerId) ?? []
      arr.push(it)
      map.set(it.sellerId, arr)
    }
    return Array.from(map.entries())
  }, [items])

  const remainingForFree = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)

  // Recommended cross-sell : 3 products not yet in cart
  const productIdsInCart = new Set(items.map((i) => i.productId))
  const recommendations = products.filter((p) => !productIdsInCart.has(p.id)).slice(0, 3)

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-opacity",
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Panier"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={closeCart}
        aria-label="Fermer le panier"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShoppingBag className="size-4" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold leading-none">Votre panier</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {count > 0 ? `${count} article${count > 1 ? "s" : ""}` : "Aucun article"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Fermer"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Free shipping bar */}
        {count > 0 && (
          <div className="border-b border-border bg-secondary/40 px-5 py-3">
            {remainingForFree > 0 ? (
              <p className="text-xs text-foreground">
                Plus que <span className="font-semibold text-primary">{formatPrice(remainingForFree)}</span> pour la livraison offerte
              </p>
            ) : (
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                <Truck className="size-3.5" /> Livraison gratuite débloquée
              </p>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {count === 0 ? (
            <EmptyState onClose={closeCart} />
          ) : (
            <div className="px-5 py-4">
              {groupedBySeller.map(([sellerId, sellerItems]) => {
                const sellerName = sellerItems[0]?.title // fallback - real seller name lives elsewhere
                return (
                  <section key={sellerId} className="mb-5 last:mb-0">
                    <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <ShieldCheck className="size-3 text-primary" />
                      Expédié par vendeur Bazario
                    </div>
                    <ul className="space-y-3">
                      {sellerItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                        >
                          <Link
                            href={`/p/${item.productSlug}`}
                            onClick={closeCart}
                            className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-secondary"
                          >
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/p/${item.productSlug}`}
                                onClick={closeCart}
                                className="line-clamp-2 text-sm font-medium leading-snug hover:text-primary"
                              >
                                {item.title}
                              </Link>
                              <button
                                type="button"
                                onClick={() => remove(item.id)}
                                className="-mr-1 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive"
                                aria-label={`Retirer ${item.title}`}
                              >
                                <Trash2 className="size-3.5" aria-hidden="true" />
                              </button>
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">{item.variantLabel}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="inline-flex items-center rounded-full border border-border bg-background">
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, item.qty - 1)}
                                  className="inline-flex size-7 items-center justify-center rounded-l-full hover:bg-muted disabled:opacity-50"
                                  aria-label="Diminuer la quantité"
                                  disabled={item.qty <= 1}
                                >
                                  <Minus className="size-3" aria-hidden="true" />
                                </button>
                                <span className="min-w-7 text-center text-xs font-semibold">{item.qty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQty(item.id, item.qty + 1)}
                                  className="inline-flex size-7 items-center justify-center rounded-r-full hover:bg-muted"
                                  aria-label="Augmenter la quantité"
                                >
                                  <Plus className="size-3" aria-hidden="true" />
                                </button>
                              </div>
                              <p className="text-sm font-semibold tabular-nums">
                                {formatPrice(item.price * item.qty)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                )
              })}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="mt-6">
                  <Separator className="mb-4" />
                  <h3 className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="size-3.5 text-accent" />
                    Vous aimerez aussi
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5"
                      >
                        <Link
                          href={`/p/${p.slug}`}
                          onClick={closeCart}
                          className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary"
                        >
                          <Image
                            src={p.images[0] || "/placeholder.svg"}
                            alt={p.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/p/${p.slug}`}
                            onClick={closeCart}
                            className="line-clamp-1 text-xs font-medium hover:text-primary"
                          >
                            {p.title}
                          </Link>
                          <p className="text-xs font-semibold text-primary">{formatPrice(p.price)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 shrink-0 gap-1 bg-transparent text-xs"
                          onClick={() => addItem(p.id, p.variants[0].id, 1)}
                        >
                          <Plus className="size-3" aria-hidden="true" />
                          Ajouter
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {count > 0 && (
          <div className="border-t border-border bg-card px-5 py-4">
            <div className="mb-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Sous-total</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Livraison</span>
                <span className="tabular-nums">
                  {remainingForFree > 0 ? formatPrice(4.9) : "Offerte"}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatPrice(subtotal + (remainingForFree > 0 ? 4.9 : 0))}
                </span>
              </div>
            </div>
            <Button asChild className="h-12 w-full gap-2 text-base">
              <Link href="/checkout" onClick={closeCart}>
                Passer commande
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-2 block text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Voir le panier complet
            </Link>
            <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="size-3" /> Paiement sécurisé
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="size-3" /> Retours 30 jours
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 py-12 text-center">
      <div className="relative flex size-24 items-center justify-center rounded-full bg-secondary">
        <ShoppingBag className="size-10 text-muted-foreground" aria-hidden="true" />
        <Badge variant="accent" className="absolute -right-1 top-2 px-2">
          0
        </Badge>
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold">Votre panier est vide</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Découvrez nos sélections et ajoutez vos coups de cœur.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button asChild className="w-48">
          <Link href="/discover" onClick={onClose}>
            Découvrir
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-48 bg-transparent">
          <Link href="/search" onClick={onClose}>
            Rechercher
          </Link>
        </Button>
      </div>
    </div>
  )
}
