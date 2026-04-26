import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Tag, Flame, Clock, ArrowRight, Percent } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { CATEGORIES, getDeals, formatPrice } from "@/lib/data"
import { discountPercent } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Soldes & ventes flash — Économisez jusqu'à 50 %",
  description:
    "Soldes Bazario, codes promo et ventes flash : jusqu'à 50 % de réduction sur des produits sélectionnés. Stocks limités, retour gratuit 30 jours.",
  alternates: { canonical: "/deals" },
}

export default function DealsPage() {
  const all = getDeals()
  const top = all.slice(0, 4)
  const grid = all.slice(0, 24)

  // Pretend the flash sale ends today at midnight
  const now = new Date()
  const endsAt = new Date(now)
  endsAt.setHours(23, 59, 59, 999)
  const hoursLeft = Math.max(0, Math.round((endsAt.getTime() - now.getTime()) / 3600000))

  return (
    <div className="bg-secondary/20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-accent text-accent-foreground">
        <div className="bg-grain absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="container relative grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-center md:py-16">
          <div className="space-y-5">
            <Badge className="border-accent-foreground/20 bg-accent-foreground/10 text-accent-foreground">
              <Flame className="mr-1.5 size-3" />
              Vente flash en cours
            </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Jusqu'à -50 % sur une sélection rare
            </h1>
            <p className="max-w-xl text-base text-accent-foreground/85 md:text-lg">
              {all.length} produits en promotion sur Bazario. Stocks volontairement limités, livraison toujours offerte
              dès 49 €.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { icon: Percent, label: "-50 % max" },
                { icon: Clock, label: `Fin dans ${hoursLeft} h` },
                { icon: Tag, label: "Code BAZ10 supplémentaire" },
              ].map((c) => {
                const Ic = c.icon
                return (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent-foreground/20 bg-accent-foreground/5 px-3 py-1 text-xs font-medium"
                  >
                    <Ic className="size-3" />
                    {c.label}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-accent-foreground/15 bg-accent-foreground/5 p-5 backdrop-blur md:w-72">
            <p className="text-xs uppercase tracking-wide text-accent-foreground/70">Code de bienvenue</p>
            <p className="font-mono text-2xl font-bold">BAZ10</p>
            <p className="text-xs text-accent-foreground/80">
              -10 % supplémentaires dès 60 € d'achat. Cumulables avec les promos en cours.
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-1 w-full">
              <Link href="#grid">
                Activer et explorer
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top deals strip */}
      <section className="border-b bg-background">
        <div className="container py-8">
          <h2 className="mb-5 font-serif text-2xl font-bold">Les 4 meilleures réductions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {top.map((p) => {
              const off = p.compareAtPrice ? discountPercent(p.compareAtPrice, p.price) : 0
              return (
                <Link key={p.id} href={`/p/${p.slug}`} className="group">
                  <Card className="relative overflow-hidden transition-transform group-hover:-translate-y-1">
                    <div className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground shadow">
                      -{off}%
                    </div>
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={p.images[0]}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{p.brand}</p>
                      <p className="line-clamp-2 text-sm font-medium leading-snug">{p.title}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-base font-bold text-accent">{formatPrice(p.price)}</span>
                        {p.compareAtPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(p.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories chips */}
      <section className="border-b bg-background">
        <div className="container flex items-center gap-2 overflow-x-auto py-4">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Promos par univers
          </span>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="shrink-0 rounded-full border border-input bg-secondary/50 px-4 py-1.5 text-xs font-medium hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section id="grid" className="container py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Toutes les promotions</h2>
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
