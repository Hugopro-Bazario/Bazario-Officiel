import Link from "next/link"
import { ArrowRight, Globe2, Truck, Zap } from "lucide-react"
import { PRODUCTS } from "@/lib/data"
import { ProductCard } from "@/components/product/product-card"

const DROPSHIP_SLUGS = [
  "friteuse-air-pro-6l",
  "pistolet-massage-deeptouch",
  "masque-led-photo-therapy",
  "brosse-soufflante-glow",
  "videoprojecteur-cube-smart",
  "fontaine-eau-chat-silencieuse",
  "trepied-ring-light-bluetooth",
  "humidificateur-ultrason-mist",
]

export function DropshipRail() {
  const items = DROPSHIP_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter(
    Boolean,
  ) as typeof PRODUCTS

  if (items.length === 0) return null

  return (
    <section className="container py-12 md:py-16">
      <div className="holo-border relative isolate overflow-hidden rounded-3xl bg-aurora-soft p-6 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <Globe2 className="h-3.5 w-3.5" />
              Tendances mondiales
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              Pépites dropshipping vérifiées
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Sélection des produits qui cartonnent en ce moment, expédiés directement depuis nos
              entrepôts CJ et Spocket EU. Marges contrôlées, qualité testée par nos acheteurs
              mystères.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground">
                <Truck className="h-3.5 w-3.5 text-primary" />
                Expédié en 8-14 j
              </span>
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground">
                <Zap className="h-3.5 w-3.5 text-accent" />
                Jusqu&apos;à -65 %
              </span>
            </div>
          </div>
          <Link
            href="/search?fulfilment=dropship"
            className="magnetic-underline inline-flex items-center gap-2 self-start text-sm font-semibold text-primary md:self-end"
          >
            Voir les 16 pépites
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
