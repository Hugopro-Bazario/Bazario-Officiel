import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react"

const PROPS = [
  {
    icon: Truck,
    title: "Livraison express",
    desc: "Gratuite dès 49 €, 24-48h en France métropolitaine.",
  },
  {
    icon: RotateCcw,
    title: "Retour 30 jours",
    desc: "Sans question. Remboursement sous 5 jours ouvrés.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie acheteur",
    desc: "Vous êtes 100% protégé en cas de litige avec un vendeur.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    desc: "Une équipe humaine, en français, par chat ou téléphone.",
  },
]

export function ValueProps() {
  return (
    <section className="relative isolate overflow-hidden border-y bg-aurora-soft">
      <div className="container relative z-10 grid grid-cols-2 gap-3 py-10 md:grid-cols-4 md:gap-4">
        {PROPS.map((p) => (
          <div
            key={p.title}
            className="holo-border group relative flex items-start gap-3 rounded-2xl bg-card/70 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary transition-transform group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--neon) / 0.18))",
                boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.15)",
              }}
            >
              <p.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-sm font-bold leading-tight">{p.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
