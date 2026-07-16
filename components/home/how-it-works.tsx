import Link from "next/link"
import { ArrowRight, Search, Lock, Zap } from "lucide-react"

const STEPS = [
  {
    n: "1",
    icon: Search,
    title: "Choisissez",
    desc: "8 univers digitaux, des packs prêts à l'emploi, ou laissez l'Assistant IA composer votre stack idéale en 30 secondes.",
    links: [
      { label: "Explorer le catalogue", href: "/search" },
      { label: "Voir les packs", href: "/bundles" },
      { label: "Assistant IA", href: "/discover" },
    ],
  },
  {
    n: "2",
    icon: Lock,
    title: "Payez en sécurité",
    desc: "Carte, Apple Pay ou Google Pay via Stripe. Remises packs automatiques, et −20 % sur tout avec l'abonnement Nexus+.",
    links: [{ label: "Découvrir Nexus+", href: "/premium" }],
  },
  {
    n: "3",
    icon: Zap,
    title: "Recevez instantanément",
    desc: "Vos produits, licences et liens de téléchargement arrivent à la seconde dans votre espace et par email. Mises à jour à vie incluses.",
    links: [{ label: "Garantie 14 jours", href: "/legal/terms" }],
  },
]

export function HowItWorks() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Simple comme 1-2-3</p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Comment ça marche ?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Tout Bazario tient en trois étapes : pas de stock, pas de délai, pas de surprise.
        </p>
      </div>

      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="relative flex flex-col rounded-2xl border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <span
              className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-accent-foreground glow-cyan"
              aria-hidden
            >
              {step.n}
            </span>
            <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <step.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4">
              {step.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:gap-1.5 transition-all"
                >
                  {link.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
