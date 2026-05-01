import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Trophy, Flame, ArrowRight, ShieldCheck, TrendingUp, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { CATEGORIES, getBestSellers, formatPrice } from "@/lib/data"

export const metadata: Metadata = {
  title: "Top des ventes — Les produits préférés des clients Bazario",
  description:
    "Découvrez les bestsellers Bazario, classés selon les ventes des 30 derniers jours : mode, tech, maison, beauté, sport.",
  alternates: { canonical: "/bestsellers" },
}

export default function BestSellersPage() {
  const all = getBestSellers()
  const podium = all.slice(0, 3)
  const rest = all.slice(3, 24)

  return (
    <div className="bg-secondary/20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-primary text-primary-foreground">
        <div className="bg-grain absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container relative grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div className="space-y-5">
            <Badge className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">
              <Trophy className="mr-1.5 size-3" />
              Mis à jour toutes les heures
            </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Le top des ventes Bazario
            </h1>
            <p className="max-w-xl text-base text-primary-foreground/80 md:text-lg">
              Plus de <strong className="text-primary-foreground">2,4 millions de commandes</strong> ce mois.
              Voici ce que nos {(840000).toLocaleString("fr-FR")}+ clients ajoutent au panier en ce moment.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { icon: TrendingUp, label: "Classement temps réel" },
                { icon: ShieldCheck, label: "Tous vendeurs vérifiés" },
                { icon: Flame, label: "Stocks limités" },
              ].map((c) => {
                const Ic = c.icon
                return (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs"
                  >
                    <Ic className="size-3" />
                    {c.label}
                  </span>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {podium.map((p, i) => (
              <Link key={p.id} href={`/p/${p.slug}`} className="group">
                <Card className="relative overflow-hidden border-primary-foreground/10 bg-primary-foreground/5 p-3 transition-transform group-hover:-translate-y-1">
                  <div className="absolute left-2 top-2 z-10 flex size-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground shadow-lg">
                    {i + 1}
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-md bg-primary-foreground/10">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="(min-width: 768px) 200px, 33vw" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug">{p.title}</p>
                  <p className="mt-1 text-[11px] text-primary-foreground/60">
                    {p.sold.toLocaleString("fr-FR")} vendus
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter pills by category */}
      <section className="border-b bg-background">
        <div className="container flex items-center gap-2 overflow-x-auto py-4">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Top par catégorie
          </span>
          <div className="flex gap-2">
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
        </div>
      </section>

      {/* Ranked list */}
      <section className="container py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Le classement complet</h2>
          <span className="text-xs text-muted-foreground">
            {all.length} produits • Top 1-{Math.min(all.length, 24)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {podium.map((p, i) => (
            <RankedCard key={p.id} rank={i + 1} product={p} />
          ))}
          {rest.map((p, i) => (
            <RankedCard key={p.id} rank={i + 4} product={p} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/search">
              Explorer tous les produits
              <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t bg-background">
        <div className="container grid gap-6 py-8 sm:grid-cols-3">
          {[
            { stat: "98 %", label: "Clients satisfaits" },
            { stat: "30 jours", label: "Retour gratuit" },
            { stat: "4,8 / 5", label: "Note moyenne vendeurs" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="text-3xl font-bold text-primary">{s.stat}</div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function RankedCard({ rank, product }: { rank: number; product: ReturnType<typeof getBestSellers>[number] }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className={
          "absolute left-2 top-2 z-10 flex size-7 items-center justify-center rounded-full text-xs font-bold shadow-md " +
          (rank <= 3 ? "bg-accent text-accent-foreground" : "bg-foreground text-background")
        }
      >
        {rank}
      </div>
      <ProductCard product={product} />
      <div className="mt-1 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Flame className="size-3 text-accent" />
          {product.sold.toLocaleString("fr-FR")} vendus
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="size-3 fill-current text-amber-500" />
          {product.rating} • {formatPrice(product.price)}
        </span>
      </div>
    </div>
  )
}
