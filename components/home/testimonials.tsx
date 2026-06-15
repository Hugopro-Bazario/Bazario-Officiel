import Image from "next/image"
import { Quote, Star } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Camille L.",
    role: "Fondatrice e-commerce · Paris",
    avatar: "/avatar-1.jpg",
    text: "J'ai « embauché » l'agent Orion pour ma boutique : il qualifie mes leads la nuit et relance mes devis tout seul. Mis en place en une après-midi, rentabilisé en une semaine.",
    rating: 5,
    purchase: "14 produits digitaux",
  },
  {
    name: "Marc T.",
    role: "Créateur · Synthrise Studio",
    avatar: "/avatar-2.jpg",
    text: "Je vends mes packs audio IA sur Bazario depuis 9 mois. Zéro logistique, paiement J+2, et le dashboard créateur me dit exactement quoi produire ensuite. J'ai quitté mon CDI.",
    rating: 5,
    purchase: "+ 18 000 € / mois",
  },
  {
    name: "Sofia R.",
    role: "Freelance design · Lyon",
    avatar: "/avatar-3.jpg",
    text: "Les licences sont enfin claires : je sais exactement ce que j'ai le droit d'utiliser pour mes clients. Et tout est livré instantanément dans mon coffre-fort, avec les mises à jour.",
    rating: 5,
    purchase: "Membre Nexus+ depuis 6 mois",
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
