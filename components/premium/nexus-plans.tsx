"use client"

import * as React from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type PlanKey = "monthly" | "yearly"

const COMMON = [
  "−20 % sur tout le catalogue digital",
  "Crédits IA inclus chaque mois",
  "Accès anticipé aux drops (24 h)",
  "Coffre-fort de licences à vie",
  "Mises à jour à vie incluses",
  "Support prioritaire augmenté 24/7",
]

const PLANS: {
  key: PlanKey
  name: string
  price: string
  period: string
  note: string
  highlight?: boolean
  badge?: string
}[] = [
  {
    key: "monthly",
    name: "Mensuel",
    price: "9,99 €",
    period: "/mois",
    note: "Sans engagement, résiliable en 1 clic",
  },
  {
    key: "yearly",
    name: "Annuel",
    price: "99,90 €",
    period: "/an",
    note: "Soit 8,33 €/mois — 2 mois offerts",
    highlight: true,
    badge: "Le plus populaire",
  },
]

export function NexusPlans() {
  const [loading, setLoading] = React.useState<PlanKey | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  async function subscribe(plan: PlanKey) {
    setLoading(plan)
    setError(null)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error || "Impossible de démarrer l'abonnement.")
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de démarrer l'abonnement.")
      setLoading(null)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-5 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.key}
            className={`relative rounded-2xl border bg-card p-6 ${
              plan.highlight ? "border-accent glow-cyan" : ""
            }`}
          >
            {plan.badge && (
              <Badge variant="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">
                {plan.badge}
              </Badge>
            )}
            <h3 className="font-display text-xl font-bold">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{plan.note}</p>

            <Button
              variant={plan.highlight ? "accent" : "outline"}
              size="lg"
              className="mt-5 w-full"
              onClick={() => subscribe(plan.key)}
              disabled={loading !== null}
            >
              {loading === plan.key ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirection…
                </>
              ) : (
                "Démarrer 30 jours gratuits"
              )}
            </Button>

            <ul className="mt-6 space-y-2.5">
              {COMMON.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-5 text-center text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
