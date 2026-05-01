import Link from "next/link"
import Image from "next/image"
import {
  Package,
  Heart,
  MapPin,
  Coins,
  ChevronRight,
  TrendingUp,
  Crown,
  Gift,
  CheckCircle2,
  Truck,
  CreditCard,
  Sparkles,
  Award,
  ArrowUpRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockOrders, products, formatPrice } from "@/lib/data"

const TIMELINE = [
  {
    icon: CheckCircle2,
    color: "success",
    title: "Commande BZ-20264102 livrée",
    sub: "Sneakers cuir blanc · livré chez vous le 14 avril",
    time: "il y a 12 jours",
  },
  {
    icon: Truck,
    color: "primary",
    title: "Commande BZ-20264087 expédiée",
    sub: "Lampe Halo laiton brossé · arrivée prévue demain",
    time: "il y a 3 jours",
  },
  {
    icon: Coins,
    color: "accent",
    title: "+85 Bazario Coins gagnés",
    sub: "Achat éligible Premium · 1 coin = 0,01 €",
    time: "il y a 3 jours",
  },
  {
    icon: Gift,
    color: "primary",
    title: "Code promo VOYAGE-15 reçu",
    sub: "−15 % sur la catégorie Voyage, valable 30 jours",
    time: "il y a 6 jours",
  },
  {
    icon: CreditCard,
    color: "muted",
    title: "Méthode de paiement ajoutée",
    sub: "Visa •••• 4242 enregistrée comme moyen par défaut",
    time: "il y a 2 semaines",
  },
]

const MILESTONES = [
  { label: "10 commandes", reached: true },
  { label: "50 avis publiés", reached: true },
  { label: "Premium activé", reached: true },
  { label: "100 commandes", reached: false, progress: 87 },
]

