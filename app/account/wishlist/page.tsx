"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, Sparkles, Trash2 } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/data"
import { useWishlist } from "@/lib/wishlist-store"

export default function WishlistPage() {
  const { ids, count, clear } = useWishlist()

  const wishlistProducts = React.useMemo(
    () => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products,
    [ids],
  )

  if (count === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <Heart className="h-7 w-7 text-accent" />
        </div>
        <h2 className="mt-5 text-2xl font-bold">Votre liste est vide</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cliquez sur le coeur sur n&apos;importe quel produit pour le sauvegarder ici.
          Vos favoris vous suivent sur tous vos appareils.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button asChild>
            <Link href="/discover">
              <Sparkles className="mr-1.5 size-4" />
              Découvrir
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">Parcourir le catalogue</Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Liste de souhaits</h2>
          <p className="text-sm text-muted-foreground">
            {count} produit{count > 1 ? "s" : ""} sauvegardé{count > 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (confirm("Vider votre liste de souhaits ?")) clear()
          }}
        >
          <Trash2 className="mr-1.5 size-4" />
          Tout retirer
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
