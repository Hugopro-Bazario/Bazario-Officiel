import Link from "next/link"
import Image from "next/image"
import { Star, BadgeCheck, ArrowRight } from "lucide-react"
import { SELLERS } from "@/lib/data"

export function FeaturedSellers() {
  return (
    <section className="container py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Vendeurs vedettes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Marchands vérifiés par notre équipe qualité.
          </p>
        </div>
        <Link
          href="/sellers"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Tous les vendeurs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {SELLERS.map((seller) => (
          <Link
            key={seller.id}
            href={`/seller/${seller.slug}`}
            className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center transition-colors hover:border-primary/40"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
              <Image
                src={seller.logo}
                alt={seller.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="inline-flex items-center gap-1 text-sm font-semibold">
                {seller.name}
                {seller.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
              </p>
              <p className="text-xs text-muted-foreground">{seller.country}</p>
              <div className="mt-1 inline-flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="font-medium">{seller.rating}</span>
                <span className="text-muted-foreground">
                  ({seller.reviewCount.toLocaleString("fr-FR")})
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
