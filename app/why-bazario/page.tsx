import type { Metadata } from "next"
import Link from "next/link"
import { Check, X, ArrowRight, Shield, Sparkles, Heart, Zap, Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Pourquoi Bazario · La marketplace digitale de confiance",
  description:
    "Ce qui distingue Bazario des autres plateformes de produits digitaux : créateurs vérifiés, licences claires, livraison instantanée, mises à jour à vie, garantie 14 jours et abonnement Nexus+.",
  alternates: { canonical: "/why-bazario" },
  openGraph: { title: "Pourquoi Bazario · La marketplace digitale de confiance", url: "/why-bazario", type: "article" },
}

const COMPARE_ROWS = [
  { label: "Créateurs vérifiés à 100 %", bazario: true, amazon: false, note: "Contrôle qualité et identité avant publication" },
  { label: "Licences claires (perso / commerciale / agence)", bazario: true, amazon: false, note: "Les droits d'usage sont précisés sur chaque produit" },
  { label: "Paiement sécurisé chiffré (Stripe, 3D Secure)", bazario: true, amazon: true },
  { label: "Garantie 14 jours satisfait ou remboursé", bazario: true, amazon: false, note: "Remboursement si le produit ne correspond pas à sa description" },
  { label: "Support augmenté par IA 24/7", bazario: true, amazon: false, note: "Réponse en quelques secondes, escalade humaine si besoin" },
  { label: "Crédits IA inclus avec l'abonnement", bazario: true, amazon: false, note: "Images, voix et textes générés inclus dans Nexus+" },
  { label: "Livraison instantanée des produits", bazario: true, amazon: true },
  { label: "Mises à jour à vie incluses", bazario: true, amazon: false, note: "Vos achats évoluent à chaque nouvelle version" },
  { label: "Coffre-fort de licences à vie", bazario: true, amazon: false, note: "Tous vos achats réunis et sécurisés au même endroit" },
  { label: "Accès anticipé aux drops pour les membres", bazario: true, amazon: false },
  { label: "Créateurs émergents et studios indés mis en avant", bazario: true, amazon: false, note: "Curation éditoriale par notre équipe" },
  { label: "Filigrane et traçabilité des fichiers", bazario: true, amazon: false, note: "Protection des créateurs contre la fraude" },
  { label: "Frais cachés au checkout", bazario: false, amazon: true, note: "Tous les frais sont annoncés avant le paiement" },
  { label: "Publicités et résultats sponsorisés intrusifs", bazario: false, amazon: true, note: "Aucun encart pub sur la fiche produit" },
]

const PILLARS = [
  {
    icon: Shield,
    title: "Confiance avant tout",
    body: "Chaque créateur est vérifié et noté par les acheteurs. Nous contrôlons les produits avant publication, et les licences sont toujours explicites.",
  },
  {
    icon: Sparkles,
    title: "Curation premium",
    body: "Nos équipes sélectionnent les studios et créateurs qui font vraiment la différence. Vous achetez ce qui mérite votre attention.",
  },
  {
    icon: Heart,
    title: "Support augmenté",
    body: "Une IA répond en quelques secondes, des humains prennent le relais sur les cas complexes. Aucun dossier fermé sans solution.",
  },
  {
    icon: Zap,
    title: "Livraison instantanée",
    body: "Vos produits sont disponibles à la seconde du paiement, dans votre espace et par email, avec les mises à jour à vie incluses.",
  },
  {
    icon: Globe2,
    title: "Sans frontières, sans logistique",
    body: "100 % numérique : pas de stock, pas de frais de port, pas de douane. Vos achats vous suivent partout, sur tous vos appareils.",
  },
]

const TESTIMONIALS = [
  { name: "Camille L.", city: "Paris", text: "J'ai « embauché » l'agent Orion pour ma boutique : il qualifie mes leads la nuit. Rentabilisé en une semaine." },
  { name: "Maxime T.", city: "Lyon", text: "Les licences sont enfin claires et tout est livré instantanément dans mon coffre-fort. Nexus+ vaut largement son prix." },
  { name: "Sarah B.", city: "Bordeaux", text: "Je vends mes packs de prompts ici depuis 6 mois : zéro logistique, paiement J+2. Devenu mon revenu principal." },
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
            La marketplace digitale qui protège acheteurs et créateurs, avec des licences claires et zéro friction.
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
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Bazario vs les autres plateformes, point par point</h2>
        <p className="mt-2 text-sm text-muted-foreground">Mis à jour mensuellement par notre équipe.</p>
        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Critère</th>
                <th className="px-4 py-3 text-center font-display font-semibold text-foreground">Bazario</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Ailleurs</th>
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
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Ils ont adopté Bazario</h2>
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
            Bénéficiez de 10 € de crédit sur votre première commande avec le code <span className="font-mono font-semibold">WELCOME10</span>.
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
