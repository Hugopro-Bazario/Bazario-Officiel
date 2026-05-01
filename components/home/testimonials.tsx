import Image from "next/image"
import { Quote, Star } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Camille L.",
    role: "Cliente Premium · Paris",
    avatar: "/avatar-1.jpg",
    text: "Bazario est devenu mon premier réflexe pour à peu près tout. La livraison est rapide, les avis sont fiables, et quand j'ai un souci le SAV répond en 10 min.",
    rating: 5,
    purchase: "12 commandes",
  },
  {
    name: "Marc T.",
    role: "Vendeur · Studio Nord",
    avatar: "/avatar-2.jpg",
    text: "Je vends sur Bazario depuis 14 mois. J'ai triplé mon chiffre d'affaires et je suis livré dans toute l'Europe sans m'occuper de la logistique. Le dashboard est imbattable.",
    rating: 5,
    purchase: "+ 42 000 € / mois",
  },
  {
    name: "Sofia R.",
    role: "Cliente · Lyon",
    avatar: "/avatar-3.jpg",
    text: "J'avais peur des marketplaces, mais Bazario est différent : tout est vérifié, tout est transparent. Et les prix valent le détour, surtout pendant les ventes flash.",
    rating: 5,
    purchase: "Première commande il y a 8 mois",
  },
]

export function Testimonials() {
  return (
    <section className="container py-14 lg:py-20">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Ils font confiance à Bazario
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          280 000 avis vérifiés.
          <br className="hidden sm:block" />
          <span className="text-muted-foreground">Note moyenne 4,9 / 5.</span>
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="relative flex flex-col gap-5 rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/10" aria-hidden />

            <div className="flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>

            <blockquote className="text-pretty text-sm leading-relaxed text-foreground">
              {t.text}
            </blockquote>

            <figcaption className="mt-auto flex items-center gap-3 border-t pt-4">
              <span className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="truncate text-xs text-muted-foreground">{t.role}</p>
              </div>
              <span className="shrink-0 text-[11px] font-medium text-primary">
                {t.purchase}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
