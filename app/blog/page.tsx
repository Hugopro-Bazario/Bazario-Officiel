import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog Bazario — Guides d'achat, conseils & tendances",
  description:
    "Guides d'achat, conseils d'experts et tendances : découvrez les articles Bazario pour acheter mieux, plus durable, et faire les bons choix.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog Bazario — Guides d'achat, conseils & tendances",
    description: "Guides d'achat, conseils d'experts et tendances Bazario.",
    type: "website",
    url: "/blog",
  },
}

const CATEGORY_LABEL: Record<string, string> = {
  guides: "Guides d'achat",
  comparatifs: "Comparatifs",
  entretien: "Entretien",
  tendances: "Tendances",
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [hero, ...rest] = posts

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Le journal Bazario
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              Acheter mieux, durer plus longtemps
            </h1>
            <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Guides, comparatifs et conseils d'experts pour faire les bons choix.
              Rédigés par notre équipe et nos vendeurs partenaires partout en Europe.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 md:py-14">
        {/* Hero post */}
        {hero && (
          <Link
            href={`/blog/${hero.slug}`}
            className="group mb-12 grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border bg-card md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src={hero.cover || "/placeholder.svg"}
                alt={hero.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {CATEGORY_LABEL[hero.category]}
              </span>
              <h2 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                {hero.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{hero.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{hero.author.name}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {hero.readingMinutes} min de lecture
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                Lire l'article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <>
            <h2 className="mb-6 font-display text-xl font-semibold tracking-tight md:text-2xl">
              Tous les articles
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:border-foreground/20"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={post.cover || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {CATEGORY_LABEL[post.category]}
                    </span>
                    <h3 className="font-display text-lg font-bold leading-snug tracking-tight">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                      <span>{post.author.name}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {post.readingMinutes} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
