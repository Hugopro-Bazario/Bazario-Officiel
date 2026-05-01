import type { Metadata } from "next"
import Link from "next/link"
import {
  Sparkles,
  Coins,
  Gift,
  Truck,
  Crown,
  Clock,
  TreePine,
  Headphones,
  Tag,
  ArrowRight,
  Check,
} from "lucide-react"

const SITE_URL = "https://www.bazario-official.com"

export const metadata: Metadata = {
  title: "Bazario+ — programme de fidélité premium | Bazario",
  description:
    "Rejoignez Bazario+ : 5 % de cashback sur chaque commande, livraison express gratuite, accès anticipé aux soldes et concierge dédié. Sans engagement, à partir de 4,99 € / mois.",
  alternates: { canonical: `${SITE_URL}/loyalty` },
  openGraph: {
    title: "Bazario+ — récompensez chaque achat",
    description:
      "Cashback 5 %, livraison express gratuite, accès soldes anticipé, support prioritaire et plus encore.",
    url: `${SITE_URL}/loyalty`,
    type: "website",
  },
}

const TIERS = [
  {
    name: "Curieux",
    monthly: "Gratuit",
    yearly: "Gratuit",
    description: "Crée un compte et profite déjà des essentiels.",
    icon: Sparkles,
    perks: [
      "1 % de cashback en bons d'achat",
      "Suivi de commande temps réel",
      "Retour gratuit sous 30 jours",
      "Newsletter membre & deals quotidiens",
    ],
    accent: "from-secondary to-secondary",
    highlight: false,
  },
  {
    name: "Bazario+",
    monthly: "4,99 € / mois",
    yearly: "49 € / an (économise 11 €)",
    description: "Notre programme premium pour les acheteurs réguliers.",
    icon: Crown,
    perks: [
      "5 % de cashback Bazario sur chaque commande",
      "Livraison express gratuite illimitée (24-48 h)",
      "Accès aux soldes 24 h en avance",
      "Concierge shopping 7j/7 par chat",
      "Garantie casse 90 jours offerte",
      "1 cadeau d'anniversaire chaque année",
    ],
    accent: "from-foreground/95 to-foreground",
    highlight: true,
  },
  {
    name: "Bazario Black",
    monthly: "Sur invitation",
    yearly: "199 € / an",
    description: "Pour les clients VIP et collectionneurs.",
    icon: Tag,
    perks: [
      "8 % de cashback + remboursement différence prix",
      "Personal shopper dédié et ventes privées",
      "Livraison nuit & créneau d'1 h, gratuit",
      "Préemption sur les éditions limitées",
      "Invitations événements Bazario IRL",
    ],
    accent: "from-secondary to-secondary",
    highlight: false,
  },
]

const PILLARS = [
  {
    icon: Coins,
    title: "Cashback réel, pas des points",
    description:
      "Chaque euro dépensé devient un crédit Bazario directement utilisable au prochain panier. Pas d'échelle de points obscure, pas de date d'expiration cachée.",
  },
  {
    icon: Truck,
    title: "Livraison express illimitée",
    description:
      "24 à 48 h en France métropolitaine, 3 à 6 jours dans toute l'Union européenne. Suivi GPS et garantie créneau respecté ou commande remboursée.",
  },
  {
    icon: Clock,
    title: "Accès soldes en avance",
    description:
      "Les flash sales, French Days et Black Friday s'ouvrent 24 h avant tout le monde pour les membres Bazario+. Vous voyez les meilleurs prix avant la rupture.",
  },
  {
    icon: Gift,
    title: "Récompenses au-delà du prix",
    description:
      "Cadeau d'anniversaire, échantillons exclusifs, masterclasses live avec nos artisans : Bazario+ rapproche les marques et les clients qui les portent.",
  },
  {
    icon: TreePine,
    title: "Impact compensé pour vous",
    description:
      "Chaque commande Bazario+ inclut la compensation carbone certifiée Gold Standard. Aucune option à cocher, c'est inclus dans votre abonnement.",
  },
  {
    icon: Headphones,
    title: "Concierge prioritaire",
    description:
      "Une équipe humaine basée à Lyon, joignable 7j/7 par chat ou téléphone. Délai moyen de réponse inférieur à 90 secondes.",
  },
]

const FAQ = [
  {
    q: "Puis-je me désabonner à tout moment ?",
    a: "Oui. L'abonnement Bazario+ se résilie en un clic depuis votre espace membre, sans frais ni engagement. Vous conservez vos avantages jusqu'à la fin du mois ou de l'année déjà payée.",
  },
  {
    q: "Le cashback fonctionne aussi sur les soldes ?",
    a: "Oui. Le cashback Bazario+ s'applique sur le prix payé, soldes incluses. Il est cumulable avec les codes promo et apparaît sur votre compte sous 24 h après réception.",
  },
  {
    q: "La livraison express est-elle vraiment illimitée ?",
    a: "Oui, sur tous les produits expédiés depuis nos hubs européens (Paris, Milan, Berlin, Madrid, Lisbonne). Pour les produits envoyés directement depuis le Japon, les États-Unis ou le Canada, vous bénéficiez d'une livraison prioritaire à -50 %.",
  },
  {
    q: "Que se passe-t-il si je dépasse 5 % de cashback en bons d'achat ?",
    a: "Aucun plafond. Tout euro de cashback non utilisé reste créditer sur votre compte 24 mois et peut financer 100 % d'une commande, frais de port inclus.",
  },
  {
    q: "Comment fonctionne la garantie casse 90 jours ?",
    a: "Si un produit éligible Bazario+ est endommagé pendant les 90 jours suivant la livraison, nous le remplaçons ou le remboursons en 48 h, sans expertise technique préalable.",
  },
]

