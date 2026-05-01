import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, Clock, Bookmark, ArrowRight, Compass, TrendingUp, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { products, formatPrice } from "@/lib/data"

export const metadata: Metadata = {
  title: "Découvrir — Le Journal Bazario",
  description:
    "Inspirations, guides et coups de cœur sélectionnés par notre équipe : mode, maison, tech, beauté. Trouvez ce que vous cherchez et ce que vous ne cherchiez pas encore.",
  alternates: { canonical: "/discover" },
}

const STORIES = [
  {
    image: "/story-1.jpg",
    category: "Home Office",
    title: "Le bureau parfait en 8 essentiels",
    excerpt: "Du fauteuil ergonomique au luminaire d'appoint, on a sélectionné le kit qui transforme votre coin de table en quartier général.",
    duration: "6 min",
  },
  {
    image: "/story-2.jpg",
    category: "Garde-robe",
    title: "Capsule printemps : 12 pièces, 60 looks",
    excerpt: "La méthode capsule wardrobe revisitée par notre styliste maison, avec sourcing 100 % marketplace Bazario.",
    duration: "8 min",
  },
  {
    image: "/story-3.jpg",
    category: "Café & Tea",
    title: "L'art du pour-over à la maison",
    excerpt: "Bouilloire à col de cygne, V60, balance bluetooth : ce que les baristas pros ont vraiment chez eux.",
    duration: "5 min",
  },
  {
    image: "/story-4.jpg",
    category: "Outdoor",
    title: "Le grand retour du vélo électrique",
    excerpt: "On a testé 6 modèles e-bike entre 1 500 € et 3 500 € — voici le verdict.",
    duration: "11 min",
  },
  {
    image: "/story-5.jpg",
    category: "Beauté",
    title: "Routine éclat : 5 étapes, 5 minutes",
    excerpt: "Une routine express validée par les dermatologues partenaires de Bazario.",
    duration: "4 min",
  },
  {
    image: "/story-6.jpg",
    category: "Famille",
    title: "Chambre d'enfant : nos coups de cœur",
    excerpt: "Du lit en bois massif aux veilleuses sensorielles, le shopping list ultra-pratique.",
    duration: "7 min",
  },
]

const COLLECTIONS = [
  { title: "Made in Europe", count: 248, color: "bg-primary" },
  { title: "Moins de 50 €", count: 1820, color: "bg-accent" },
  { title: "Notes 4.8★+", count: 612, color: "bg-success" },
  { title: "Édition limitée", count: 47, color: "bg-foreground" },
]

export default function DiscoverPage() {
  const featured = STORIES[0]
  const rest = STORIES.slice(1)
  const picks = products.slice(0, 4)

  return (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-muted/40 to-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Compass className="size-3.5" />
            Découvrir
          </div>
          <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Le journal Bazario : inspirations, guides & sélections curatées.
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
            Chaque semaine, notre équipe édito vous emmène derrière les coulisses des marques, teste les produits qui comptent et compose des univers shopping prêts à l&apos;emploi.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Featured story */}
        <section>
          <Link href="#" className="group grid gap-6 overflow-hidden rounded-2xl border bg-card lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles className="size-3 text-accent" />À la une
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <Badge variant="outline" className="w-fit text-xs">
                {featured.category}
              </Badge>
              <h2 className="mt-3 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {featured.duration}
                </span>
                <span>·</span>
                <span>Par l&apos;équipe Bazario</span>
              </div>
              <div className="mt-6">
                <Button>
                  Lire le guide
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Link>
        </section>

        {/* Collections strip */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-accent">Collections</p>
              <h2 className="mt-1 font-display text-2xl font-bold">Univers à explorer</h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.title}
                href="/search"
                className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className={`absolute -right-6 -top-6 size-24 rounded-full ${c.color} opacity-15 transition-transform group-hover:scale-125`} />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Collection</p>
                <p className="mt-2 text-lg font-bold">{c.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {c.count.toLocaleString("fr-FR")} produits
                </p>
                <ArrowRight className="mt-4 size-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        {/* Stories grid */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-accent">Le Journal</p>
              <h2 className="mt-1 font-display text-2xl font-bold">Tous les articles</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#">
                Voir tout
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <Link key={s.title} href="#" className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    aria-label="Sauvegarder"
                    className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/85 backdrop-blur transition-colors hover:bg-background"
                  >
                    <Bookmark className="size-4" />
                  </button>
                </div>
                <div className="p-5">
                  <Badge variant="outline" className="text-[10px]">
                    {s.category}
                  </Badge>
                  <h3 className="mt-2 line-clamp-2 text-balance text-lg font-bold leading-tight">{s.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.excerpt}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {s.duration}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="size-3" />
                      Lu par 2.4k
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Editor's picks */}
        <section className="rounded-2xl border bg-muted/30 p-6 sm:p-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-accent">
                <TrendingUp className="size-3" />
                Coups de cœur
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">La sélection de la rédaction</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {picks.map((p) => (
              <Link
                key={p.id}
                href={`/p/${p.slug}`}
                className="group overflow-hidden rounded-xl bg-card border transition-all hover:shadow-md"
              >
                <div className="relative aspect-square">
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-medium">{p.title}</p>
                  <p className="mt-1 text-sm font-bold">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
