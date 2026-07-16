const BRANDS = [
  "NeuraForge",
  "PromptCraft",
  "Quantum",
  "Aether",
  "Nova",
  "Synthrise",
  "Vectorium",
  "Lumina AI",
  "Hexalab",
  "Orbital",
  "Datafall",
  "Nocturne",
]

export function BrandMarquee() {
  return (
    <section className="border-y bg-background py-8">
      <div className="container">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Plus de 8 000 studios et créateurs digitaux nous font confiance
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex shrink-0 animate-marquee-slow items-center gap-12 px-6">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-2xl font-bold tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
