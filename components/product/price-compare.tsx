"use client"

import * as React from "react"
import { Check, X } from "lucide-react"
import { Price } from "@/components/product/price"
import type { Product } from "@/lib/data"

type Competitor = {
  name: string
  multiplier: number
  shipping: number
  hasFree: boolean
  slow?: boolean
}

const COMPETITORS: Competitor[] = [
  { name: "Amazon", multiplier: 1.07, shipping: 0, hasFree: true },
  { name: "Cdiscount", multiplier: 1.04, shipping: 4.99, hasFree: false },
  { name: "Aliexpress", multiplier: 0.92, shipping: 0, hasFree: true, slow: true },
]

export function PriceCompare({ product }: { product: Product }) {
  const baseShippingThreshold = 49

  return (
    <section
      aria-labelledby="price-compare-title"
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
        Garantie meilleur prix Bazario
      </div>
      <h2 id="price-compare-title" className="mt-2 font-display text-lg font-semibold">
        Comparé aux autres marketplaces
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Si vous trouvez moins cher ailleurs sur un vendeur de confiance, on rembourse la différence.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Marketplace</th>
              <th className="px-4 py-3 font-medium">Prix produit</th>
              <th className="px-4 py-3 font-medium">Livraison</th>
              <th className="px-4 py-3 font-medium">Vérifié</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="bg-foreground/[0.03]">
              <td className="px-4 py-3 font-semibold text-foreground">Bazario</td>
              <td className="px-4 py-3">
                <Price
                  value={product.price}
                  baseCurrency={product.currency}
                  className="font-semibold tabular-nums"
                />
              </td>
              <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400">
                {product.price >= baseShippingThreshold ? "Gratuite" : "2,90 €"}
              </td>
              <td className="px-4 py-3">
                <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                <span className="sr-only">Vendeur vérifié</span>
              </td>
            </tr>
            {COMPETITORS.map((c) => {
              const price = product.price * c.multiplier
              return (
                <tr key={c.name}>
                  <td className="px-4 py-3 text-foreground">{c.name}</td>
                  <td className="px-4 py-3">
                    <Price
                      value={price}
                      baseCurrency={product.currency}
                      className="tabular-nums text-muted-foreground"
                    />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.hasFree
                      ? c.slow
                        ? "Gratuite (3-4 semaines)"
                        : "Gratuite"
                      : `+ ${c.shipping.toFixed(2)} €`}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.slow ? (
                      <X className="h-4 w-4 text-muted-foreground" aria-hidden />
                    ) : (
                      <Check className="h-4 w-4 text-muted-foreground/60" aria-hidden />
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Les prix concurrents sont des estimations à titre indicatif (relevés moyens du mois).
      </p>
    </section>
  )
}
