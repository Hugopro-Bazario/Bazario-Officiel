import type { Metadata } from "next"
import Link from "next/link"
import {
  ShieldCheck,
  Lock,
  Truck,
  RefreshCw,
  HeartHandshake,
  Leaf,
  BadgeCheck,
  Eye,
  Users,
  Scale,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Centre de confiance — Bazario",
  description:
    "Sécurité des paiements, vérification des vendeurs, retours sans friction, RGPD, garantie satisfait ou remboursé. Tout ce qui rend Bazario plus sûr qu&apos;ailleurs.",
  alternates: { canonical: "/trust" },
}

const PILLARS = [
  {
    icon: Lock,
    title: "Paiement 100 % sécurisé",
    body: "Encryption AES-256, conformité PCI-DSS, 3D Secure obligatoire et fonds bloqués jusqu&apos;à la confirmation de livraison. Vos données bancaires ne sont jamais visibles par les vendeurs.",
    chips: ["PCI-DSS", "3D Secure", "AES-256"],
  },
  {
    icon: BadgeCheck,
    title: "Vendeurs vérifiés un par un",
    body: "Chaque vendeur est contrôlé manuellement : pièce d&apos;identité, registre du commerce, vérification d&apos;adresse, KYC complet. Note minimum de 4,5/5 maintenue ou retrait du programme.",
    chips: ["KYC", "Anti-fraude", "Note ≥ 4,5"],
  },
  {
    icon: RefreshCw,
    title: "Retours 30 jours sans question",
    body: "Pas satisfait&nbsp;? Vous avez 30 jours pour retourner gratuitement votre commande, sans justification. Remboursement sous 3 jours ouvrés sur la carte d&apos;origine.",
    chips: ["Retour offert", "3 jours pour rembourser"],
  },
  {
    icon: ShieldCheck,
    title: "Garantie satisfait ou remboursé",
    body: "Si votre commande n&apos;est pas conforme, abîmée, ou n&apos;arrive jamais, nous remboursons l&apos;intégralité — y compris les frais. La protection acheteur Bazario est totale.",
    chips: ["Couverture totale", "Sans franchise"],
  },
  {
    icon: Truck,
    title: "Livraison fiable et tracée",
    body: "Suivi temps réel sur toute la chaîne, 96 % des commandes livrées dans les délais annoncés, et compensation automatique si retard supérieur à 48h.",
    chips: ["Suivi temps réel", "Compensation retard"],
  },
  {
    icon: Eye,
    title: "RGPD & vie privée",
    body: "Vos données personnelles sont stockées en Europe, jamais revendues, jamais partagées avec des annonceurs tiers. Vous pouvez les exporter ou les supprimer en un clic.",
    chips: ["Données en EU", "Sans revente", "Export/suppression"],
  },
  {
    icon: HeartHandshake,
    title: "Service client humain",
    body: "Équipe basée en France, répondant en moins de 2 minutes en chat et 4h par e-mail. Pas de bots labyrinthiques : un conseiller dédié à chaque demande.",
    chips: ["< 2 min en chat", "Conseiller dédié"],
  },
  {
    icon: Leaf,
    title: "Achats responsables",
    body: "Compensation carbone offerte sur 100 % des livraisons, emballages 100 % recyclables, et reversement de 1 % du chiffre d&apos;affaires à des associations environnementales.",
    chips: ["1 % for the Planet", "Carbone neutre"],
  },
]

