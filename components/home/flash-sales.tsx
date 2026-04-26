"use client"
import Link from "next/link"
import * as React from "react"
import { Zap, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { PRODUCTS, FLASH_SALE_END } from "@/lib/data"

function useCountdown(target: string) {
  const [now, setNow] = React.useState(() => Date.now())
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(target).getTime() - now)
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { hours, minutes, seconds }
}

export function FlashSales() {
  const flashProducts = PRODUCTS.filter((p) => p.badges.includes("flash")).slice(0, 5)
  const { hours, minutes, seconds } = useCountdown(FLASH_SALE_END)

  return (
    <section className="container py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <Zap className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Ventes flash
            </h2>
            <p className="text-sm text-muted-foreground">
              Stocks limités, prix imbattables.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Fin dans</span>
          <Countdown unit={hours.toString().padStart(2, "0")} label="h" />
          <Countdown unit={minutes.toString().padStart(2, "0")} label="min" />
          <Countdown unit={seconds.toString().padStart(2, "0")} label="s" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {flashProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/search?sale=flash"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Voir toutes les ventes flash
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

function Countdown({ unit, label }: { unit: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5 rounded-md bg-foreground px-2 py-1 font-mono text-sm font-bold tabular-nums text-background">
      {unit}
      <span className="text-[10px] font-normal opacity-70">{label}</span>
    </span>
  )
}
