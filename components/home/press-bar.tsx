import { Quote } from "lucide-react"

const OUTLETS = [
  { name: "Le Monde", quote: "La place de marché qui démocratise l'IA", weight: "font-serif italic" },
  { name: "Les Échos", quote: "Le App Store français des produits digitaux", weight: "font-serif" },
  { name: "TechCrunch", quote: "Le marketplace IA le plus complet d'Europe", weight: "font-display italic" },
  { name: "Forbes", quote: "Croissance fulgurante, fondamentaux solides", weight: "font-display" },
  { name: "Wired", quote: "Le futur du commerce est déjà ici", weight: "font-mono" },
  { name: "Usine Digitale", quote: "La référence des créateurs augmentés", weight: "font-serif italic" },
]

export function PressBar() {
  return (
    <section className="border-y bg-secondary/30">
      <div className="container py-10 md:py-14">
        <div className="mb-8 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-10 bg-border" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ils parlent de Bazario
          </p>
          <span className="h-px w-10 bg-border" aria-hidden="true" />
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
          {OUTLETS.map((o) => (
            <li key={o.name} className="flex flex-col items-center text-center">
              <span className={`text-base font-semibold tracking-tight md:text-lg ${o.weight}`}>
                {o.name}
              </span>
              <p className="mt-2 max-w-[18ch] text-balance text-[11px] leading-snug text-muted-foreground md:text-xs">
                <Quote className="mr-1 inline size-3 -rotate-180 align-text-top text-primary/60" aria-hidden="true" />
                {o.quote}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
