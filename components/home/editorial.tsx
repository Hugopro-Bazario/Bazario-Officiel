import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const STORIES = [
  {
    id: "ed-1",
    eyebrow: "Guide 2026",
    title: "Agents IA : lequel embaucher en premier ?",
    excerpt: "Vente, support, SEO ou veille : on a testé les agents stars du catalogue pour vous aider à choisir votre premier employé numérique.",
    image: "/digital/editorial-agents.svg",
    href: "/c/agents-ia",
    readTime: "6 min",
  },
  {
    id: "ed-2",
    eyebrow: "Productivité",
    title: "La stack du créateur augmenté en 2026",
    excerpt: "10 outils digitaux qui remplacent une équipe entière : notre sélection testée, comparée et chiffrée.",
    image: "/digital/editorial-stack.svg",
    href: "/c/saas",
    readTime: "5 min",
  },
  {
    id: "ed-3",
    eyebrow: "Business",
    title: "Revenus passifs : vendre ses produits digitaux",
    excerpt: "Prompts, templates, musique IA : comment nos meilleurs créateurs génèrent +10 000 € par mois sur Bazario.",
    image: "/digital/editorial-revenus.svg",
    href: "/sell",
    readTime: "7 min",
  },
]

export function Editorial() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Le Journal Bazario
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Inspirez-vous, décidez mieux
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Guides d&apos;achat, tendances et coulisses de nos vendeurs. Tout est testé, comparé, vérifié.
          </p>
        </div>
        <Link
          href="/journal"
          className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
        >
          Tous les articles
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {STORIES.map((story, i) => (
          <Link
            key={story.id}
            href={story.href}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-xl ${
              i === 0 ? "md:col-span-1" : ""
            }`}
          >
            <div className="relative aspect-[5/4] overflow-hidden bg-secondary">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-sm">
                {story.eyebrow}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold leading-tight text-balance">
                {story.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {story.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                <span>Lecture · {story.readTime}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                  Lire l&apos;article
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
