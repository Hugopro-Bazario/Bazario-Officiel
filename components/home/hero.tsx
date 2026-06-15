import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Star, Zap, ShieldCheck, Bot, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ANNOUNCEMENTS = [
  "Livraison instantanée sur tous les produits",
  "Mises à jour à vie incluses",
  "Garantie 14 jours satisfait ou remboursé",
  "Paiement sécurisé Stripe + Apple Pay + Google Pay",
  "Créateurs vérifiés, licences claires",
  "Support augmenté par IA, 24/7",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Announcement marquee */}
      <div className="border-b border-accent/20 bg-secondary/80">
        <div className="flex overflow-hidden py-2">
          <div className="flex shrink-0 animate-marquee items-center gap-8 px-4 text-xs font-medium tracking-wide text-foreground/90">
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fond cyber : grille + orbes néon */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-cyber-grid absolute inset-0" />
        <div className="animate-float-slow absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-glow-pulse absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-[hsl(var(--neon-magenta)/0.12)] blur-3xl" />
      </div>

      <div className="container relative py-8 lg:py-12">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Main slide */}
          <div className="border-glow relative isolate overflow-hidden rounded-3xl lg:col-span-8">
            <div className="absolute inset-0 z-0">
              <Image
                src="/digital/hero-nexus.svg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
            </div>

            <div className="relative z-10 grid gap-6 p-8 sm:p-12 lg:p-16">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Nouvelle génération · 2026
                </Badge>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-accent" />
                  +12 400 téléchargements aujourd&apos;hui
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
                Le marché
                <br />
                <span className="text-gradient">du futur.</span>
              </h1>

              <p className="max-w-xl text-base text-muted-foreground sm:text-lg sm:leading-relaxed">
                Agents IA, prompts, templates, formations, musique générative :
                18 000 produits digitaux créés par des studios vérifiés,
                livrés instantanément dans votre espace.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="accent" size="xl" className="glow-cyan">
                  <Link href="/search">
                    Explorer le catalogue
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-primary/40 bg-primary/10 text-foreground backdrop-blur hover:bg-primary/20"
                >
                  <Link href="/premium">Découvrir Nexus+</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
                <Stat icon={Download} value="Instantané" label="Livraison numérique" />
                <Stat icon={Star} value="4,9 / 5" label="280k avis vérifiés" />
                <Stat icon={ShieldCheck} value="14 jours" label="Satisfait ou remboursé" />
              </div>
            </div>
          </div>

          {/* Side stack */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <Link
              href="/c/agents-ia"
              className="group relative isolate overflow-hidden rounded-3xl border border-accent/20 bg-secondary/60 p-6 backdrop-blur transition-all hover:border-accent/50 hover:shadow-lg"
            >
              <div className="absolute -right-6 top-1/2 z-0 h-44 w-44 -translate-y-1/2 rounded-full bg-accent/15 blur-2xl" />
              <div className="relative z-10 flex h-full flex-col">
                <Badge className="w-fit gap-1.5">
                  <Bot className="h-3.5 w-3.5" />
                  Tendance 2026
                </Badge>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight">
                  Agents IA autonomes
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Vente, support, SEO, veille — des employés numériques opérationnels en 48 h.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent transition-all group-hover:gap-2">
                  Explorer
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute right-4 top-4 h-20 w-20 overflow-hidden rounded-2xl border border-accent/30 bg-background">
                <Image src="/digital/p-orion.svg" alt="" fill sizes="80px" className="object-cover" />
              </div>
            </Link>

            <Link
              href="/sell"
              className="group relative isolate overflow-hidden rounded-3xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="absolute -left-6 bottom-0 z-0 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
              <div className="relative z-10 flex h-full flex-col">
                <Badge variant="accent" className="w-fit gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  Créateurs
                </Badge>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight">
                  Vendez vos créations digitales
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prompts, templates, musique, agents : touchez 12M+ d&apos;acheteurs. 0 € de frais fixes,
                  paiement J+2.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent transition-all group-hover:gap-2">
                  Ouvrir mon studio
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="inline-flex items-center gap-1.5">
        <Icon className="h-4 w-4 text-accent" />
        <span className="font-display text-base font-bold text-foreground">{value}</span>
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
