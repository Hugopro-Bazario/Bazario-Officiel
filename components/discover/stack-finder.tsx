"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, ArrowRight, RotateCcw, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/data"

type Goal = {
  id: string
  label: string
  emoji: string
  categories: string[]
}

const GOALS: Goal[] = [
  { id: "sell", label: "Vendre plus", emoji: "📈", categories: ["agents-ia", "automatisations"] },
  { id: "content", label: "Créer du contenu", emoji: "🎨", categories: ["art-ia", "audio-ia", "prompts"] },
  { id: "time", label: "Gagner du temps", emoji: "⚡", categories: ["automatisations", "agents-ia", "saas"] },
  { id: "learn", label: "Monter en compétences", emoji: "🎓", categories: ["formations", "prompts"] },
  { id: "launch", label: "Lancer un projet", emoji: "🚀", categories: ["templates", "saas"] },
]

type Budget = { id: string; label: string; max: number }
const BUDGETS: Budget[] = [
  { id: "s", label: "Moins de 50 €", max: 50 },
  { id: "m", label: "50 € – 150 €", max: 150 },
  { id: "l", label: "Sans limite", max: Infinity },
]

export function StackFinder() {
  const [step, setStep] = React.useState(0)
  const [goal, setGoal] = React.useState<Goal | null>(null)
  const [budget, setBudget] = React.useState<Budget | null>(null)

  const results = React.useMemo(() => {
    if (!goal || !budget) return []
    return products
      .filter((p) => goal.categories.includes(p.category) && p.price <= budget.max)
      .sort((a, b) => b.rating * Math.log10(b.sold + 10) - a.rating * Math.log10(a.sold + 10))
      .slice(0, 3)
  }, [goal, budget])

  function reset() {
    setStep(0)
    setGoal(null)
    setBudget(null)
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Progress */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {[0, 1, 2].map((s) => (
          <span
            key={s}
            className={`h-1.5 rounded-full transition-all ${
              s <= step ? "w-10 bg-accent" : "w-6 bg-border"
            }`}
          />
        ))}
      </div>

      {/* Step 1: goal */}
      {step === 0 && (
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Quel est votre objectif principal ?
          </h2>
          <p className="mt-2 text-muted-foreground">On vous compose la stack idéale en 30 secondes.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GOALS.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setGoal(g)
                  setStep(1)
                }}
                className="group flex items-center gap-3 rounded-2xl border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
              >
                <span className="text-2xl">{g.emoji}</span>
                <span className="font-display text-lg font-bold">{g.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: budget */}
      {step === 1 && (
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Votre budget de départ ?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Objectif : <span className="font-semibold text-foreground">{goal?.label}</span>
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setBudget(b)
                  setStep(2)
                }}
                className="rounded-2xl border bg-card p-6 font-display text-lg font-bold transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
              >
                {b.label}
              </button>
            ))}
          </div>
          <Button variant="ghost" className="mt-6" onClick={() => setStep(0)}>
            Retour
          </Button>
        </div>
      )}

      {/* Step 3: results */}
      {step === 2 && (
        <div>
          <div className="mb-8 text-center">
            <Badge variant="accent" className="gap-1.5">
              <Wand2 className="h-3.5 w-3.5" />
              Votre stack recommandée
            </Badge>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {results.length > 0
                ? "Voici ce qu'on vous conseille"
                : "Aucun produit dans ces critères"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pour <span className="font-semibold text-foreground">{goal?.label}</span> ·{" "}
              {budget?.label}
            </p>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border bg-card p-10 text-center">
              <p className="text-muted-foreground">
                Élargissez votre budget ou explorez tout le catalogue.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
              Recommencer
            </Button>
            <Button asChild variant="accent">
              <Link href="/search">
                <Sparkles className="h-4 w-4" />
                Voir tout le catalogue
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
