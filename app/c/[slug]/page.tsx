import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  TrendingUp,
  Leaf,
  Star,
  ArrowRight,
  Tag,
  PackageCheck,
  HeartHandshake,
} from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CATEGORIES, getProductsByCategory, sellers } from "@/lib/data"

type Params = { slug: string }

const SUB_CATEGORIES: Record<string, { label: string; href: string }[]> = {
  mode: [
    { label: "Vêtements", href: "/search?c=mode&q=vetements" },
    { label: "Chaussures", href: "/search?c=mode&q=chaussures" },
    { label: "Sacs & maroquinerie", href: "/search?c=mode&q=sac" },
    { label: "Accessoires", href: "/search?c=mode&q=accessoires" },
    { label: "Bijoux", href: "/search?c=mode&q=bijoux" },
    { label: "Lunettes", href: "/search?c=mode&q=lunettes" },
  ],
  tech: [
    { label: "Audio", href: "/search?c=tech&q=audio" },
    { label: "Smartphones", href: "/search?c=tech&q=smartphone" },
    { label: "Ordinateurs", href: "/search?c=tech&q=ordinateur" },
    { label: "Photo & vidéo", href: "/search?c=tech&q=photo" },
    { label: "Maison connectée", href: "/search?c=tech&q=connecte" },
    { label: "Accessoires", href: "/search?c=tech&q=accessoires" },
  ],
  maison: [
    { label: "Mobilier", href: "/search?c=maison&q=mobilier" },
    { label: "Décoration", href: "/search?c=maison&q=deco" },
    { label: "Luminaires", href: "/search?c=maison&q=luminaire" },
    { label: "Cuisine", href: "/search?c=maison&q=cuisine" },
    { label: "Linge de maison", href: "/search?c=maison&q=linge" },
    { label: "Jardin", href: "/search?c=maison&q=jardin" },
  ],
  beaute: [
    { label: "Soins visage", href: "/search?c=beaute&q=visage" },
    { label: "Maquillage", href: "/search?c=beaute&q=maquillage" },
    { label: "Cheveux", href: "/search?c=beaute&q=cheveux" },
    { label: "Parfums", href: "/search?c=beaute&q=parfum" },
    { label: "Bain & douche", href: "/search?c=beaute&q=douche" },
    { label: "Bio & naturel", href: "/search?c=beaute&q=bio" },
  ],
}

const TRUST_STRIP = [
  { icon: Truck, label: "Livraison gratuite dès 49 €" },
  { icon: PackageCheck, label: "Retours gratuits 30 jours" },
  { icon: ShieldCheck, label: "Vendeurs vérifiés" },
  { icon: HeartHandshake, label: "Support 7j/7" },
]

const GUIDES_BY_CATEGORY: Record<string, { title: string; tip: string; icon: React.ElementType }[]> = {
  mode: [
    {
      icon: Award,
      title: "Reconnaître la qualité",
      tip: "Coutures invisibles, finitions main, fournisseurs européens : les marqueurs essentiels.",
    },
    {
      icon: Leaf,
      title: "Mode responsable",
      tip: "Privilégiez les matières certifiées GOTS, OEKO-TEX et les vendeurs Made in Europe.",
    },
    {
      icon: Tag,
      title: "Bien tailler",
      tip: "Notre guide des tailles internationales évite 92 % des retours pour mauvaise taille.",
    },
  ],
  tech: [
    {
      icon: Award,
      title: "Garanties officielles",
      tip: "Tous nos vendeurs tech proposent une garantie constructeur + 1 an Bazario.",
    },
    {
      icon: ShieldCheck,
      title: "Authentification",
      tip: "Numéros de série vérifiés, contrefaçon impossible : la sérénité avant tout.",
    },
    {
      icon: TrendingUp,
      title: "Reconditionné premium",
      tip: "Découvrez le grade A+ : aussi performant que le neuf, jusqu'à 35 % moins cher.",
    },
  ],
  maison: [
    {
      icon: Sparkles,
      title: "Style & cohérence",
      tip: "Nos curateurs sélectionnent les pièces qui s'accordent entre elles, pour un intérieur harmonieux.",
    },
    {
      icon: Leaf,
      title: "Bois & matériaux nobles",
      tip: "Chêne massif, lin lavé, céramique artisanale : la durabilité avant la mode.",
    },
    {
      icon: Truck,
      title: "Livraison étage gratuite",
      tip: "Pour les meubles +30 kg, livraison et installation incluses dans toute la France.",
    },
  ],
}

