"use client"
import * as React from "react"
import { Eye, ShoppingBag, Flame } from "lucide-react"

// Deterministic pseudo-random based on slug so SSR + CSR match
function hash(input: string) {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function LiveActivity({ slug }: { slug: string }) {
  const seed = hash(slug)
  const baseViewers = 18 + (seed % 60)
  const [viewers, setViewers] = React.useState(baseViewers)
  const recentSold = 3 + (seed % 12)
  const watchlist = 142 + (seed % 240)

  // Tiny live wobble after mount only (no hydration mismatch)
  React.useEffect(() => {
    const t = setInterval(() => {
      setViewers((v) => {
        const delta = Math.random() < 0.5 ? -1 : 1
        const next = v + delta
        return Math.max(8, Math.min(120, next))
      })
    }, 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-xl border bg-gradient-to-br from-accent/10 to-transparent p-3">
      <ul className="grid grid-cols-3 gap-3 text-center">
        <li>
          <div className="inline-flex items-center justify-center gap-1 text-accent">
            <Eye className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold tabular-nums">{viewers}</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-soft-pulse rounded-full bg-success" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
          </div>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            En train de regarder
          </p>
        </li>
        <li className="border-x">
          <div className="inline-flex items-center gap-1 text-foreground">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold tabular-nums">{recentSold}</span>
          </div>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            Achetés aujourd&apos;hui
          </p>
        </li>
        <li>
          <div className="inline-flex items-center gap-1 text-destructive">
            <Flame className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold tabular-nums">{watchlist}</span>
          </div>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            En favoris
          </p>
        </li>
      </ul>
    </div>
  )
}