export default function LoyaltyPage() {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="container relative grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground">
              <Crown className="h-3.5 w-3.5" />
              Programme Bazario+
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Récompensé à <span className="italic">chaque</span> achat,
              <br />
              pas seulement le 1<sup>er</sup>.
            </h1>
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
              Bazario+ est notre alternative directe à Amazon Prime : cashback en
              vraie monnaie, livraison express illimitée, accès soldes anticipé,
              concierge humain et compensation carbone — pour le prix d&apos;un
              café par mois.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup?plan=plus"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
              >
                Démarrer pour 4,99 €/mois
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#tiers"
                className="inline-flex items-center gap-2 rounded-md border bg-background px-6 py-3 text-sm font-medium hover:bg-muted"
              >
                Comparer les formules
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              30 jours d&apos;essai gratuit · Sans engagement · Annulation 1 clic
            </p>
          </div>
          <aside className="relative">
            <div className="rounded-2xl border bg-secondary/40 p-6 md:p-10">
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5" />
                <p className="font-display text-xl font-semibold tracking-tight">
                  Votre carte Bazario+
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-foreground p-6 text-background shadow-xl">
                <p className="text-xs uppercase tracking-widest opacity-70">
                  Membre depuis 2026
                </p>
                <p className="mt-3 font-display text-2xl">Camille Laurent</p>
                <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-widest opacity-80">
                  <span>BZR+ ★★★</span>
                  <span>Niveau Bazario+</span>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "184 €", l: "Cashback gagné" },
                  { v: "32", l: "Livraisons express" },
                  { v: "4 sem.", l: "Soldes en avance" },
                ].map((s) => (
                  <div key={s.l} className="rounded-md border bg-background p-3">
                    <dt className="font-display text-lg font-bold tabular-nums">
                      {s.v}
                    </dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Pillars */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Six avantages concrets, pas un slogan.
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Chaque ligne ci-dessous est garantie contractuellement et auditée
            chaque trimestre par notre cabinet partenaire indépendant.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border bg-background p-6 transition hover:border-foreground/30"
            >
              <p.icon className="h-6 w-6" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="border-t bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Trois niveaux, choisissez le vôtre.
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Aucun engagement, aucun frais caché : commencez en gratuit, passez
              à Bazario+ quand vous êtes prêt, accédez à Black sur invitation.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TIERS.map((t) => (
              <article
                key={t.name}
                className={`relative flex flex-col overflow-hidden rounded-2xl border ${
                  t.highlight
                    ? "border-foreground bg-foreground text-background"
                    : "bg-background"
                } p-7`}
              >
                {t.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-background px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-foreground">
                    Recommandé
                  </span>
                )}
                <t.icon className="h-6 w-6" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  {t.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    t.highlight ? "opacity-80" : "text-muted-foreground"
                  }`}
                >
                  {t.description}
                </p>
                <p className="mt-6 font-display text-3xl font-bold tabular-nums">
                  {t.monthly}
                </p>
                <p
                  className={`text-xs ${
                    t.highlight ? "opacity-70" : "text-muted-foreground"
                  }`}
                >
                  {t.yearly}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 pt-1">
                  <Link
                    href={t.name === "Bazario+" ? "/signup?plan=plus" : "/signup"}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold ${
                      t.highlight
                        ? "bg-background text-foreground hover:opacity-90"
                        : "border bg-background hover:bg-muted"
                    }`}
                  >
                    {t.name === "Bazario Black"
                      ? "Demander une invitation"
                      : t.name === "Bazario+"
                        ? "Commencer 30 jours offerts"
                        : "Créer un compte gratuit"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr,2fr]">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Questions fréquentes
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tout est clair et transparent. Si vous ne trouvez pas votre réponse
              ici,{" "}
              <Link href="/contact" className="underline">
                écrivez-nous
              </Link>
              , nous répondons sous 90 secondes en moyenne.
            </p>
          </div>
          <dl className="space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border bg-background p-5 transition open:border-foreground/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium">
                  <span>{f.q}</span>
                  <span className="text-muted-foreground transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-foreground py-14 text-background">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
              30 jours offerts · sans engagement
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Plus rapide qu&apos;Amazon Prime, plus humain, plus généreux.
            </h3>
          </div>
          <Link
            href="/signup?plan=plus"
            className="inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90"
          >
            Activer Bazario+
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
