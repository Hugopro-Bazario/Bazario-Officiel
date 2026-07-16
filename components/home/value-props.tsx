import { Zap, ShieldCheck, Infinity, BotMessageSquare } from "lucide-react"

const PROPS = [
  {
    icon: Zap,
    title: "Livraison instantanée",
    desc: "Vos produits arrivent dans votre espace à la seconde du paiement.",
  },
  {
    icon: Infinity,
    title: "Mises à jour à vie",
    desc: "Vos achats évoluent avec chaque nouvelle génération d'IA.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie 14 jours",
    desc: "Satisfait ou remboursé, licences claires, créateurs vérifiés.",
  },
  {
    icon: BotMessageSquare,
    title: "Support augmenté 24/7",
    desc: "Une IA qui répond en 3 secondes, des humains pour le reste.",
  },
]

export function ValueProps() {
  return (
    <section className="border-y bg-secondary/30">
      <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-4 md:py-10">
        {PROPS.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
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
