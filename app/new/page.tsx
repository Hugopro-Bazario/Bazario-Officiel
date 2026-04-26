import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, ArrowRight, Calendar, Bell } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { CATEGORIES, getNewArrivals } from "@/lib/data"

export const metadata: Metadata = {
  title: "Nouveautés — Les dernières arrivées sur Bazario",
  description:
    "Découvrez en avant-première les nouveautés sélectionnées par nos vendeurs : mode, déco, tech, beauté. Mises à jour chaque semaine.",
  alternates: { canonical: "/new" },
}

export default function NewArrivalsPage() {
  const all = getNewArrivals()
  const featured = all[0]
  const grid = all.slice(0, 24)

  return (
    <div className="bg-secondary/20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div className="space-y-5">
            <Badge variant="accent" className="bg-accent text-accent-foreground">
              <Sparkles className="mr-1.5 size-3" />
              Nouveau cette semaine
            </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Les dernières arrivées sur Bazario
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Une sélection fraîche, validée par nos curateurs. {all.length} produits ajoutés ces derniers jours par les
              meilleurs vendeurs vérifiés.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild size="lg">
                <Link href="#grid">
                  Voir la sélection
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/account#newsletter">
                  <Bell className="mr-1.5 size-4" />
                  Être alerté
                </Link>
              </Button>
            </div>
          </div>

          {featured && (
            <Link
              href={`/p/${featured.slug}`}
              className="group relative block overflow-hidden rounded-lg border bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={featured.images[0]}
                  alt={featured.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  <Sparkles className="size-3" />
                  Coup de cœur de la semaine
                </div>
              </div>
              <div className="space-y-1 p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{featured.brand}</p>
                <h3 className="font-serif text-xl font-semibold leading-tight text-balance">{featured.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{featured.description}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Categories chips */}
      <section className="border-b bg-background">
        <div className="container flex items-center gap-2 overflow-x-auto py-4">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Filtrer par
          </span>
          <Link
            href="/new"
            className="shrink-0 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background"
          >
            Toutes
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="shrink-0 rounded-full border border-input bg-secondary/50 px-4 py-1.5 text-xs font-medium hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Calendar drops */}
      <section className="border-b bg-background">
        <div className="container py-8">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="font-serif text-2xl font-bold">Calendrier des sorties</h2>
            <span className="text-xs text-muted-foreground">7 prochains jours</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { day: "Aujourd'hui", count: 12, mood: "Mode • Tech" },
              { day: "Demain", count: 8, mood: "Beauté • Maison" },
              { day: "Vendredi", count: 14, mood: "Sport • Auto" },
              { day: "Samedi", count: 6, mood: "Enfant • Alimentation" },
            ].map((d) => (
              <Card key={d.day} className="p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  <Calendar className="size-3.5" />
                  {d.day}
                </div>
                <p className="mt-2 text-2xl font-bold">{d.count}</p>
                <p className="text-xs text-muted-foreground">nouveautés • {d.mood}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section id="grid" className="container py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Sélection fraîche</h2>
          <span className="text-xs text-muted-foreground">{grid.length} produits</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {grid.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
