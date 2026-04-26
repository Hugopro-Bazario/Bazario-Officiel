import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  BadgeCheck,
  MessageSquare,
  Store,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProductGallery } from "@/components/product/product-gallery"
import { AddToCart } from "@/components/product/add-to-cart"
import { ProductCard } from "@/components/product/product-card"
import { ProductTabs } from "@/components/product/product-tabs"
import { LiveActivity } from "@/components/product/live-activity"
import { FrequentlyBought } from "@/components/product/frequently-bought"
import { Reviews } from "@/components/product/reviews"
import { getProductBySlug, getRelatedProducts } from "@/lib/data"
import { discountPercent } from "@/lib/utils"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(slug)
  const galleryBadge = product.badges.includes("flash")
    ? {
        text: `Flash -${discountPercent(product.compareAtPrice ?? product.price, product.price)}%`,
        tone: "destructive" as const,
      }
    : product.badges.includes("new")
      ? { text: "Nouveauté", tone: "primary" as const }
      : product.badges.includes("bestseller")
        ? { text: "Best-seller", tone: "accent" as const }
        : undefined

  return (
    <div className="bg-secondary/30">
      <div className="container py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-muted-foreground" aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-foreground">
                Accueil
              </Link>
            </li>
            {product.categoryPath.map((seg, i) => (
              <li key={i} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                <span
                  className={
                    i === product.categoryPath.length - 1
                      ? "font-medium text-foreground"
                      : "hover:text-foreground"
                  }
                >
                  {seg}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} alt={product.title} badge={galleryBadge} />
          </div>

          {/* Sticky purchase rail */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {product.brand}
                </p>
                <h1 className="mt-1.5 font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
                  {product.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                  <a
                    href="#reviews"
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    <span className="inline-flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < Math.round(product.rating)
                              ? "h-4 w-4 fill-accent text-accent"
                              : "h-4 w-4 text-muted-foreground/30"
                          }
                        />
                      ))}
                    </span>
                    <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">
                      ({product.reviewCount.toLocaleString("fr-FR")})
                    </span>
                  </a>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {product.sold.toLocaleString("fr-FR")} vendus
                  </span>
                </div>

                {product.badges.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.badges.map((b) => (
                      <Badge
                        key={b}
                        variant={
                          b === "flash" ? "destructive" : b === "new" ? "default" : "secondary"
                        }
                      >
                        {b === "flash" && "Vente flash"}
                        {b === "new" && "Nouveauté"}
                        {b === "bestseller" && "Best-seller"}
                        {b === "premium" && "Premium"}
                        {b === "eco" && "Éco-responsable"}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <AddToCart product={product} />

              <LiveActivity slug={product.slug} />

              {/* Trust mini-grid */}
              <ul className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <li className="rounded-lg bg-secondary/60 p-2.5">
                  <Truck className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <span className="font-semibold leading-tight">Livraison rapide</span>
                </li>
                <li className="rounded-lg bg-secondary/60 p-2.5">
                  <RefreshCw className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <span className="font-semibold leading-tight">Retours 30 j</span>
                </li>
                <li className="rounded-lg bg-secondary/60 p-2.5">
                  <Shield className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <span className="font-semibold leading-tight">Paiement sûr</span>
                </li>
              </ul>
            </div>

            {/* Seller card */}
            <div className="mt-4 rounded-2xl border bg-card p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Vendu et expédié par
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-secondary">
                  <Image
                    src={product.seller.logo}
                    alt={product.seller.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="inline-flex items-center gap-1 truncate text-sm font-semibold">
                    {product.seller.name}
                    {product.seller.verified && (
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    )}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="font-semibold text-foreground tabular-nums">
                      {product.seller.rating}
                    </span>
                    <span>({product.seller.reviewCount.toLocaleString("fr-FR")})</span>
                    <span aria-hidden>·</span>
                    <span>{product.seller.country}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/seller/${product.seller.slug}`}>
                    <Store className="h-4 w-4" />
                    Boutique
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                  Contacter
                </Button>
              </div>
            </div>

            {/* Premium hint */}
            <Link
              href="/premium"
              className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 transition hover:bg-primary/10"
            >
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="text-xs">
                <p className="font-semibold text-foreground">
                  Bazario Premium · 6,99 €/mois
                </p>
                <p className="mt-0.5 text-muted-foreground">
                  Livraison illimitée gratuite, ventes privées et 30 jours de retour étendu.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Frequently bought */}
        {related.length >= 2 && (
          <div className="mt-10">
            <FrequentlyBought main={product} suggestions={related.slice(0, 2)} />
          </div>
        )}

        {/* Tabs */}
        <div className="mt-10">
          <ProductTabs product={product} />
        </div>

        {/* Reviews */}
        <section id="reviews" className="mt-10">
          <Reviews product={product} />
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Recommandations
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Vous pourriez aussi aimer
                </h2>
              </div>
              <Link
                href="/search"
                className="hidden text-sm font-medium text-primary hover:underline sm:inline"
              >
                Voir tout
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
