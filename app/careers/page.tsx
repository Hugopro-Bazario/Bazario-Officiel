import type { Metadata } from "next"
import Link from "next/link"
import { Rocket, Globe2, Sparkles, HeartHandshake, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Carrières — Construisez le marché du futur",
  description:
    "Rejoignez Bazario, la marketplace des produits et services digitaux augmentés par l'IA. Postes en ingénierie, design, IA et croissance. Full-remote, Europe.",
  alternates: { canonical: "/careers" },
}

const VALUES = [
  { icon: Rocket, title: "Vitesse & impact", desc: "Petites équipes, décisions rapides, code en production le jour même." },
  { icon: Sparkles, title: "IA-native", desc: "Chaque poste est augmenté par l'IA. On construit avec, pas contre." },
  { icon: Globe2, title: "Full-remote", desc: "Travaillez d'où vous voulez en Europe. Résultats, pas présence." },
  { icon: HeartHandshake, title: "Créateurs d'abord", desc: "On sert 8 000 créateurs. Leur réussite est notre boussole." },
]

const ROLES = [
  { team: "Ingénierie", title: "Ingénieur·e Full-Stack (Next.js / TypeScript)", type: "CDI · Full-remote" },
  { team: "IA", title: "Ingénieur·e IA — Agents & LLM", type: "CDI · Full-remote" },
  { team: "Design", title: "Product Designer (UI/UX futuriste)", type: "CDI · Full-remote" },
  { team: "Croissance", title: "Growth / SEO Lead", type: "CDI · Full-remote" },
  { team: "Créateurs", title: "Creator Success Manager", type: "CDI · Full-remote" },
]

export default function CareersPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-cyber-grid absolute inset-0 opacity-60" />
        <div className="animate-float-slow absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-glow-pulse absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <section className="container relative py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Rocket className="h-3.5 w-3.5" />
            On recrute
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Construisez le <span className="text-gradient">marché du futur</span>
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Bazario réinvente la façon dont le monde achète et vend des produits digitaux. Rejoignez une équipe
            qui livre vite, pense grand et met l&apos;IA au cœur de tout.
          </p>
        </div>
      </section>

      <section className="container relative pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <v.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container relative py-14">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">Postes ouverts</h2>
        <div className="overflow-hidden rounded-2xl border bg-card">
          {ROLES.map((r, i) => (
            <div
              key={r.title}
              className={`flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between ${
                i < ROLES.length - 1 ? "border-b" : ""
              }`}
            >
              <div>
                <Badge variant="secondary" className="mb-1.5">{r.team}</Badge>
                <p className="font-semibold">{r.title}</p>
                <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {r.type}
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <Link href={`/contact?sujet=carrieres&poste=${encodeURIComponent(r.title)}`}>
                  Postuler
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Vous ne trouvez pas votre poste ? Écrivez-nous à{" "}
          <a href="mailto:jobs@bazario.com" className="font-semibold text-accent hover:underline">
            jobs@bazario.com
          </a>{" "}
          — on adore les candidatures spontanées.
        </p>
      </section>
    </div>
  )
}
