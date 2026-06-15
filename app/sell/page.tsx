import Link from "next/link"
import Image from "next/image"
import { Globe, Wallet, Headphones, BarChart3, ShieldCheck, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Vendre sur Bazario — Lancez votre studio de produits digitaux",
  description: "Rejoignez 8 000 créateurs Bazario. Vendez vos agents IA, prompts, templates et formations. 0 € de frais fixes, paiement sous 2 jours.",
}

const PERKS = [
  { icon: Globe, title: "Audience mondiale", desc: "Vos créations exposées à 12M+ d'acheteurs dans 47 pays, sans logistique." },
  { icon: Wallet, title: "Paiements rapides", desc: "Versement automatique J+2 via Stripe, sans frais cachés ni stock à gérer." },
  { icon: BarChart3, title: "Analytics créateur", desc: "Tableau de bord temps réel : ventes, conversions, revenus, avis clients." },
  { icon: ShieldCheck, title: "Licences protégées", desc: "Filigrane, traçabilité et médiation Bazario en cas de litige sur vos fichiers." },
  { icon: Headphones, title: "Support créateurs 7/7", desc: "Une équipe dédiée, en français, qui répond en moins de 30 minutes." },
  { icon: Zap, title: "Boost & mise en avant", desc: "Apparaissez en home, dans les drops et les résultats de recherche." },
]

const STEPS = [
  { n: "1", title: "Ouvrez votre studio", desc: "Nom, description, logo. 5 minutes suffisent." },
  { n: "2", title: "Publiez vos produits", desc: "Uploadez vos fichiers, définissez vos licences. Fiches et SEO assistés par IA." },
  { n: "3", title: "Validez votre identité", desc: "Quelques documents (KYC Stripe) pour activer les paiements. Validation sous 48 h." },
  { n: "4", title: "Encaissez automatiquement", desc: "Livraison 100 % automatique. Bazario gère la vente, vous créez." },
]

const PRICING = [
  { cat: "Prompts, templates, art & audio", commission: "15 %" },
  { cat: "Agents IA, SaaS & automatisations", commission: "20 %" },
  { cat: "Formations & masterclass", commission: "20 %" },
  { cat: "Frais fixes & abonnement", commission: "0 €" },
]

export default function SellPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <Badge className="border-accent/40 bg-accent/20 text-accent-foreground">Pour les créateurs</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Vendez vos créations digitales. Sans stock, sans logistique.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-primary-foreground/80">
              Agents IA, prompts, templates, formations, musique : rejoignez 8 000 créateurs qui exposent
              leurs produits à 12 millions d&apos;acheteurs. Revenus passifs, livraison automatique.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup">Ouvrir mon studio</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="#pricing">Voir les commissions</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-primary-foreground/5">
            <Image
              src="/digital/cover-quantum.svg"
              alt="Studio créateur Bazario"
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b py-10">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {[
            { v: "8 000+", l: "créateurs actifs" },
            { v: "12M+", l: "acheteurs" },
            { v: "0 €", l: "frais fixes" },
            { v: "J+2", l: "délai de paiement" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Tout pour réussir</h2>
          <p className="mt-3 text-muted-foreground">Bazario vous accompagne, du premier produit à la première vente à l&apos;international.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="rounded-2xl border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Lancez votre studio en 4 étapes</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border bg-background p-6">
                <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {s.n}
                </span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Commissions transparentes</h2>
          <p className="mt-3 text-muted-foreground">Vous ne payez que sur les ventes effectives. Aucun coût caché.</p>
        </div>
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border bg-background">
          <table className="w-full">
            <tbody>
              {PRICING.map((p, i) => (
                <tr key={p.cat} className={i < PRICING.length - 1 ? "border-b" : ""}>
                  <td className="px-6 py-4 text-sm font-medium">{p.cat}</td>
                  <td className="px-6 py-4 text-right font-display text-lg font-bold text-primary">{p.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mx-auto mt-6 max-w-2xl space-y-2 text-sm text-muted-foreground">
          {[
            "Frais de transaction inclus dans les commissions",
            "Aucun frais d'inscription, aucun engagement",
            "Versements automatiques chaque mardi",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-foreground p-10 text-center text-background sm:p-14">
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-balance">
            Prêt à transformer votre savoir-faire en revenus ?
          </h2>
          <p className="mt-3 text-background/70">Activation en 24 h. Premier produit en ligne aujourd&apos;hui.</p>
          <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/signup">Créer mon studio gratuitement</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
