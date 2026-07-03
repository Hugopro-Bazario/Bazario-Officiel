import type { Metadata } from "next"
import { Boxes, ShieldCheck, Zap, Infinity as InfinityIcon } from "lucide-react"
import { BUNDLES } from "@/lib/bundles"
import { BundleCard } from "@/components/bundles/bundle-card"

export const metadata: Metadata = {
  title: "Packs Bazario — les stacks complètes à prix réduit",
  description:
    "Machine de vente, studio de contenu, lancement SaaS, académie IA : des packs de produits digitaux complémentaires avec jusqu'à −25 %, livrés instantanément.",
  alternates: { canonical: "/bundles" },
}

const REASSURANCE = [
  { icon: Zap, label: "Livraison instantanée du pack complet" },
  { icon: InfinityIcon, label: "Mises à jour à vie sur chaque produit" },
  { icon: ShieldCheck, label: "Garantie 14 jours satisfait ou remboursé" },
]

export default function BundlesPage() {
  const SITE = "https://www.bazario-official.com"
  const bundlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Packs Bazario — stacks de produits digitaux",
    url: `${SITE}/bundles`,
    numberOfItems: BUNDLES.length,
    itemListElement: BUNDLES.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `Pack ${b.name}`,
        description: b.description,
        url: `${SITE}/bundles`,
        offers: {
          "@type": "Offer",
          price: b.price.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  }

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bundlesJsonLd) }}
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-cyber-grid absolute inset-0 opacity-60" />
        <div className="animate-float-slow absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-glow-pulse absolute left-0 top-1/2 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <section className="container relative py-14 sm:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            <Boxes className="h-3.5 w-3.5" />
            Packs Bazario
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Des stacks complètes, <span className="text-gradient">jusqu&apos;à −25 %</span>
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Les produits qui fonctionnent ensemble, réunis et remisés. Choisissez votre objectif,
            on a déjà composé la stack.
          </p>
        </div>

        <div className="grid gap-6 pt-3 md:grid-cols-2">
          {BUNDLES.map((bundle) => (
            <BundleCard key={bundle.slug} bundle={bundle} />
          ))}
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          {REASSURANCE.map((r) => (
            <li key={r.label} className="inline-flex items-center gap-2">
              <r.icon className="h-3.5 w-3.5 text-accent" />
              {r.label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
