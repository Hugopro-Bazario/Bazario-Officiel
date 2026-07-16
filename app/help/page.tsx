import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Centre d'aide — Réponses 24/7",
  description:
    "Trouvez la réponse à toutes vos questions Bazario : accès aux produits, livraison numérique, remboursements, paiement, créateurs. Notre équipe vous répond en moins d'une heure.",
  alternates: { canonical: "/help" },
}

import {
  Search,
  Package,
  RotateCcw,
  CreditCard,
  ShieldCheck,
  Store,
  MessageSquare,
  Phone,
  Mail,
  ArrowUpRight,
  HeadphonesIcon,
  Globe,
  Clock,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"



const TOPICS = [
  {
    icon: Package,
    title: "Mes téléchargements",
    desc: "Accédez à vos produits et licences",
    href: "/account/orders",
    articles: 24,
    tone: "primary",
  },
  {
    icon: RotateCcw,
    title: "Remboursements",
    desc: "Garantie 14 jours satisfait ou remboursé",
    href: "#returns",
    articles: 18,
    tone: "accent",
  },
  {
    icon: CreditCard,
    title: "Paiement & facturation",
    desc: "Moyens de paiement, factures, abonnement",
    href: "#payment",
    articles: 32,
    tone: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité du compte",
    desc: "Mot de passe, double authentification, 2FA",
    href: "#security",
    articles: 12,
    tone: "success",
  },
  {
    icon: Store,
    title: "Créateurs & studios",
    desc: "Devenir créateur, gérer ses ventes",
    href: "/sell",
    articles: 41,
    tone: "accent",
  },
  {
    icon: MessageSquare,
    title: "Contacter un créateur",
    desc: "Posez vos questions avant achat",
    href: "/account/messages",
    articles: 9,
    tone: "primary",
  },
]

const POPULAR = [
  "Accéder à mes téléchargements",
  "Renvoyer mes liens par email",
  "Demander un remboursement",
  "Changer mon mode de paiement",
  "Gérer mon abonnement Nexus+",
  "Comprendre les licences",
]

const FAQ = [
  {
    q: "Quand vais-je recevoir mon produit ?",
    a: "Immédiatement. Les produits sont numériques : dès le paiement validé, vos accès et liens de téléchargement apparaissent dans votre espace et vous sont envoyés par e-mail. Aucun délai, aucun frais de port.",
  },
  {
    q: "Puis-je être remboursé ?",
    a: "Oui. Bazario applique une garantie 14 jours satisfait ou remboursé : si un produit ne correspond pas à sa description ou est inutilisable, écrivez à support@bazario.com avec votre référence. Le remboursement est traité sous 14 jours.",
  },
  {
    q: "Où retrouver mes achats et leurs mises à jour ?",
    a: "Dans Mon compte → Mes téléchargements. Vous y retrouvez tous vos produits, vos licences et les mises à jour à vie, qui apparaissent automatiquement.",
  },
  {
    q: "Mon paiement est-il sécurisé ?",
    a: "Oui. Bazario utilise Stripe, leader mondial du paiement en ligne, avec chiffrement TLS et 3D Secure systématique. Aucune information bancaire n'est stockée sur nos serveurs.",
  },
  {
    q: "Comment contacter un créateur ?",
    a: "Depuis chaque fiche produit, cliquez sur Contacter. Toutes les conversations passent par la messagerie sécurisée Bazario. Les créateurs s'engagent à répondre rapidement.",
  },
  {
    q: "Comment fonctionnent les licences ?",
    a: "Chaque produit précise sa licence : personnelle (usage privé), commerciale (projets pro) ou agence (clients illimités). Le détail figure sur la fiche produit et dans votre livrable.",
  },
  {
    q: "Comment fonctionne Bazario Nexus+ ?",
    a: "Pour 9,99 € / mois (ou 99,90 €/an), profitez de −20 % sur tout le catalogue, de crédits IA mensuels, de l'accès anticipé aux drops et du coffre-fort de licences. 30 jours d'essai, annulable à tout moment.",
  },
  {
    q: "Combien rapporte Bazario aux créateurs ?",
    a: "La commission est de 15 à 20 % selon la catégorie. Aucun frais fixe, aucun abonnement obligatoire, paiement automatique J+2 via Stripe.",
  },
]

const TONES: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent",
  success: "bg-success/15 text-success",
}

