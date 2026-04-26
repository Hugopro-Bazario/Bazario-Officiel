import Link from "next/link"
import Image from "next/image"
import { Star, BadgeCheck, ArrowRight, Globe } from "lucide-react"
import { SELLERS } from "@/lib/data"

export function FeaturedSellers() {
  return (
    <section className="container py-12 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Les meilleures boutiques
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Vendeurs vedettes,
            <br className="hidden sm:block" />
            <span className="text-muted-foreground">vérifiés un par un.</span>
          </h2>
        </div>
        <Link
          href="/sellers"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
        >
          Tous les vendeurs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {SELLERS.map((seller) => (
          <Link
            key={seller.id}
            href={`/seller/${seller.slug}`}
            className="group relative isolate flex flex-col overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border bg-muted">
                <Image
                  src={seller.logo}
                  alt={seller.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="inline-flex items-center gap-1 text-sm font-bold leading-tight">
                  <span className="truncate">{seller.name}</span>
                  {seller.verified && (
                    <span title="Vendeur vérifié" className="text-primary">
                      <BadgeCheck className="h-4 w-4 shrink-0" aria-label="Vendeur vérifié" />
                    </span>
                  )}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  {seller.country}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-4 text-xs">
              <div>
                <p className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="font-bold text-foreground">{seller.rating}</span>
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {seller.reviewCount.toLocaleString("fr-FR")} avis
                </p>
              </div>
              <div>
                <p className="font-bold text-foreground">{seller.productCount.toLocaleString("fr-FR")}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">produits</p>
              </div>
            </div>

            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2">
              Visiter la boutique
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
