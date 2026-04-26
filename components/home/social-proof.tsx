"use client"

import * as React from "react"
import { Star, Users, Truck, Globe2 } from "lucide-react"

type Stat =
  | { icon: typeof Users; label: string; static: false; base: number; suffix: string; rate: number }
  | { icon: typeof Users; label: string; static: true; value: string }

const STATS: Stat[] = [
  {
    icon: Users,
    label: "Clients satisfaits",
    static: false,
    base: 2_840_000,
    suffix: "+",
    rate: 7,
  },
  {
    icon: Star,
    label: "Note moyenne sur 4,2 M d'avis",
    static: true,
    value: "4,82 / 5",
  },
  {
    icon: Truck,
    label: "Commandes livrées cette année",
    static: false,
    base: 18_420_000,
    suffix: "+",
    rate: 11,
  },
  {
    icon: Globe2,
    label: "Vendeurs vérifiés dans 42 pays",
    static: true,
    value: "12 800+",
  },
]

function formatNumber(n: number) {
  return n.toLocaleString("fr-FR")
}

function LiveCounter({ base, suffix, rate }: { base: number; suffix: string; rate: number }) {
  const [value, setValue] = React.useState(base)
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * rate) + 1)
    }, 2400)
    return () => window.clearInterval(id)
  }, [rate])
  return (
    <span aria-live="polite">
      {formatNumber(value)}
      {suffix}
    </span>
  )
}

export function SocialProof() {
  return (
    <section className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
            La marketplace de confiance
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            La preuve par les chiffres, mise à jour en temps réel.
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-background/70 md:text-base">
            Plus de deux millions de personnes nous font confiance. Une commande sur 1 000 fait l'objet
            d'un litige : c'est dix fois moins que la moyenne du secteur.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-background/10 md:grid-cols-4">
          {STATS.map((s) => {
            const Icon = s.icon
            return (
              <li key={s.label} className="bg-foreground p-6 text-center md:p-8">
                <Icon className="mx-auto size-5 text-background/60" aria-hidden="true" />
                <p className="mt-3 font-display text-2xl font-bold tabular-nums tracking-tight md:text-3xl">
                  {s.static ? (
                    s.value
                  ) : (
                    <LiveCounter base={s.base} suffix={s.suffix} rate={s.rate} />
                  )}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-background/60 md:text-xs">
                  {s.label}
                </p>
              </li>
            )
          })}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-background/70">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Paiement sécurisé 3D Secure
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Garantie remboursé 30 jours
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Données chiffrées AES-256
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Support FR 7j/7
          </span>
        </div>
      </div>
    </section>
  )
}
