"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ArrowUpRight } from "lucide-react"

type Drop = {
  id: string
  title: string
  subtitle: string
  brand: string
  image: string
  endsAt: number
  pieces: number
  remaining: number
  href: string
  accent: "navy" | "rose" | "orange"
}

// Hours offsets so the countdowns differ
const now = Date.now()
const DROPS: Drop[] = [
  {
    id: "d-1",
    title: "Orion v2 — early access",
    subtitle: "Agent commercial IA, tarif de lancement à vie",
    brand: "NeuraForge",
    image: "/digital/drop-orion.svg",
    endsAt: now + 1000 * 60 * 60 * 6 + 1000 * 60 * 14,
    pieces: 500,
    remaining: 87,
    href: "/p/agent-orion-assistant-commercial",
    accent: "navy",
  },
  {
    id: "d-2",
    title: "Cyber Vault — édition limitée",
    subtitle: "500 artworks cyberpunk 4K numérotés",
    brand: "Aether Audio",
    image: "/digital/drop-cyber.svg",
    endsAt: now + 1000 * 60 * 60 * 23 + 1000 * 60 * 41,
    pieces: 1000,
    remaining: 312,
    href: "/p/pack-500-artworks-cyberpunk-4k",
    accent: "rose",
  },
  {
    id: "d-3",
    title: "Bootcamp — cohorte juillet",
    subtitle: "Prompt Engineering certifiant, 60 places",
    brand: "Nova Academy",
    image: "/digital/drop-bootcamp.svg",
    endsAt: now + 1000 * 60 * 60 * 2 + 1000 * 60 * 33,
    pieces: 60,
    remaining: 14,
    href: "/p/bootcamp-prompt-engineering",
    accent: "orange",
  },
]

function formatRemaining(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return { h: String(h).padStart(2, "0"), m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") }
}

const ACCENTS: Record<Drop["accent"], { ring: string; chip: string; bar: string }> = {
  navy: { ring: "ring-primary/30", chip: "bg-primary text-primary-foreground", bar: "bg-primary" },
  rose: { ring: "ring-destructive/30", chip: "bg-destructive text-destructive-foreground", bar: "bg-destructive" },
  orange: { ring: "ring-accent/40", chip: "bg-accent text-accent-foreground", bar: "bg-accent" },
}

export function LiveDrops() {
  const [tick, setTick] = React.useState(0)

  React.useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Drops du jour
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Lancements exclusifs
            <span className="text-muted-foreground"> · stocks limités</span>
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Licences numérotées, tarifs early-access et cohortes limitées, disponibles uniquement chez Bazario pendant 24 h.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {DROPS.map((drop) => {
          const remaining = drop.endsAt - Date.now()
          const t = formatRemaining(remaining)
          const sold = drop.pieces - drop.remaining
          const pct = Math.min(100, (sold / drop.pieces) * 100)
          const accent = ACCENTS[drop.accent]
          const isUrgent = drop.remaining <= 30
          // Reference tick to satisfy unused-var lint
          void tick

          return (
            <Link
              key={drop.id}
              href={drop.href}
              className={`group relative overflow-hidden rounded-2xl border bg-card ring-1 ${accent.ring} transition-all hover:-translate-y-0.5 hover:shadow-xl`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src={drop.image}
                  alt={drop.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/0 to-foreground/0" />

                {/* Top chips */}
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${accent.chip}`}
                  >
                    Drop · {drop.pieces} licences
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-background opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                {/* Bottom content */}
                <div className="absolute inset-x-4 bottom-4 text-background">
                  <p className="text-[11px] font-medium uppercase tracking-wider opacity-80">
                    {drop.brand}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg font-bold leading-tight text-balance">
                    {drop.title}
                  </h3>
                  <p className="mt-0.5 text-xs opacity-90">{drop.subtitle}</p>

                  {/* Countdown */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex gap-1">
                      {[t.h, t.m, t.s].map((v, i) => (
                        <span
                          key={i}
                          suppressHydrationWarning
                          className="rounded-md bg-background/15 px-2 py-1 text-xs font-bold tabular-nums backdrop-blur-sm"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider opacity-80">restant</span>
                  </div>
                </div>
              </div>

              {/* Stock bar */}
              <div className="space-y-1.5 bg-card p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">
                    {drop.remaining} restantes
                    {isUrgent && (
                      <span className="ml-1.5 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-destructive">
                        Bientôt épuisé
                      </span>
                    )}
                  </span>
                  <span className="text-muted-foreground tabular-nums">{Math.round(pct)} %</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full ${accent.bar} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
