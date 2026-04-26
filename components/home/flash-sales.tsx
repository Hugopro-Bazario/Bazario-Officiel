"use client"
import Link from "next/link"
import * as React from "react"
import { Zap, ArrowRight, Flame } from "lucide-react"
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
    <section className="container py-12 lg:py-16">
      <div className="mb-8 overflow-hidden rounded-2xl border bg-gradient-to-br from-destructive/5 via-accent/5 to-background">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive text-destructive-foreground shadow-lg">
              <Flame className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 h-3 w-3 animate-soft-pulse rounded-full bg-accent ring-2 ring-background" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Ventes flash
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-destructive">
                  <Zap className="h-3 w-3" />
                  En direct
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Stocks limités · réductions jusqu&apos;à -70 % · réapprovisionnés à minuit.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              Se termine dans
            </span>
            <div className="flex items-center gap-1.5">
              <Countdown unit={hours.toString().padStart(2, "0")} label="Heures" />
              <span className="font-display text-xl font-bold text-muted-foreground/40">:</span>
              <Countdown unit={minutes.toString().padStart(2, "0")} label="Min." />
              <span className="font-display text-xl font-bold text-muted-foreground/40">:</span>
              <Countdown unit={seconds.toString().padStart(2, "0")} label="Sec." />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {flashProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/search?sale=flash"
          className="group inline-flex items-center gap-1.5 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:gap-3 hover:border-primary hover:bg-primary hover:text-primary-foreground"
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
    <div className="flex flex-col items-center gap-0.5">
      <span className="inline-flex h-11 min-w-[3rem] items-center justify-center rounded-lg bg-foreground px-2 font-display font-bold tabular-nums text-background shadow-md">
        {unit}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
