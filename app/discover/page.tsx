import type { Metadata } from "next"
import { Sparkles } from "lucide-react"
import { StackFinder } from "@/components/discover/stack-finder"

export const metadata: Metadata = {
  title: "Assistant Bazario — Trouvez votre stack IA",
  description:
    "Répondez à 2 questions et notre assistant compose la stack de produits digitaux et d'outils IA idéale pour votre objectif et votre budget.",
  alternates: { canonical: "/discover" },
}

export default function DiscoverPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Fond cyber */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-cyber-grid absolute inset-0 opacity-60" />
        <div className="animate-float-slow absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-glow-pulse absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <section className="container relative py-14 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Assistant Bazario
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Trouvez votre <span className="text-gradient">stack IA</span>
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Deux questions, et on vous compose la sélection de produits digitaux la plus adaptée
            à votre objectif et votre budget.
          </p>
        </div>

        <StackFinder />
      </section>
    </div>
  )
}
