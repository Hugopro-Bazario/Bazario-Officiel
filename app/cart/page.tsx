"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { Minus, Plus, Trash2, ShoppingBag, Truck, ShieldCheck, Tag } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatPrice, sellers } from "@/lib/data"

export default function CartPage() {
  const { items, updateQty, remove, clear, subtotal } = useCart()

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

  const shipping = items.length > 0 ? (subtotal > 50 ? 0 : 4.99 * itemsBySeller.length) : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="mx-auto max-w-md p-10 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="size-8 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Votre panier est vide</h1>
          <p className="mb-6 text-muted-foreground">
            Découvrez des milliers de produits sélectionnés par nos vendeurs partout dans le monde.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/">Continuer mes achats</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mon panier ({items.length})</h1>
        <Button variant="ghost" size="sm" onClick={clear}>
          Vider le panier
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items grouped by seller */}
        <div className="space-y-6">
          {itemsBySeller.map(({ seller, items: sellerItems, subtotal: sellerSubtotal }) => (
            <Card key={seller?.id} className="overflow-hidden">
              <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-9 overflow-hidden rounded-full bg-muted">
                    {seller?.logo && (
                      <Image src={seller.logo || "/placeholder.svg"} alt={seller.name} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{seller?.name}</span>
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
                <span className="text-sm font-semibold">{formatPrice(sellerSubtotal)}</span>
              </div>

              <ul className="divide-y">
                {sellerItems.map((item) => (
                  <li key={item.id} className="flex gap-4 p-4">
                    <Link
                      href={`/p/${item.productSlug}`}
                      className="relative size-24 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                    >
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/p/${item.productSlug}`}
                          className="line-clamp-2 text-sm font-medium leading-snug hover:underline"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{item.variantLabel}</p>
                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="inline-flex items-center rounded-md border">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="flex size-9 items-center justify-center transition-colors hover:bg-muted"
                            aria-label="Diminuer"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex size-9 items-center justify-center transition-colors hover:bg-muted"
                            aria-label="Augmenter"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatPrice(item.price * item.qty)}</div>
                          {item.qty > 1 && (
                            <div className="text-xs text-muted-foreground">{formatPrice(item.price)} l&apos;unité</div>
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
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Récapitulatif</h2>

            <div className="mb-4 flex gap-2">
              <Input placeholder="Code promo" className="flex-1" />
              <Button variant="outline">
                <Tag className="size-4" />
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
              </div>
              {subtotal < 50 && (
                <p className="rounded-md bg-accent/10 px-3 py-2 text-xs text-accent-foreground">
                  Plus que <strong>{formatPrice(50 - subtotal)}</strong> pour la livraison gratuite
                </p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="mb-6 flex items-baseline justify-between">
              <span className="font-semibold">Total TTC</span>
              <span className="text-2xl font-bold">{formatPrice(total)}</span>
            </div>

            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">Passer la commande</Link>
            </Button>

            <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-success" />
                Livraison suivie dans le monde entier
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-success" />
                Paiement sécurisé · retours 30 jours
              </li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  )
}
