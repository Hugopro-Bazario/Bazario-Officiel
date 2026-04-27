import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  PackageCheck,
  RotateCcw,
  Truck,
  Warehouse as WarehouseIcon,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ORDERS,
  SHIPMENTS,
  WAREHOUSES,
  STOCK_MOVEMENTS,
  RETURNS,
  STATUS_LABEL,
  fmtDate,
  fmtEUR,
} from "@/lib/logistics"

export const metadata = {
  title: "Logistique — Seller Center | Bazario",
  description: "Vue d'ensemble logistique : entrepôts, expéditions, retours, mouvements de stock.",
}

export default function SellerLogisticsPage() {
  const totalOrders = ORDERS.length
  const toShip = ORDERS.filter((o) => o.status === "new" || o.status === "to_pack").length
  const inTransit = ORDERS.filter((o) => o.status === "shipped" || o.status === "in_transit").length
  const delivered30d = ORDERS.filter((o) => o.status === "delivered").length
  const totalSkus = WAREHOUSES.reduce((acc, w) => acc + w.skus, 0)
  const recentMovements = STOCK_MOVEMENTS.slice(0, 6)
  const activeShipments = SHIPMENTS.filter((s) => s.status !== "delivered")
  const openReturns = RETURNS.filter((r) => r.status !== "refunded" && r.status !== "rejected")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Centre logistique</h1>
          <p className="text-muted-foreground">Suivez vos entrepôts, expéditions, retours et stocks en temps réel.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/seller/shipments">
              <Truck className="size-4" />
              Toutes les expéditions
            </Link>
          </Button>
          <Button asChild>
            <Link href="/seller/dropshipping">
              <Boxes className="size-4" />
              Catalogue dropshipping
            </Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI icon={<PackageCheck className="size-5" />} label="À expédier" value={String(toShip)} accent="warning" hint={`${totalOrders} commandes 30 j`} />
        <KPI icon={<Truck className="size-5" />} label="En transit" value={String(inTransit)} accent="primary" hint="Suivi temps réel" />
        <KPI icon={<TrendingUp className="size-5" />} label="Livrées 30 j" value={String(delivered30d)} accent="success" hint="98 % en délai" />
        <KPI icon={<RotateCcw className="size-5" />} label="Retours ouverts" value={String(openReturns.length)} accent="muted" hint="2,1 % vs catégorie 4,8 %" />
      </div>

      {/* Warehouses */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Entrepôts ({WAREHOUSES.length})</h2>
          <span className="text-sm text-muted-foreground">{totalSkus.toLocaleString("fr-FR")} SKU stockés</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {WAREHOUSES.map((w) => (
            <Card key={w.id} className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <WarehouseIcon className="size-4 text-muted-foreground" />
                <h3 className="font-semibold">{w.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {w.city}, {w.country}
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Occupation</span>
                  <span className="font-semibold">{w.usagePercent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${Math.max(2, w.usagePercent)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                  <span>{w.skus.toLocaleString("fr-FR")} SKU</span>
                  <span>{w.capacityM3 > 0 ? `${w.capacityM3.toLocaleString("fr-FR")} m³` : "Dropship"}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Active shipments + Stock movements */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <header className="flex items-center justify-between border-b p-5">
            <h2 className="font-semibold">Expéditions en cours</h2>
            <Link href="/seller/shipments" className="text-sm font-medium text-primary hover:underline">
              Voir tout
            </Link>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Commande</th>
                  <th className="px-5 py-3 font-medium">Transporteur</th>
                  <th className="px-5 py-3 font-medium">Destination</th>
                  <th className="px-5 py-3 font-medium">ETA</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {activeShipments.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-mono text-xs">{s.orderNumber}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{s.carrier}</p>
                      <p className="text-xs text-muted-foreground">{s.service}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p>{s.destination}</p>
                      <p className="text-xs text-muted-foreground">{s.weightKg} kg · {s.dimsCm.l}×{s.dimsCm.w}×{s.dimsCm.h} cm</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{fmtDate(s.estimatedDelivery)}</td>
                    <td className="px-5 py-3">
                      <Badge variant="secondary">{s.status === "in_transit" ? "En transit" : "En cours"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <header className="flex items-center justify-between border-b p-5">
            <h2 className="font-semibold">Mouvements de stock</h2>
            <span className="text-xs text-muted-foreground">24h</span>
          </header>
          <ul className="divide-y">
            {recentMovements.map((m) => {
              const positive = m.qty > 0
              const isOut = m.type === "outbound"
              return (
                <li key={m.id} className="flex items-start gap-3 px-5 py-3">
                  <div
                    className={
                      "flex size-8 shrink-0 items-center justify-center rounded-full " +
                      (isOut ? "bg-destructive/10 text-destructive" : "bg-emerald-100 text-emerald-700")
                    }
                  >
                    {isOut ? <ArrowDownRight className="size-4" /> : <ArrowUpRight className="size-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.warehouse} · {labelForMv(m.type)} {m.refOrder ? `· ${m.refOrder}` : ""}
                    </p>
                  </div>
                  <span className={"text-sm font-semibold " + (positive ? "text-emerald-600" : "text-destructive")}>
                    {positive ? "+" : ""}
                    {m.qty}
                  </span>
                </li>
              )
            })}
          </ul>
        </Card>
      </section>

      {/* Returns */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Retours récents</h2>
          <Link href="/seller/returns" className="text-sm font-medium text-primary hover:underline">
            Tout voir
          </Link>
        </div>
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">RMA</th>
                <th className="px-5 py-3 font-medium">Commande</th>
                <th className="px-5 py-3 font-medium">Acheteur</th>
                <th className="px-5 py-3 font-medium">Motif</th>
                <th className="px-5 py-3 font-medium">Montant</th>
                <th className="px-5 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {RETURNS.map((r) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-3 font-mono text-xs">{r.orderNumber}</td>
                  <td className="px-5 py-3">{r.buyerName}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.reason}</td>
                  <td className="px-5 py-3 font-semibold">{fmtEUR(r.amount)}</td>
                  <td className="px-5 py-3">
                    <Badge
                      variant={
                        r.status === "refunded" ? "success" : r.status === "rejected" ? "destructive" : "secondary"
                      }
                    >
                      {STATUS_LABEL[r.status as keyof typeof STATUS_LABEL] ?? r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  )
}

function KPI({
  icon,
  label,
  value,
  accent,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent: "primary" | "success" | "warning" | "muted"
  hint: string
}) {
  const tone =
    accent === "primary"
      ? "bg-primary/10 text-primary"
      : accent === "success"
        ? "bg-emerald-100 text-emerald-700"
        : accent === "warning"
          ? "bg-amber-100 text-amber-700"
          : "bg-muted text-muted-foreground"
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className={"flex size-9 items-center justify-center rounded-full " + tone}>{icon}</span>
      </div>
      <p className="text-3xl font-bold leading-none">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </Card>
  )
}

function labelForMv(t: "inbound" | "outbound" | "transfer" | "adjust") {
  if (t === "inbound") return "Entrée stock"
  if (t === "outbound") return "Sortie commande"
  if (t === "transfer") return "Transfert"
  return "Ajustement"
}