export default function AccountDashboard() {
  const recentOrders = mockOrders.slice(0, 3)
  const recommendations = products.slice(0, 4)

  // Mock savings: difference between compareAtPrice and price across all orders
  const yearSpent = 2480
  const yearSaved = 412
  const goalSpent = 5000
  const progressSpent = Math.min(100, Math.round((yearSpent / goalSpent) * 100))

  return (
    <div className="space-y-8">
      {/* Welcome hero */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground sm:p-8">
        <div
          className="pointer-events-none absolute -right-12 -top-12 size-64 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              Espace membre Premium
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Bonjour Hugo</h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Membre Bazario depuis octobre 2025 · 18 mois consécutifs
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="border-0 bg-accent text-accent-foreground">
                <Crown className="mr-1 size-3" /> Premium Or
              </Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-primary-foreground">
                Niveau Explorateur
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <Hero label="Commandes" value="14" />
            <Hero label="Économisé" value={formatPrice(yearSaved)} accent />
            <Hero label="Coins" value="320" />
          </div>
        </div>
      </Card>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Commandes" value={mockOrders.length} href="/account/orders" />
        <StatCard icon={Heart} label="Favoris" value={12} href="/account/wishlist" />
        <StatCard icon={MapPin} label="Adresses" value={2} href="/account/addresses" />
        <StatCard icon={Coins} label="Bazario Coins" value="320" href="/account/coins" accent />
      </div>

      {/* Savings + Milestones */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                <TrendingUp className="size-3" /> Vous économisez
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">{formatPrice(yearSaved)} économisés en 2026</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Grâce à Premium, aux ventes flash et aux Bazario Coins
              </p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/account/coins">
                Détails <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Dépensé en 2026</span>
              <span className="font-semibold tabular-nums">
                {formatPrice(yearSpent)} <span className="text-xs text-muted-foreground">/ {formatPrice(goalSpent)}</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${progressSpent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Plus que <span className="font-semibold text-foreground">{formatPrice(goalSpent - yearSpent)}</span> pour
              débloquer le statut <span className="font-semibold text-accent">Premium Platine</span> (livraison express
              illimitée).
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-6">
            <Mini label="Économies Premium" value={formatPrice(218)} />
            <Mini label="Coins encaissés" value="−85 €" />
            <Mini label="Promos appliquées" value="6" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Vos succès</h3>
              <p className="text-sm text-muted-foreground">Trois étapes débloquées sur quatre</p>
            </div>
            <Award className="size-5 text-accent" />
          </div>
          <ul className="space-y-3">
            {MILESTONES.map((m) => (
              <li key={m.label} className="flex items-center gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                    m.reached ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {m.reached ? <CheckCircle2 className="size-4" /> : <Sparkles className="size-4" />}
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${m.reached ? "" : "text-muted-foreground"}`}>{m.label}</p>
                  {!m.reached && m.progress !== undefined && (
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${m.progress}%` }} />
                    </div>
                  )}
                </div>
                {!m.reached && m.progress !== undefined && (
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">{m.progress}%</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Activity timeline */}
      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Votre activité récente</h3>
            <p className="text-sm text-muted-foreground">Commandes, livraisons, récompenses et préférences</p>
          </div>
        </div>
        <ol className="relative space-y-5 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
          {TIMELINE.map((t, i) => {
            const Icon = t.icon
            const colorMap: Record<string, string> = {
              success: "bg-success/15 text-success",
              primary: "bg-primary/15 text-primary",
              accent: "bg-accent/15 text-accent",
              muted: "bg-muted text-muted-foreground",
            }
            return (
              <li key={i} className="relative">
                <span
                  className={`absolute -left-8 top-0 flex size-6 items-center justify-center rounded-full ring-4 ring-background ${colorMap[t.color]}`}
                >
                  <Icon className="size-3.5" />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <p className="font-medium">{t.title}</p>
                  <span className="text-xs text-muted-foreground">{t.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{t.sub}</p>
              </li>
            )
          })}
        </ol>
      </Card>

      {/* Recent orders */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Commandes récentes</h3>
          <Link href="/account/orders" className="text-sm font-medium text-primary hover:underline">
            Voir tout
          </Link>
        </div>
        <Card className="divide-y">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders`}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/40"
            >
              <div className="relative size-14 flex-shrink-0 overflow-hidden rounded bg-muted">
                <Image
                  src={order.items[0]?.image || "/placeholder.svg"}
                  alt={order.items[0]?.title || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{order.id}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {order.items.length} article{order.items.length > 1 ? "s" : ""} · {order.date}
                </p>
              </div>
              <Badge
                variant={
                  order.status === "delivered" ? "success" : order.status === "shipped" ? "default" : "secondary"
                }
              >
                {order.statusLabel}
              </Badge>
              <span className="hidden font-semibold tabular-nums sm:inline">{formatPrice(order.total)}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </Card>
      </section>

      {/* Recommendations */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Sélectionnés pour vous</h3>
            <p className="text-sm text-muted-foreground">Inspirés par vos derniers achats</p>
          </div>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Plus de recommandations
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recommendations.map((p) => (
            <Link key={p.id} href={`/p/${p.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={p.images[0] || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium">{p.title}</p>
              <p className="text-sm font-semibold tabular-nums">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function Hero({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div>
      <div className={`font-display text-2xl font-bold sm:text-3xl ${accent ? "text-accent" : ""}`}>{value}</div>
      <div className="text-xs uppercase tracking-wide text-primary-foreground/70">{label}</div>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold tabular-nums">{value}</p>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: typeof Package
  label: string
  value: string | number
  href: string
  accent?: boolean
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-lg ${
            accent ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-display text-xl font-bold">{value}</p>
        </div>
      </div>
      <Button asChild variant="ghost" size="sm" className="mt-3 w-full justify-between">
        <Link href={href}>
          Gérer
          <ChevronRight className="size-3.5" />
        </Link>
      </Button>
    </Card>
  )
}
