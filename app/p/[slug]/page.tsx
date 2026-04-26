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
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProductGallery } from "@/components/product/product-gallery"
import { AddToCart } from "@/components/product/add-to-cart"
import { ProductCard } from "@/components/product/product-card"
import { Reviews } from "@/components/product/reviews"
import { getProductBySlug, getRelatedProducts } from "@/lib/data"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(slug)

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="mb-3 text-xs text-muted-foreground" aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          {product.categoryPath.map((seg, i) => (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              <span className={i === product.categoryPath.length - 1 ? "text-foreground" : "hover:text-foreground"}>
                {seg}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <ProductGallery images={product.images} alt={product.title} />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl text-balance">
              {product.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <div className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <a href="#reviews" className="text-muted-foreground hover:text-foreground">
                  ({product.reviewCount.toLocaleString("fr-FR")} avis)
                </a>
              </div>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                {product.sold.toLocaleString("fr-FR")} vendus
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <Badge
                  key={b}
                  variant={b === "flash" ? "destructive" : b === "new" ? "default" : "secondary"}
                >
                  {b === "flash" && "Vente flash"}
                  {b === "new" && "Nouveauté"}
                  {b === "bestseller" && "Best-seller"}
                  {b === "premium" && "Premium"}
                  {b === "eco" && "Éco-responsable"}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <AddToCart product={product} />

          <Separator />

          {/* Seller */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
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
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="font-medium text-foreground">{product.seller.rating}</span>
                  <span>({product.seller.reviewCount.toLocaleString("fr-FR")})</span>
                  <span aria-hidden>·</span>
                  <span>{product.seller.country}</span>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/seller/${product.seller.slug}`}>
                  <Store className="h-4 w-4" />
                  Boutique
                </Link>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="mt-3 w-full">
              <MessageSquare className="h-4 w-4" />
              Contacter le vendeur
            </Button>
          </div>

          {/* Trust */}
          <ul className="grid gap-2 text-sm">
            <li className="flex items-start gap-3 rounded-md border bg-card p-3">
              <Truck className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Livraison vers la France</p>
                <p className="text-xs text-muted-foreground">
                  Expédié de {product.shippingFrom} · {product.estimatedDelivery}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-md border bg-card p-3">
              <RefreshCw className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">{product.returns}</p>
                <p className="text-xs text-muted-foreground">Remboursement intégral garanti</p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-md border bg-card p-3">
              <Shield className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">Paiement sécurisé</p>
                <p className="text-xs text-muted-foreground">Stripe · 3D Secure · Apple/Google Pay</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Description & specs */}
      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-bold">Description</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Caractéristiques</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Spec label="Marque" value={product.brand} />
            <Spec label="SKU" value={product.variants[0]?.sku ?? "-"} />
            <Spec label="Catégorie" value={product.categoryPath.join(" > ")} />
            <Spec label="Expédié de" value={product.shippingFrom} />
            <Spec label="Livraison estimée" value={product.estimatedDelivery} />
            <Spec label="Garantie" value="2 ans constructeur" />
          </dl>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mt-12">
        <Reviews product={product} />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Vous pourriez aussi aimer
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b pb-2 last:border-b-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  )
}
