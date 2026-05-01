import { Quote } from "lucide-react"

const OUTLETS = [
  { name: "Le Monde", quote: "Le challenger européen d'Amazon", weight: "font-serif italic" },
  { name: "Les Échos", quote: "Une expérience client sans équivalent", weight: "font-serif" },
  { name: "Vogue Business", quote: "La marketplace la plus exigeante de sa génération", weight: "font-display italic" },
  { name: "Forbes", quote: "Croissance fulgurante, fondamentaux solides", weight: "font-display" },
  { name: "Wired", quote: "Le meilleur de la tech, sans le bruit", weight: "font-mono" },
  { name: "Madame Figaro", quote: "Le nouveau réflexe shopping responsable", weight: "font-serif italic" },
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
