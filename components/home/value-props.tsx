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
    <section className="border-y bg-secondary/30">
      <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-4 md:py-10">
        {PROPS.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