function getGuides(slug: string) {
  return (
    GUIDES_BY_CATEGORY[slug] ?? [
      {
        icon: Award,
        title: "Sélection rigoureuse",
        tip: "Chaque produit est vérifié par notre équipe avant mise en ligne.",
      },
      {
        icon: ShieldCheck,
        title: "Achetez en confiance",
        tip: "Garantie satisfait ou remboursé pendant 30 jours, sans condition.",
      },
      {
        icon: Leaf,
        title: "Made in Europe",
        tip: "Plus de 60 % de nos vendeurs sont basés en Europe pour une logistique courte.",
      },
    ]
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) return {}
  return {
    title: `${category.name} — ${category.productCount.toLocaleString("fr-FR")} produits sélectionnés`,
    description: `Découvrez ${category.productCount.toLocaleString(
      "fr-FR",
    )} produits ${category.name.toLowerCase()} sur Bazario. Vendeurs vérifiés, livraison gratuite dès 49 €, retours sous 30 jours.`,
    alternates: { canonical: `/c/${category.slug}` },
    openGraph: {
      title: `${category.name} — Bazario`,
      images: [{ url: category.image, width: 1200, height: 630 }],
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) notFound()

  const products = getProductsByCategory(slug)
  const featured = products
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
  const otherCategories = CATEGORIES.filter((c) => c.slug !== slug).slice(0, 4)

  // Top brands = top sellers ranked by rating, distinct
  const sellerIds = new Set<string>()
  for (const p of products) sellerIds.add(p.seller.id)
  const topBrands = sellers
    .filter((s) => sellerIds.has(s.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  const subs = SUB_CATEGORIES[slug] ?? []
  const guides = getGuides(slug)

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={category.image || "/placeholder.svg"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/30" />
        </div>

        <div className="container relative py-16 text-background md:py-24">
          <nav className="mb-4 text-xs text-background/80" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-1">
              <li>
                <Link href="/" className="hover:text-background">
                  Accueil
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3" />
              </li>
              <li className="font-medium text-background">{category.name}</li>
            </ol>
          </nav>

          <Badge
            variant="outline"
            className="mb-4 border-background/30 bg-background/10 text-background"
          >
            <Sparkles className="mr-1 size-3" /> Catégorie phare Bazario
          </Badge>
          <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight md:text-6xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-background/85 md:text-lg">
            {category.productCount.toLocaleString("fr-FR")} produits sélectionnés par notre équipe
            de curateurs, vendus par {topBrands.length || sellerIds.size} marchands vérifiés à
            travers le monde.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/search?c=${slug}&sort=popular`}>
                <TrendingUp className="size-4" />
                Voir les bestsellers
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-background/30 bg-background/10 text-background hover:bg-background hover:text-foreground"
            >
              <Link href={`/search?c=${slug}`}>
                Tous les filtres
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {TRUST_STRIP.map((t) => {
              const Icon = t.icon
              return (
                <div
                  key={t.label}
                  className="flex items-center gap-2 rounded-xl border border-background/15 bg-background/10 px-3 py-2.5 text-xs font-medium backdrop-blur"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{t.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sub-categories */}
      {subs.length > 0 && (
        <section className="border-b border-border bg-secondary/30">
          <div className="container py-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Univers
              </span>
              <div className="h-4 w-px shrink-0 bg-border" />
              {subs.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="shrink-0 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container py-12 md:py-16">
        {/* Featured */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Star className="size-3.5 fill-accent" />
                  Coups de cœur de l&apos;équipe
                </p>
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                  Le meilleur de {category.name.toLowerCase()}
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm" className="hidden gap-1 md:inline-flex">
                <Link href={`/search?c=${slug}&sort=rating`}>
                  Tout voir
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Top brands */}
        {topBrands.length > 0 && (
          <section className="mb-16">
            <div className="mb-6">
              <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Award className="size-3.5" />
                Marques phares
              </p>
              <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                Vendeurs vérifiés en {category.name.toLowerCase()}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {topBrands.map((b) => (
                <Link
                  key={b.id}
                  href={`/seller/${b.slug}`}
                  className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 font-serif text-base font-semibold text-primary">
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <p className="line-clamp-1 text-sm font-semibold group-hover:text-primary">
                      {b.name}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-0.5 text-[11px] text-muted-foreground">
                      <Star className="size-2.5 fill-accent text-accent" />
                      {b.rating.toFixed(1)} · {b.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Buying guide */}
        <section className="mb-16">
          <div className="mb-6">
            <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-success">
              <Sparkles className="size-3.5" />
              Le guide Bazario
            </p>
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              Bien acheter en {category.name.toLowerCase()}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map((g) => {
              const Icon = g.icon
              return (
                <Card key={g.title} className="group p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 font-serif text-lg font-semibold">{g.title}</h3>
                  <p className="text-sm text-muted-foreground">{g.tip}</p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* All products */}
        <section>
          <Separator className="mb-8" />
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Catalogue complet
              </p>
              <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                Tous les produits {category.name.toLowerCase()}
              </h2>
            </div>
            <Button asChild variant="outline" size="sm" className="gap-1 bg-transparent">
              <Link href={`/search?c=${slug}`}>
                Filtrer
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          {products.length === 0 ? (
            <Card className="flex flex-col items-center gap-4 px-6 py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
                <Tag className="size-7 text-muted-foreground" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold">
                  Aucun produit pour le moment
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Notre équipe enrichit cette catégorie chaque semaine. Revenez bientôt.
                </p>
              </div>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/discover">Explorer Bazario</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* Other categories */}
        {otherCategories.length > 0 && (
          <section className="mt-16">
            <Separator className="mb-8" />
            <h2 className="mb-6 font-serif text-2xl font-semibold md:text-3xl">
              Continuer à explorer
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {otherCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/c/${c.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={c.image || "/placeholder.svg"}
                    alt={c.name}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-serif text-lg font-semibold text-background">{c.name}</p>
                    <p className="text-[11px] text-background/80">
                      {c.productCount.toLocaleString("fr-FR")} produits
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
