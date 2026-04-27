import type { Metadata } from "next"
import Link from "next/link"
import { Check, X, ArrowRight, Shield, Sparkles, Heart, Zap, Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Pourquoi Bazario · Bazario vs Amazon",
  description:
    "Découvrez ce qui fait de Bazario la meilleure alternative à Amazon : vendeurs vérifiés, paiement sécurisé, 0 produit contrefait, livraison express, support humain et programme de fidélité Bazario+.",
  alternates: { canonical: "/why-bazario" },
  openGraph: { title: "Pourquoi Bazario · Bazario vs Amazon", url: "/why-bazario", type: "article" },
}

const COMPARE_ROWS = [
  { label: "Vendeurs vérifiés à 100 %", bazario: true, amazon: false, note: "Audit administratif et contrôle qualité avant publication" },
  { label: "Aucune contrefaçon (garantie écrite)", bazario: true, amazon: false, note: "Politique zéro tolérance, achats remboursés" },
  { label: "Paiement sécurisé chiffré PCI-DSS", bazario: true, amazon: true },
  { label: "Garantie meilleur prix remboursé", bazario: true, amazon: false, note: "On rembourse 110% de la différence sous 14 jours" },
  { label: "Service client humain 7j/7", bazario: true, amazon: false, note: "Réponse < 2h, jamais de chatbot bloquant" },
  { label: "Cashback réel sur chaque commande", bazario: true, amazon: false, note: "Jusqu'à 5 % crédités en Bazario Coins" },
  { label: "Livraison express 24-48h en Europe", bazario: true, amazon: true },
  { label: "Compensation carbone des livraisons", bazario: true, amazon: false, note: "Inclus pour tous les membres Bazario+" },
  { label: "Programme de fidélité avec avantages réels", bazario: true, amazon: true, note: "Bazario+ vs Amazon Prime" },
  { label: "Soldes anticipées pour les membres fidèles", bazario: true, amazon: false },
  { label: "Vendeurs locaux et marques émergentes mises en avant", bazario: true, amazon: false, note: "Curation éditoriale par notre équipe" },
  { label: "Concierge VIP gratuit", bazario: true, amazon: false, note: "Inclus dans Bazario Black" },
  { label: "Frais cachés au checkout", bazario: false, amazon: true, note: "Tous les frais sont annoncés à l'ajout au panier" },
  { label: "Publicités et résultats sponsorisés intrusifs", bazario: false, amazon: true, note: "Aucun encart pub n'apparaît sur la fiche produit" },
]

const PILLARS = [
  {
    icon: Shield,
    title: "Confiance avant tout",
    body: "Chaque vendeur est audité, identifié et noté par les acheteurs. Nous bloquons les produits suspects avant publication, pas après les plaintes.",
  },
  {
    icon: Sparkles,
    title: "Curation premium",
    body: "Nos équipes éditoriales sélectionnent les marques émergentes et les artisans. Vous achetez ce qui mérite vraiment votre attention.",
  },
  {
    icon: Heart,
    title: "Service humain",
    body: "Chaque message reçoit une réponse d'un humain en moins de 2h. Nous ne fermerons jamais votre dossier sans solution acceptée.",
  },
  {
    icon: Zap,
    title: "Le meilleur prix vraiment",
    body: "Si vous trouvez moins cher ailleurs sous 14 jours, on vous rembourse 110 % de la différence. Sans condition.",
  },
  {
    icon: Globe2,
    title: "Livraison sans frontières",
    body: "42 pays couverts, livraison express 24-48h en Europe, suivi en temps réel. Option carbone neutre incluse pour les membres Bazario+.",
  },
]

const TESTIMONIALS = [
  { name: "Camille L.", city: "Paris", text: "J'ai retrouvé sur Bazario un vendeur qui m'avait floué sur Amazon. Ici, ils ont remboursé en 24h sans poser 30 questions." },
  { name: "Maxime T.", city: "Lyon", text: "Le programme Bazario+ est honnêtement plus généreux que Prime, et l'app n'est pas envahie de pubs. Adopté." },
  { name: "Sarah B.", city: "Bordeaux", text: "Les prix sont vraiment compétitifs et le service est sans comparaison. Je commande au moins une fois par semaine." },
]

export default function WhyBazarioPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-24">
          <Badge variant="outline" className="mb-4">
            Comparatif honnête
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Pourquoi <span className="italic">Bazario</span>, et pas Amazon ?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            La marketplace qui vous protège, qui paie ses vendeurs équitablement et qui ne vous noie pas dans la pub.
            Voici les 14 différences qui comptent vraiment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/loyalty">Découvrir Bazario+</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/discover">Explorer la marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Bazario vs Amazon, point par point</h2>
        <p className="mt-2 text-sm text-muted-foreground">Mis à jour mensuellement par notre équipe.</p>
        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Critère</th>
                <th className="px-4 py-3 text-center font-display font-semibold text-foreground">Bazario</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Amazon</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <td className="px-4 py-3 align-top text-foreground">
                    {row.label}
                    {row.note && <p className="mt-0.5 text-xs text-muted-foreground">{row.note}</p>}
                  </td>
                  <td className="px-4 py-3 text-center align-top">
                    {row.bazario ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-600" aria-label="Oui" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-rose-500" aria-label="Non" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center align-top">
                    {row.amazon ? (
                      <Check className="mx-auto h-5 w-5 text-muted-foreground" aria-label="Oui" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-muted-foreground/60" aria-label="Non" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Les 5 promesses qui changent tout</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Ils ont quitté Amazon pour Bazario</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-lg border border-border bg-card p-6">
              <blockquote className="text-sm leading-relaxed text-foreground">{`"${t.text}"`}</blockquote>
              <figcaption className="mt-4 text-xs font-medium text-muted-foreground">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Essayez Bazario aujourd&apos;hui
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-background/80">
            Bénéficiez de 10 € de crédit sur votre première commande dès 49 € avec le code <span className="font-mono font-semibold">WELCOME10</span>.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/discover">
                Commencer mes achats
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10">
              <Link href="/loyalty">Découvrir Bazario+</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
