"use client"
import * as React from "react"
import Image from "next/image"
import { Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/data"

export function FrequentlyBought({
  main,
  suggestions,
}: {
  main: Product
  suggestions: Product[]
}) {
  const items = [main, ...suggestions.slice(0, 2)]
  const { addItem } = useCart()
  const [selected, setSelected] = React.useState<Set<string>>(new Set(items.map((p) => p.id)))

  function toggle(id: string) {
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = items.filter((p) => selected.has(p.id)).reduce((sum, p) => sum + p.price, 0)
  const reference = items.reduce((sum, p) => sum + (p.compareAtPrice ?? p.price), 0)
  const savings = Math.max(0, reference - total)

  function addBundle() {
    items
      .filter((p) => selected.has(p.id))
      .forEach((p) => addItem(p.id, p.variants[0]?.id ?? "", 1))
  }

  return (
    <section className="rounded-2xl border bg-card p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Achetés ensemble</p>
          <h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">
            Le pack complet
          </h2>
        </div>
        {savings > 0 && (
          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            Économisez {formatPrice(savings)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex flex-1 items-center gap-3 overflow-x-auto no-scrollbar">
          {items.map((p, i) => (
            <React.Fragment key={p.id}>
              {i > 0 && <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}
              <button
                type="button"
                onClick={() => toggle(p.id)}
                className={`group relative shrink-0 overflow-hidden rounded-xl border-2 bg-secondary transition-all ${
                  selected.has(p.id)
                    ? "border-primary shadow-md"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <div className="relative aspect-square w-28 sm:w-32">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <span
                  className={`absolute right-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    selected.has(p.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground"
                  }`}
                >
                  {selected.has(p.id) ? "✓" : ""}
                </span>
                <span className="block px-2 py-1.5 text-left text-[11px] font-medium leading-tight">
                  <span className="line-clamp-2">{p.title}</span>
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col items-end gap-2 sm:min-w-[180px]">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total du pack</p>
            <p className="font-display text-2xl font-bold tabular-nums">
              {formatPrice(total)}
            </p>
          </div>
          <Button onClick={addBundle} variant="accent" size="lg" className="w-full sm:w-auto">
            <ShoppingCart className="h-4 w-4" />
            Ajouter le pack
          </Button>
        </div>
      </div>
    </section>
  )
}