const FAQ = [
  {
    q: "Que se passe-t-il si je ne reçois jamais ma commande ?",
    a: "Si la commande n&apos;est pas livrée dans les 14 jours après l&apos;estimation, nous la considérons comme perdue et vous remboursons intégralement, sans avoir à fournir de preuve. Notre équipe ouvre alors une enquête avec le transporteur en parallèle.",
  },
  {
    q: "Comment vérifiez-vous les vendeurs avant de les accepter ?",
    a: "Tout vendeur soumet une pièce d&apos;identité officielle, son extrait Kbis ou équivalent local, un justificatif d&apos;adresse de moins de 3 mois et passe un entretien visio avec un membre de notre équipe. Nous refusons environ 47 % des candidatures.",
  },
  {
    q: "Les avis sur Bazario sont-ils vrais ?",
    a: "Oui — seuls les acheteurs ayant réellement reçu et payé un produit peuvent laisser un avis, et nous publions chaque avis tel quel, négatifs compris. Nous utilisons un système anti-spam et anti-faux-avis qui supprime moins de 0,3 % des contributions par an.",
  },
  {
    q: "Mes données bancaires sont-elles stockées sur Bazario ?",
    a: "Non, jamais. Les paiements transitent uniquement via nos prestataires certifiés PCI-DSS niveau 1 (Stripe, Adyen). Bazario ne voit que les 4 derniers chiffres pour vous permettre d&apos;identifier la carte utilisée.",
  },
  {
    q: "Puis-je supprimer mon compte et toutes mes données ?",
    a: "Oui, en un clic depuis votre compte. Toutes vos données sont effacées sous 30 jours, sauf celles que la loi nous oblige à conserver (factures fiscales pendant 10 ans, données légales).",
  },
]

const CERTS = [
  { name: "PCI-DSS", desc: "Niveau 1" },
  { name: "ISO 27001", desc: "Sécurité info" },
  { name: "RGPD", desc: "Conforme" },
  { name: "1% for the Planet", desc: "Membre actif" },
  { name: "Trusted Shops", desc: "Avis vérifiés" },
  { name: "B Corp", desc: "Certifié 2025" },
]

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="container py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <ShieldCheck className="mr-1.5 h-3 w-3" />
              Centre de confiance
            </Badge>
            <h1 className="text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
              Acheter sur Bazario, en toute confiance
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Vendeurs vérifiés, paiements chiffrés, retours offerts pendant 30 jours, service client humain. Voici tout
              ce qui rend Bazario plus sûr — et plus respectueux de vos données — qu&apos;une marketplace généraliste.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/loyalty">Découvrir Bazario+</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/faq">Lire la FAQ complète</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container space-y-16 py-12 md:py-16">
        {/* Pillars */}
        <section>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              8 garanties concrètes, écrites noir sur blanc
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pas de petits caractères, pas d&apos;exception cachée. Chaque promesse est tenue, vérifiable, et
              opposable.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, body, chips }) => (
              <article key={title} className="rounded-2xl border bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold">{title}</h3>
                    <p
                      className="mt-1 text-sm leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Certifications &amp; engagements
            </h2>
            <p className="mt-3 text-muted-foreground">
              Audités chaque année par des organismes indépendants.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {CERTS.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border bg-card p-5 text-center transition hover:bg-muted/50"
              >
                <p className="font-display text-base font-semibold">{c.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Vos questions de sécurité
            </h2>
            <p className="mt-3 text-muted-foreground">
              Les 5 questions que les acheteurs se posent le plus avant leur premier achat.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border bg-card p-5 transition hover:border-foreground/30"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-base font-semibold">{item.q}</h3>
                    <span
                      className="text-2xl font-light text-muted-foreground transition group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </summary>
                <p
                  className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </details>
            ))}
          </div>
        </section>

        {/* CTA Block */}
        <section className="grid items-center gap-6 rounded-3xl border bg-card p-8 md:grid-cols-3 md:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
            <Users className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Une question, un doute&nbsp;?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Notre équipe humaine répond en moins de 2 minutes en chat. Aucun bot labyrinthique.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">Lire la FAQ</Link>
            </Button>
          </div>
        </section>

        {/* Legal note */}
        <section className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <Scale className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              Bazario est édité par Bazario SAS, immatriculée au RCS de Paris. Pour consulter nos mentions légales et
              CGV, rendez-vous sur la{" "}
              <Link className="underline underline-offset-2" href="/legal/mentions">
                page mentions légales
              </Link>{" "}
              ou nos{" "}
              <Link className="underline underline-offset-2" href="/legal/terms">
                conditions générales
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
