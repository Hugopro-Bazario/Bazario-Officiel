import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="container py-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main slide */}
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground lg:col-span-2">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/hero-summer.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative grid gap-6 p-8 sm:p-12 lg:p-16">
            <Badge variant="accent" className="w-fit gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Soldes du printemps
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Tout, mieux, partout. Jusqu&apos;à <span className="text-accent">-70 %</span>
            </h1>
            <p className="max-w-xl text-base text-primary-foreground/80 sm:text-lg">
              Plus de 250 000 produits sélectionnés, vendus par des marchands vérifiés.
              Livraison rapide, retour gratuit sous 30 jours.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="accent" size="xl">
                <Link href="/search">
                  Voir les offres
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/premium">Découvrir Premium</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-primary-foreground/80">
              <span>4,9 / 5 sur 280k avis</span>
              <span>·</span>
              <span>Livraison dans 47 pays</span>
              <span>·</span>
              <span>Paiement sécurisé Stripe</span>
            </div>
          </div>
        </div>

        {/* Side cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Link
            href="/c/tech"
            className="group relative overflow-hidden rounded-2xl bg-secondary p-6"
          >
            <div className="relative z-10">
              <Badge variant="default" className="w-fit">Nouveau</Badge>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
                Tech & Audio premium
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Casques, écouteurs, smart-home — sélection 2026.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Explorer
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
          </Link>

          <Link
            href="/seller/dashboard"
            className="group relative overflow-hidden rounded-2xl border bg-card p-6"
          >
            <div className="relative z-10">
              <Badge variant="accent" className="w-fit">Pro</Badge>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
                Vendez sur Bazario
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Touchez 12M+ acheteurs dans 47 pays. 0 € de frais d&apos;inscription.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Ouvrir une boutique
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
