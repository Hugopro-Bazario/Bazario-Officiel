import type { Metadata } from "next"
import { NexusPlans } from "@/components/premium/nexus-plans"
import { Crown, Download, Bot, ShieldCheck, Sparkles, Infinity as InfinityIcon, TrendingUp, Wallet } from "lucide-react"

export const metadata: Metadata = {
  title: "Bazario Nexus+ — l'abonnement des créateurs augmentés",
  description:
    "−20 % sur tout le catalogue digital, crédits IA mensuels, accès anticipé aux drops et coffre-fort de licences à vie. 30 jours d'essai gratuit.",
}

const PERKS = [
  {
    icon: Download,
    title: "−20 % sur tout le catalogue",
    desc: "Agents IA, prompts, templates, formations, musique : remise automatique sur chaque achat.",
  },
  {
    icon: Bot,
    title: "Crédits IA chaque mois",
    desc: "Images, voix et textes générés inclus dans votre abonnement, renouvelés tous les mois.",
  },
  {
    icon: Sparkles,
    title: "Accès anticipé aux drops",
    desc: "24 h d'avance sur les lancements, cohortes et éditions limitées les plus demandées.",
  },
  {
    icon: ShieldCheck,
    title: "Coffre-fort de licences",
    desc: "Tous vos achats, vos licences et vos mises à jour à vie réunis et sécurisés au même endroit.",
  },
  {
    icon: InfinityIcon,
    title: "Mises à jour à vie",
    desc: "Vos produits évoluent avec chaque nouvelle génération de modèles IA, sans surcoût.",
  },
  {
    icon: TrendingUp,
    title: "Tableau de bord ROI",
    desc: "Suivez le temps et l'argent économisés par vos outils, et vos revenus si vous êtes créateur.",
  },
]

export default function PremiumPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="bg-cyber-grid absolute inset-0" />
          <div className="animate-float-slow absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
          <div className="animate-glow-pulse absolute right-0 top-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              <Crown className="h-3.5 w-3.5" />
              Bazario Nexus+
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              L&apos;abonnement des <span className="text-gradient">créateurs augmentés</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              −20 % sur tout le catalogue, des crédits IA chaque mois, l&apos;accès anticipé aux drops et
              le coffre-fort de licences. Économies moyennes : <span className="font-semibold text-foreground">312 € par an</span>.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
              <Wallet className="h-4 w-4" />
              30 jours d&apos;essai gratuit · résiliable en 1 clic
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((perk) => (
            <div key={perk.title} className="rounded-2xl border bg-card p-6 transition-colors hover:border-accent/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <perk.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold leading-tight">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="border-t bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Choisissez votre formule
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sans engagement. Les 30 premiers jours sont offerts, vous n&apos;êtes débité qu&apos;ensuite.
            </p>
          </div>
          <NexusPlans />
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
            Paiement sécurisé par Stripe. Vous pouvez gérer ou résilier votre abonnement à tout moment depuis
            votre espace. L&apos;essai gratuit ne vous engage à rien.
          </p>
        </div>
      </section>
    </div>
  )
}
