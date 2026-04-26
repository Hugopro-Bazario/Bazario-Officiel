"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  Check,
  ArrowRight,
  Lock,
  Heart,
  Gift,
} from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { formatPrice, sellers, products } from "@/lib/data"

const STEPS = [
  { id: 1, label: "Panier" },
  { id: 2, label: "Adresse" },
  { id: 3, label: "Paiement" },
  { id: 4, label: "Confirmation" },
]

const FREE_SHIPPING_THRESHOLD = 49

export default function CartPage() {
  const { items, updateQty, remove, clear, subtotal } = useCart()
  const [promo, setPromo] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)

  const itemsBySeller = useMemo(() => {
    const map = new Map<string, typeof items>()
    for (const item of items) {
      const list = map.get(item.sellerId) ?? []
      list.push(item)
      map.set(item.sellerId, list)
    }
    return Array.from(map.entries()).map(([sellerId, list]) => ({
      seller: sellers.find((s) => s.id === sellerId),
      items: list,
      subtotal: list.reduce((acc, it) => acc + it.price * it.qty, 0),
    }))
  }, [items])

  const itemsCount = items.reduce((acc, it) => acc + it.qty, 0)
  const shipping = items.length > 0 ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99 * itemsBySeller.length) : 0
  const promoDiscount = promoApplied ? Math.min(20, subtotal * 0.1) : 0
  const giftFee = giftWrap ? 4.5 : 0
  const total = Math.max(0, subtotal + shipping + giftFee - promoDiscount)
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  // Recommendations: take first 4 products not already in cart
  const inCartIds = new Set(items.map((it) => it.productSlug))
  const recommendations = products.filter((p) => !inCartIds.has(p.slug)).slice(0, 4)

  function applyPromo() {
    if (promo.trim().toLowerCase() === "bazario10") setPromoApplied(true)
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="bg-secondary/30">
        <div className="container py-20">
          <Card className="mx-auto max-w-md p-10 text-center">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="size-8 text-muted-foreground" />
            </div>
            <h1 className="mb-2 font-display text-2xl font-bold">Votre panier est vide</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Découvrez des milliers de produits sélectionnés par nos vendeurs partout dans le monde.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/">
                  Continuer mes achats
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/account/wishlist">
                  <Heart className="size-4" />
                  Voir mes favoris
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-secondary/30">
      <div className="container py-8">
        {/* Stepper */}
        <ol className="mb-8 flex items-center justify-between gap-2 overflow-x-auto rounded-2xl border bg-card p-4 no-scrollbar">
          {STEPS.map((step, i) => {
            const isActive = step.id === 1
            const isPast = step.id < 1
            return (
              <li key={step.id} className="flex flex-1 items-center gap-2 last:flex-none">
                <span
                  className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isPast
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {isPast ? <Check className="size-4" /> : step.id}
                </span>
                <span className={`hidden text-sm font-medium sm:inline ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
                )}
              </li>
            )
          })}
        </ol>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Mon panier</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {itemsCount} article{itemsCount > 1 ? "s" : ""} · {itemsBySeller.length} vendeur{itemsBySeller.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={clear}>
            <Trash2 className="size-4" />
            Vider le panier
          </Button>
        </div>

        {/* Free shipping progress */}
        {remainingForFree > 0 ? (
          <div className="mb-6 rounded-2xl border border-accent/30 bg-accent/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium">
                Encore <strong className="text-accent">{formatPrice(remainingForFree)}</strong> pour la livraison offerte sur tout le panier
              </p>
              <Truck className="size-5 shrink-0 text-accent" />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-4 text-sm">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-4" />
            </span>
            <p className="font-medium">
              Bravo, vous bénéficiez de la <strong className="text-success">livraison offerte</strong> !
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Items grouped by seller */}
          <div className="space-y-5">
            {itemsBySeller.map(({ seller, items: sellerItems, subtotal: sellerSubtotal }) => (
              <Card key={seller?.id} className="overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b bg-secondary/40 px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-background">
                      {seller?.logo && (
                        <Image src={seller.logo || "/placeholder.svg"} alt={seller.name} fill sizes="36px" className="object-cover" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{seller?.name}</span>
                        {seller?.verified && (
                          <Badge variant="secondary" className="gap-1">
                            <ShieldCheck className="size-3" />
                            Vérifié
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {seller?.country} · livraison estimée 3-5 jours
                      </p>
                    </div>
                  </div>
                  <span className="hidden text-sm font-semibold tabular-nums sm:inline">
                    {formatPrice(sellerSubtotal)}
                  </span>
                </div>

                <ul className="divide-y">
                  {sellerItems.map((item) => (
                    <li key={item.id} className="flex gap-4 p-5">
                      <Link
                        href={`/p/${item.productSlug}`}
                        className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-secondary sm:size-28"
                      >
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill sizes="112px" className="object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/p/${item.productSlug}`}
                              className="line-clamp-2 text-sm font-semibold leading-snug hover:underline"
                            >
                              {item.title}
                            </Link>
                            <p className="mt-1 text-xs text-muted-foreground">{item.variantLabel}</p>
                          </div>
                          <button
                            onClick={() => remove(item.id)}
                            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center rounded-lg border bg-card">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                className="flex size-9 items-center justify-center rounded-l-lg transition-colors hover:bg-secondary disabled:opacity-50"
                                aria-label="Diminuer"
                                disabled={item.qty <= 1}
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="w-10 text-center text-sm font-semibold tabular-nums">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="flex size-9 items-center justify-center rounded-r-lg transition-colors hover:bg-secondary"
                                aria-label="Augmenter"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                              <Heart className="size-3.5" />
                              Garder pour plus tard
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-display text-lg font-bold tabular-nums">
                              {formatPrice(item.price * item.qty)}
                            </div>
                            {item.qty > 1 && (
                              <div className="text-xs text-muted-foreground">
                                {formatPrice(item.price)} l&apos;unité
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="overflow-hidden">
              <div className="border-b bg-gradient-to-br from-primary/5 to-transparent p-5">
                <h2 className="font-display text-lg font-bold">Récapitulatif</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Frais et taxes calculés à l&apos;étape suivante
                </p>
              </div>

              <div className="space-y-4 p-5">
                {/* Promo code */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="promo">
                    Code promo
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <Input
                      id="promo"
                      placeholder="ex. BAZARIO10"
                      className="flex-1"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      disabled={promoApplied}
                    />
                    {promoApplied ? (
                      <Button variant="outline" disabled>
                        <Check className="size-4 text-success" />
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={applyPromo}>
                        <Tag className="size-4" />
                        Appliquer
                      </Button>
                    )}
                  </div>
                  {promoApplied && (
                    <p className="mt-2 text-xs text-success">
                      Code BAZARIO10 appliqué : -10 % (max 20 €)
                    </p>
                  )}
                </div>

                {/* Gift wrap */}
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-secondary/30 p-3">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="mt-0.5 size-4 accent-primary"
                  />
                  <div className="flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <Gift className="size-4 text-accent" />
                      Emballage cadeau Bazario
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Boîte signature, ruban et carte personnalisée · 4,50 €
                    </p>
                  </div>
                </label>

                <Separator />

                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Sous-total</dt>
                    <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Livraison</dt>
                    <dd className="tabular-nums">
                      {shipping === 0 ? (
                        <span className="text-success">Offerte</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </dd>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Emballage cadeau</dt>
                      <dd className="tabular-nums">{formatPrice(giftFee)}</dd>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-success">
                      <dt>Code promo</dt>
                      <dd className="tabular-nums">- {formatPrice(promoDiscount)}</dd>
                    </div>
                  )}
                </dl>

                <Separator />

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold">Total TTC</span>
                  <span className="font-display text-2xl font-bold tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>

                <Button asChild size="lg" variant="accent" className="w-full">
                  <Link href="/checkout">
                    Passer la commande
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <ul className="space-y-2 pt-1 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Lock className="size-3.5 text-success" />
                    Paiement 100 % sécurisé · Stripe & 3D Secure
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="size-3.5 text-success" />
                    Livraison suivie dans 220 pays
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="size-3.5 text-success" />
                    Retours gratuits sous 30 jours
                  </li>
                </ul>
              </div>
            </Card>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span>Paiement accepté</span>
              <span className="rounded bg-card px-2 py-1 font-mono text-[10px] font-bold tracking-wider">VISA</span>
              <span className="rounded bg-card px-2 py-1 font-mono text-[10px] font-bold tracking-wider">MC</span>
              <span className="rounded bg-card px-2 py-1 font-mono text-[10px] font-bold tracking-wider">PayPal</span>
              <span className="rounded bg-card px-2 py-1 font-mono text-[10px] font-bold tracking-wider"> Pay</span>
            </div>
          </aside>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-16">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Inspiration
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                  Vous pourriez ajouter
                </h2>
              </div>
              <Link href="/search" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
                Voir tout
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {recommendations.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
