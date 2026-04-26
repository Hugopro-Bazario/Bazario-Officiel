import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Star,
  ShieldCheck,
  MapPin,
  MessageCircle,
  BadgeCheck,
  Clock,
  Truck,
  Globe,
  Sparkles,
  Award,
  Calendar,
  Users,
  Heart,
} from "lucide-react"
import {
  SELLERS,
  SELLER_PROFILES,
  baseReviews,
  getSellerBySlug,
  getSellerProductsBySlug,
} from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product/product-card"

export function generateStaticParams() {
  return SELLERS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const seller = getSellerBySlug(slug)
  const profile = SELLER_PROFILES[slug]
  if (!seller || !profile) return {}
  return {
    title: `${seller.name} — ${profile.tagline}`,
    description: profile.story.slice(0, 158),
    alternates: { canonical: `/s/${seller.slug}` },
    openGraph: {
      title: seller.name,
      description: profile.tagline,
      images: [{ url: profile.cover, width: 1600, height: 900, alt: seller.name }],
      url: `/s/${seller.slug}`,
      type: "website",
    },
  }
}

export default async function SellerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const seller = getSellerBySlug(slug)
  const profile = SELLER_PROFILES[slug]
  if (!seller || !profile) notFound()

  const sellerProducts = getSellerProductsBySlug(slug)
  const reviewsForSeller = baseReviews.slice(0, 6)

  // JSON-LD Organization
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seller.name,
    url: `https://bazario.com/s/${seller.slug}`,
    logo: `https://bazario.com${seller.logo}`,
    image: `https://bazario.com${profile.cover}`,
    foundingDate: String(profile.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressCountry: seller.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: seller.rating.toFixed(1),
      reviewCount: seller.reviewCount,
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden bg-secondary md:h-80">
        <Image
          src={profile.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container -mt-20 md:-mt-24">
        {/* Identity card */}
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border-4 border-background bg-muted shadow-lg md:size-28">
                <Image
                  src={seller.logo}
                  alt={`${seller.name} logo`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold leading-none md:text-3xl">{seller.name}</h1>
                  {seller.verified && (
                    <Badge variant="secondary" className="gap-1">
                      <BadgeCheck className="size-3" />
                      Vérifié
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground md:text-base">{profile.tagline}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {profile.city}, {seller.country}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    Depuis {profile.founded}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-3.5" />
                    {profile.followers.toLocaleString("fr-FR")} abonnés
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button asChild size="lg">
                <Link href="/account/messages">
                  <MessageCircle className="mr-1.5 size-4" />
                  Contacter
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-1.5 size-4" />
                Suivre la boutique
              </Button>
            </div>
          </div>

          <Separator />

          {/* Stats strip */}
          <div className="grid grid-cols-2 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
            <Stat
              icon={Star}
              value={seller.rating.toFixed(1)}
              label={`${seller.reviewCount.toLocaleString("fr-FR")} avis`}
              accent
            />
            <Stat
              icon={Award}
              value={seller.productCount.toString()}
              label="Produits"
            />
            <Stat
              icon={Clock}
              value={profile.responseTime}
              label="Temps de réponse"
            />
            <Stat
              icon={Truck}
              value={profile.shippingTime}
              label="Délai d'expédition"
            />
          </div>
        </Card>

        {/* Body */}
        <div className="my-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {/* Story */}
            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Notre histoire
              </p>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Ce qui nous fait vibrer
              </h2>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                {profile.story}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.specialties.map((sp) => (
                  <Badge key={sp} variant="outline" className="bg-background">
                    <Sparkles className="mr-1 size-3 text-accent" />
                    {sp}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Products */}
            <section className="space-y-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Boutique
                  </p>
                  <h2 className="font-display text-2xl font-bold">
                    Tous les produits ({sellerProducts.length})
                  </h2>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/search?q=${encodeURIComponent(seller.name)}`}>
                    Filtres avancés
                  </Link>
                </Button>
              </div>

              {sellerProducts.length === 0 ? (
                <Card className="p-10 text-center text-sm text-muted-foreground">
                  Ce vendeur n&apos;a pas encore de produit en ligne.
                </Card>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {sellerProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </section>

            {/* Reviews */}
            <section className="space-y-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Avis vérifiés
                  </p>
                  <h2 className="font-display text-2xl font-bold">
                    Ce que disent les acheteurs
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Star className="size-4 fill-accent text-accent" />
                  <span className="font-bold">{seller.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    sur {seller.reviewCount.toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {reviewsForSeller.map((review) => (
                  <Card key={review.id} className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 overflow-hidden rounded-full bg-muted">
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.author}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{review.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < review.rating
                                ? "size-3.5 fill-accent text-accent"
                                : "size-3.5 fill-muted text-muted"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 font-semibold">{review.title}</p>
                    <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                      {review.body}
                    </p>
                    {review.verified && (
                      <p className="mt-3 inline-flex items-center gap-1 text-xs text-success">
                        <ShieldCheck className="size-3" />
                        Achat vérifié
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="p-5">
              <h3 className="text-sm font-semibold">Politiques boutique</h3>
              <ul className="mt-3 space-y-3 text-sm">
                {profile.policies.map((p) => (
                  <li key={p.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {p.label}
                    </p>
                    <p className="mt-0.5 text-foreground">{p.value}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold">Certifications</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.certifications.map((c) => (
                  <li key={c}>
                    <Badge variant="outline" className="gap-1 bg-background">
                      <BadgeCheck className="size-3 text-primary" />
                      {c}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold">Langues parlées</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <li
                    key={l}
                    className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"
                  >
                    <Globe className="size-3" />
                    {l}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-primary/20 bg-primary/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Bazario Vérifié
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ce vendeur a passé notre KYC, sa boutique est notée
                <span className="font-semibold text-foreground"> {seller.rating.toFixed(1)}/5</span>
                {" "}sur la durée et toutes les transactions sont protégées par la garantie Bazario.
              </p>
              <Button variant="ghost" size="sm" className="mt-3 -ml-2 text-primary" asChild>
                <Link href="/help">En savoir plus</Link>
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: React.ElementType
  value: string
  label: string
  accent?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4">
      <div className="inline-flex items-center gap-1.5">
        <Icon className={accent ? "size-4 fill-accent text-accent" : "size-4 text-muted-foreground"} />
        <span className="font-display text-xl font-bold">{value}</span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
