import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Eye,
  Star,
  ArrowUpRight,
  Plus,
  Megaphone,
  Wallet,
  Globe,
  Bell,
  Sparkles,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/data"
import { RevenueChart } from "@/components/seller/revenue-chart"
import { CategoryBreakdown } from "@/components/seller/category-breakdown"
import { ConversionFunnel } from "@/components/seller/conversion-funnel"

const KPI = [
  { label: "Ventes (30 j)", value: 12480, prefix: "€", delta: 18.4, icon: Wallet },
  { label: "Commandes (30 j)", value: 87, delta: 12.1, icon: ShoppingBag },
  { label: "Visites fiche", value: 4321, delta: -3.2, icon: Eye },
  { label: "Note moyenne", value: 4.8, suffix: " / 5", delta: 0.2, icon: Star },
]

const RECENT_ORDERS = [
  { id: "BZ-20264112", buyer: "M. Dupont", product: "Casque audio sans fil…", total: 189, status: "Nouvelle" },
  { id: "BZ-20264110", buyer: "S. Bernard", product: "Sneakers blanches taille 42", total: 129, status: "À expédier" },
  { id: "BZ-20264108", buyer: "K. Martin", product: "Sérum vitamine C ×2", total: 78, status: "À expédier" },
  { id: "BZ-20264102", buyer: "L. Chen", product: "Lampe en laiton brossé", total: 219, status: "Expédiée" },
]

const TOP_PRODUCTS = [
  { title: "Casque audio sans-fil Aurora Pro", sales: 142, revenue: 26838, image: "/product-headphones-1.jpg" },
  { title: "Sneakers cuir blanc Lumen Classic", sales: 98, revenue: 12642, image: "/product-sneakers-1.jpg" },
  { title: "Sérum Éclat Vitamine C 15% bio", sales: 73, revenue: 2847, image: "/product-serum-1.jpg" },
]

const COUNTRIES = [
  { name: "France", flag: "🇫🇷", percent: 42, sales: 5240 },
  { name: "Allemagne", flag: "🇩🇪", percent: 18, sales: 2246 },
  { name: "Belgique", flag: "🇧🇪", percent: 11, sales: 1372 },
  { name: "Espagne", flag: "🇪🇸", percent: 9, sales: 1123 },
  { name: "Italie", flag: "🇮🇹", percent: 7, sales: 873 },
  { name: "Autres", flag: "🌍", percent: 13, sales: 1626 },
]

const NOTIFICATIONS = [
  { kind: "stock", text: "Stock bas : Sneakers Lumen Classic taille 42 (3 restants)", time: "il y a 2 h" },
  { kind: "review", text: "Nouvelle note 5 étoiles sur le Casque Aurora Pro", time: "il y a 5 h" },
  { kind: "payout", text: "Virement de 3 240,00 € envoyé sur votre compte", time: "hier" },
]

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bonjour <span className="font-medium text-foreground">Lumen Studio</span>, voici vos performances aujourd&apos;hui.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Megaphone className="size-4" />
            Lancer une promo
          </Button>
          <Button asChild>
            <Link href="/seller/products">
              <Plus className="size-4" />
              Ajouter un produit
            </Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI.map((kpi) => {
          const Icon = kpi.icon
          const positive = kpi.delta >= 0
          return (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <Badge variant={positive ? "success" : "destructive"} className="gap-1">
                  {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {positive ? "+" : ""}
                  {kpi.delta}%
                </Badge>
              </div>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums">
                {kpi.prefix === "€" ? formatPrice(kpi.value) : `${kpi.value.toLocaleString("fr-FR")}${kpi.suffix ?? ""}`}
              </p>
            </Card>
          )
        })}
      </div>

      {/* Revenue chart */}
      <Card className="p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Chiffre d&apos;affaires</h2>
            <p className="text-sm text-muted-foreground">Évolution sur les 30 derniers jours</p>
          </div>
          <div className="flex gap-1.5 text-xs">
            {["7 j", "30 j", "90 j", "1 an"].map((p, i) => (
              <button
                key={p}
                className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                  i === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <RevenueChart />
      </Card>

      {/* Insights row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Répartition par catégorie</h2>
              <p className="text-sm text-muted-foreground">Chiffre d&apos;affaires sur 30 j</p>
            </div>
            <Sparkles className="size-5 text-accent" />
          </div>
          <CategoryBreakdown />
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Tunnel de conversion</h2>
            <p className="text-sm text-muted-foreground">De la visite à la commande finalisée</p>
          </div>
          <ConversionFunnel />
        </Card>
      </div>

      {/* Geo + AI insight */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Globe className="size-4 text-primary" />
                Ventes par pays
              </h2>
              <p className="text-sm text-muted-foreground">Top 6 marchés sur 30 j</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="#">
                Détails <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {COUNTRIES.map((c) => (
              <li key={c.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="text-base" aria-hidden>
                      {c.flag}
                    </span>
                    {c.name}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    <span className="font-semibold text-foreground">{formatPrice(c.sales)}</span>
                    <span className="ml-2 text-xs">{c.percent}%</span>
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${c.percent}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-accent/30 blur-3xl" aria-hidden />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur">
              <Sparkles className="size-3" /> Insight IA
            </div>
            <h3 className="mt-4 font-display text-xl font-bold leading-snug">
              +24 % de conversion attendue sur les Sneakers Lumen Classic ce week-end
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Les recherches sur cette gamme ont bondi de 38 % cette semaine. Activez une promo flash pour capter la demande.
            </p>
            <Button variant="accent" className="mt-6 w-full">
              Créer une promo flash
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent orders + Top products */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold">Commandes récentes</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/seller/orders">
                Voir tout <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Commande</th>
                  <th className="px-5 py-3 font-medium">Acheteur</th>
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium text-right">Total</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-mono text-xs">{o.id}</td>
                    <td className="px-5 py-3">{o.buyer}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.product}</td>
                    <td className="px-5 py-3 text-right font-semibold tabular-nums">{formatPrice(o.total)}</td>
                    <td className="px-5 py-3">
                      <Badge
                        variant={
                          o.status === "Nouvelle"
                            ? "accent"
                            : o.status === "Expédiée"
                              ? "success"
                              : "secondary"
                        }
                      >
                        {o.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold">Top produits</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/seller/products">
                Tous <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="divide-y">
            {TOP_PRODUCTS.map((p, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3">
                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </div>
                <div
                  className="size-10 shrink-0 rounded-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.sales} ventes</p>
                </div>
                <span className="text-sm font-semibold tabular-nums">{formatPrice(p.revenue)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Notifications strip */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="flex items-center gap-2 font-semibold">
            <Bell className="size-4 text-primary" /> Notifications
          </h2>
          <Button variant="ghost" size="sm">
            Tout marquer comme lu
          </Button>
        </div>
        <ul className="divide-y">
          {NOTIFICATIONS.map((n, i) => (
            <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm">
              <span
                className={`mt-1 size-2 shrink-0 rounded-full ${
                  n.kind === "stock" ? "bg-destructive" : n.kind === "review" ? "bg-accent" : "bg-success"
                }`}
              />
              <span className="flex-1">{n.text}</span>
              <span className="text-xs text-muted-foreground">{n.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
