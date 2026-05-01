"use client"

import * as React from "react"
import Link from "next/link"
import {
  Mail,
  MessageCircle,
  Phone,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Building2,
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type Channel = {
  icon: React.ElementType
  label: string
  sla: string
  description: string
  cta: string
  href: string
  badge?: string
  highlight?: boolean
}

const CHANNELS: Channel[] = [
  {
    icon: MessageCircle,
    label: "Chat en direct",
    sla: "Réponse < 2 min",
    description: "Le moyen le plus rapide pour les questions de commande, livraison ou retour.",
    cta: "Démarrer le chat",
    href: "/help",
    badge: "Recommandé",
    highlight: true,
  },
  {
    icon: Mail,
    label: "Email support",
    sla: "Réponse < 4 h",
    description: "Pour les demandes complexes nécessitant des pièces jointes ou une trace écrite.",
    cta: "support@bazario.com",
    href: "mailto:support@bazario.com",
  },
  {
    icon: Phone,
    label: "Téléphone",
    sla: "Lun-Sam · 9h-19h",
    description: "Pour les urgences ou les commandes professionnelles à partir de 500 €.",
    cta: "01 84 88 32 00",
    href: "tel:+33184883200",
  },
]

const SUBJECTS = [
  { value: "order", label: "Commande", desc: "Suivi, livraison, retour" },
  { value: "product", label: "Produit", desc: "Question avant achat, conseil" },
  { value: "account", label: "Compte", desc: "Connexion, mot de passe, données" },
  { value: "seller", label: "Devenir vendeur", desc: "Onboarding, KYC, commissions" },
  { value: "press", label: "Presse & partenariats", desc: "Média, contenu, partenariats" },
  { value: "other", label: "Autre", desc: "Suggestion, retour produit" },
] as const

const DEPARTMENTS = [
  {
    icon: HeartHandshake,
    title: "Support acheteurs",
    email: "support@bazario.com",
    phone: "01 84 88 32 00",
    hours: "Lun-Dim · 7j/7",
  },
  {
    icon: Building2,
    title: "Service vendeurs",
    email: "sellers@bazario.com",
    phone: "01 84 88 32 01",
    hours: "Lun-Ven · 9h-18h",
  },
  {
    icon: Sparkles,
    title: "Presse & média",
    email: "press@bazario.com",
    phone: "—",
    hours: "Réponse < 24 h",
  },
] as const

export default function ContactPage() {
  const [subject, setSubject] = React.useState<string>("order")
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary via-primary to-primary/85 text-primary-foreground">
        <div className="bg-grain absolute inset-0 opacity-30" aria-hidden="true" />
        <div
          className="absolute -right-32 -top-32 size-96 rounded-full bg-accent/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative py-16 md:py-24">
          <Badge
            variant="outline"
            className="mb-5 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground"
          >
            <ShieldCheck className="mr-1 size-3" /> Une vraie équipe humaine, basée à Paris
          </Badge>
          <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Parlons-en. <span className="text-accent">Vraiment.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-primary-foreground/85 md:text-lg">
            Une question, un doute, une idée ? Notre équipe répond à 92 % des messages en moins de
            2 heures, en français, anglais, italien, espagnol et allemand.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Chip icon={Clock} label="Temps de réponse moyen 47 min" />
            <Chip icon={ShieldCheck} label="Score CSAT 4,9/5" />
            <Chip icon={MessageCircle} label="5 langues" />
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        {/* Channels */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {CHANNELS.map((c) => {
            const isHighlight = "highlight" in c && c.highlight === true
            return (
              <Card
                key={c.label}
                className={
                  isHighlight
                    ? "relative overflow-hidden border-primary bg-primary text-primary-foreground"
                    : "p-6"
                }
              >
                {isHighlight ? (
                  <>
                    <div
                      className="bg-grain absolute inset-0 opacity-20"
                      aria-hidden="true"
                    />
                    <div className="relative p-6">
                      <ChannelInner channel={c} highlight />
                    </div>
                  </>
                ) : (
                  <ChannelInner channel={c} />
                )}
              </Card>
            )
          })}
        </div>

        {/* Form + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <Card className="p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="size-8" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                  Message bien reçu.
                </h2>
                <p className="mt-2 max-w-md text-balance text-sm text-muted-foreground">
                  Notre équipe vous répond dans les prochaines heures à l&apos;adresse indiquée. Un
                  numéro de ticket vous a été envoyé par email.
                </p>
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  Référence : BZ-CT-
                  {Math.floor(100000 + Math.random() * 900000)}
                </p>
                <Button asChild className="mt-6 gap-2">
                  <Link href="/help">
                    Consulter la FAQ
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <h2 className="font-serif text-2xl font-semibold">Écrivez-nous</h2>
                  <p className="text-sm text-muted-foreground">
                    Plus votre message est précis, plus notre réponse sera rapide.
                  </p>
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sujet
                  </legend>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSubject(s.value)}
                        className={
                          subject === s.value
                            ? "rounded-xl border-2 border-primary bg-primary/5 p-3 text-left transition-colors"
                            : "rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40 hover:bg-secondary/40"
                        }
                        aria-pressed={subject === s.value}
                      >
                        <p className="text-sm font-semibold">{s.label}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" name="firstName" autoComplete="given-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" name="lastName" autoComplete="family-name" required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="vous@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderId">
                      N° de commande{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        (optionnel)
                      </span>
                    </Label>
                    <Input id="orderId" name="orderId" placeholder="BZ-2026XXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Votre message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Décrivez votre demande avec autant de détails que possible..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Les messages détaillés (200 caractères ou plus) reçoivent une réponse 3× plus
                    rapide.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-xs text-muted-foreground">
                    En envoyant ce formulaire, vous acceptez notre{" "}
                    <Link
                      href="/legal/privacy"
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      politique de confidentialité
                    </Link>
                    . Vos données sont chiffrées et conservées 24 mois maximum.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
                  <Send className="size-4" aria-hidden="true" />
                  Envoyer le message
                </Button>
              </form>
            )}
          </Card>

          <aside className="space-y-4">
            <Card className="p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold">Nos services</h3>
              <div className="space-y-4">
                {DEPARTMENTS.map((d) => {
                  const Icon = d.icon
                  return (
                    <div key={d.title} className="flex gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5 text-sm">
                        <p className="font-semibold">{d.title}</p>
                        <a
                          href={`mailto:${d.email}`}
                          className="block text-xs text-muted-foreground hover:text-foreground"
                        >
                          {d.email}
                        </a>
                        {d.phone !== "—" && (
                          <a
                            href={`tel:${d.phone.replace(/\s/g, "")}`}
                            className="block text-xs text-muted-foreground hover:text-foreground"
                          >
                            {d.phone}
                          </a>
                        )}
                        <p className="text-[11px] text-muted-foreground">{d.hours}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card className="overflow-hidden p-0">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-5 text-primary-foreground">
                <Building2 className="mb-2 size-5" />
                <p className="font-serif text-base font-semibold">Bazario SAS</p>
                <p className="mt-1 text-xs text-primary-foreground/85">
                  12 rue de la Paix
                  <br />
                  75002 Paris, France
                </p>
              </div>
              <div className="space-y-2 p-5 text-xs">
                <Row label="SIRET" value="892 456 789 00012" />
                <Row label="TVA intra." value="FR 32 892456789" />
                <Row label="RCS" value="Paris B 892 456 789" />
              </div>
            </Card>

            <Card className="border-accent/40 bg-accent/5 p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Aide instantanée
              </p>
              <p className="font-serif text-base font-semibold">
                Trouvez votre réponse en 30 secondes
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Notre centre d&apos;aide regroupe 240+ articles couvrant 95 % des questions.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-3 w-full bg-transparent text-xs"
              >
                <Link href="/help">
                  Consulter le centre d&apos;aide
                  <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Chip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium">
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-border pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium">{value}</span>
    </div>
  )
}

function ChannelInner({
  channel,
  highlight,
}: {
  channel: Channel
  highlight?: boolean
}) {
  const Icon = channel.icon
  return (
    <div className={highlight ? "space-y-3" : "space-y-3"}>
      <div className="flex items-start justify-between">
        <div
          className={
            highlight
              ? "flex size-11 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground"
              : "flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
          }
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        {channel.badge && (
          <Badge
            variant={highlight ? "outline" : "accent"}
            className={
              highlight
                ? "border-primary-foreground/30 bg-primary-foreground/15 text-primary-foreground"
                : ""
            }
          >
            {channel.badge}
          </Badge>
        )}
      </div>
      <div>
        <p
          className={
            highlight ? "font-serif text-lg font-semibold" : "font-serif text-lg font-semibold"
          }
        >
          {channel.label}
        </p>
        <p
          className={
            highlight
              ? "mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-accent"
              : "mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-success"
          }
        >
          <Clock className="size-3" />
          {channel.sla}
        </p>
        <p
          className={
            highlight
              ? "mt-2 text-sm text-primary-foreground/85"
              : "mt-2 text-sm text-muted-foreground"
          }
        >
          {channel.description}
        </p>
      </div>
      <Button
        asChild
        size="sm"
        variant={highlight ? "secondary" : "outline"}
        className={highlight ? "w-full" : "w-full bg-transparent"}
      >
        <Link href={channel.href}>{channel.cta}</Link>
      </Button>
    </div>
  )
}
