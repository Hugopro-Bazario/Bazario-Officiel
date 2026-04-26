import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Star, Zap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ANNOUNCEMENTS = [
  "Livraison gratuite dès 49 €",
  "Retour offert sous 30 jours",
  "Paiement en 3x sans frais",
  "Service client 24/7",
  "Garantie acheteur 100%",
  "Stripe + Apple Pay + Google Pay",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Announcement marquee */}
      <div className="border-b bg-foreground text-background">
        <div className="flex overflow-hidden py-2">
          <div className="flex shrink-0 animate-marquee items-center gap-8 px-4 text-xs font-medium tracking-wide">
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Main slide */}
          <div className="relative isolate overflow-hidden rounded-3xl bg-primary text-primary-foreground lg:col-span-8">
            <div className="absolute inset-0 z-0">
              <Image
                src="/hero-summer.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" />
              <div className="bg-grain absolute inset-0 opacity-40 mix-blend-overlay" />
            </div>

            <div className="relative z-10 grid gap-6 p-8 sm:p-12 lg:p-16">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Édition Printemps 2026
                </Badge>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-success" />
                  +12 400 ventes en direct
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
                Tout, mieux,
                <br />
                <span className="relative inline-block">
                  partout.
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 rounded-full bg-accent/60" />
                </span>{" "}
                <span className="text-accent">−70 %</span>
              </h1>

              <p className="max-w-xl text-base text-primary-foreground/85 sm:text-lg sm:leading-relaxed">
                250 000 produits sélectionnés, 8 000 vendeurs vérifiés, 47 pays livrés.
                Bazario rassemble le meilleur du commerce mondial dans une seule app.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="accent" size="xl" className="shadow-lg">
                  <Link href="/search">
                    Voir les offres
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground backdrop-blur hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  <Link href="/premium">Découvrir Premium</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/80">
                <Stat icon={Star} value="4,9 / 5" label="280k avis vérifiés" />
                <Stat icon={Zap} value="24 h" label="Livraison express" />
                <Stat icon={ShieldCheck} value="100%" label="Garantie acheteur" />
              </div>
            </div>
          </div>

          {/* Side stack */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <Link
              href="/c/tech"
              className="group relative isolate overflow-hidden rounded-3xl bg-secondary p-6 transition-shadow hover:shadow-lg"
            >
              <div className="absolute -right-6 top-1/2 z-0 h-44 w-44 -translate-y-1/2 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative z-10 flex h-full flex-col">
                <Badge className="w-fit">Sélection 2026</Badge>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight">
                  Tech &amp; Audio premium
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Casques, écouteurs, smart-home — tout ce que les pros recommandent.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-all group-hover:gap-2">
                  Explorer
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute right-4 top-4 h-20 w-20 overflow-hidden rounded-2xl border bg-background">
                <Image src="/product-headphones-1.jpg" alt="" fill sizes="80px" className="object-cover" />
              </div>
            </Link>

            <Link
              href="/sell"
              className="group relative isolate overflow-hidden rounded-3xl border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <div className="relative z-10 flex h-full flex-col">
                <Badge variant="accent" className="w-fit">Pro</Badge>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight">
                  Vendez sur Bazario
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Atteignez 12M+ acheteurs dans 47 pays. Inscription gratuite, paiement
                  J+2.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-all group-hover:gap-2">
                  Ouvrir une boutique
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
        <span className="font-display text-base font-bold text-primary-foreground">{value}</span>
      </span>
      <span className="text-xs text-primary-foreground/65">{label}</span>
    </div>
  )
}