export default function HelpPage() {
  return (
    <div>
      {/* Hero search */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/85 py-20 text-primary-foreground">
        <div
          className="pointer-events-none absolute -left-20 top-1/2 size-72 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div className="bg-grain absolute inset-0 opacity-30" aria-hidden />

        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <Badge className="mb-4 border-0 bg-white/15 text-primary-foreground backdrop-blur">
            <HeadphonesIcon className="mr-1 size-3" /> Support 24/7
          </Badge>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
            Comment pouvons-nous vous aider&nbsp;?
          </h1>
          <p className="mt-3 text-lg text-primary-foreground/80">
            Plus de 1 200 articles d&apos;aide. Réponse en moins de 5&nbsp;minutes par chat.
          </p>
          <div className="relative mt-8">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tapez votre question…"
              className="h-16 rounded-2xl border-0 bg-background pl-12 pr-32 text-base text-foreground shadow-2xl shadow-black/20"
            />
            <Button className="absolute right-2 top-1/2 h-12 -translate-y-1/2 rounded-xl px-5">Rechercher</Button>
          </div>

          {/* Popular searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-primary-foreground/70">Recherches populaires&nbsp;:</span>
            {POPULAR.map((p) => (
              <Link
                key={p}
                href="#"
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur transition hover:bg-white/15"
              >
                {p}
              </Link>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-8 text-left">
            <Stat icon={<Clock className="size-4" />} value="< 5 min" label="temps de réponse moyen par chat" />
            <Stat icon={<Globe className="size-4" />} value="8 langues" label="FR, EN, DE, IT, ES, JA, ZH, AR" />
            <Stat icon={<ShieldCheck className="size-4" />} value="98 %" label="taux de satisfaction support" />
          </div>
        </div>
      </section>

      {/* Topics grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Centre d&apos;aide</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Sujets populaires</h2>
          </div>
          <Link
            href="#"
            className="hidden items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Tous les articles <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => {
            const Icon = t.icon
            return (
              <Link
                key={t.title}
                href={t.href}
                className="group relative flex flex-col rounded-2xl border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${TONES[t.tone]} transition group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold group-hover:text-primary">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t pt-4 text-xs">
                  <span className="text-muted-foreground">{t.articles} articles</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    Explorer <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Questions fréquentes</h2>
            <p className="mt-2 text-muted-foreground">Les réponses aux questions les plus posées par notre communauté.</p>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border bg-background shadow-sm">
            {FAQ.map((f, i) => (
              <details key={i} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left">
                  <span className="text-base font-semibold">{f.q}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground group-open:border-primary">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Toujours bloqué&nbsp;?</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Notre équipe est là pour vous</h2>
            <p className="mt-2 text-muted-foreground">
              Disponible 24h/24, 7j/7, dans 8 langues. Réponse garantie sous 5 minutes par chat.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <ContactCard
              icon={MessageSquare}
              title="Chat en direct"
              desc="Réponse en moins de 5 min"
              cta="Démarrer un chat"
              tone="primary"
              recommended
            />
            <ContactCard icon={Mail} title="E-mail" desc="support@bazario.com" cta="Envoyer un message" tone="muted" />
            <ContactCard
              icon={Phone}
              title="Téléphone"
              desc="Premium uniquement · 24/7"
              cta="Voir le numéro"
              tone="accent"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="mb-1.5 inline-flex size-7 items-center justify-center rounded-md bg-white/10 text-accent">
        {icon}
      </div>
      <div className="font-display text-xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-xs text-primary-foreground/70">{label}</div>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  title,
  desc,
  cta,
  tone,
  recommended,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  cta: string
  tone: "primary" | "accent" | "muted"
  recommended?: boolean
}) {
  const isPrimary = tone === "primary"
  return (
    <div
      className={`relative rounded-2xl border p-6 text-center transition hover:-translate-y-0.5 hover:shadow-lg ${
        isPrimary ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
      }`}
    >
      {recommended && (
        <Badge variant="accent" className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          Recommandé
        </Badge>
      )}
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
          isPrimary ? "bg-white/15 text-primary-foreground" : tone === "accent" ? "bg-accent/15 text-accent" : "bg-muted text-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className={`mt-1 text-sm ${isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{desc}</p>
      <Button
        variant={isPrimary ? "accent" : "outline"}
        size="sm"
        className="mt-4 w-full"
      >
        {cta}
      </Button>
    </div>
  )
}
