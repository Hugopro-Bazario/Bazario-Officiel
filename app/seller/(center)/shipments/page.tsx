import { Download, Filter, MapPin, Printer, Search, Truck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SHIPMENTS, computeRates, fmtDate, fmtDateTime, fmtEUR } from "@/lib/logistics"

export const metadata = {
  title: "Expéditions — Seller Center | Bazario",
  description: "Gérez les étiquettes, le suivi colis et les transporteurs.",
}

export default function ShipmentsPage() {
  // Demo: a fresh quote for a 1.2 kg package to FR
  const sampleRates = computeRates(1.2, "FR")
  const sampleRatesEU = computeRates(2.4, "DE")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Expéditions</h1>
          <p className="text-muted-foreground">Étiquettes, suivi temps réel, devis transporteurs en un clic.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="size-4" />
            Exporter CSV
          </Button>
          <Button>
            <Truck className="size-4" />
            Nouvelle expédition
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Numéro de commande, tracking, destination…" className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          Filtrer
        </Button>
        <div className="ml-auto flex flex-wrap gap-2">
          {["Tous", "Étiquette créée", "En transit", "Livrés", "Incidents"].map((l, i) => (
            <Button key={l} size="sm" variant={i === 0 ? "default" : "outline"}>
              {l}
            </Button>
          ))}
        </div>
      </div>

      {/* Rate shopping */}
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Devis transporteurs en direct</h2>
            <p className="text-sm text-muted-foreground">
              Tarifs négociés Bazario, mise à jour toutes les 15 min via les API DPD, Colissimo, Mondial Relay, Chronopost,
              DHL Express, FedEx, UPS.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Personnaliser
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <RateBlock title="Colis 1,2 kg → France" rates={sampleRates} />
          <RateBlock title="Colis 2,4 kg → Allemagne" rates={sampleRatesEU} />
        </div>
      </Card>

      {/* Shipments table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Tracking</th>
                <th className="px-5 py-3 font-medium">Commande</th>
                <th className="px-5 py-3 font-medium">Transporteur</th>
                <th className="px-5 py-3 font-medium">Trajet</th>
                <th className="px-5 py-3 font-medium">Poids</th>
                <th className="px-5 py-3 font-medium">Coût</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SHIPMENTS.map((s) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{s.tracking}</td>
                  <td className="px-5 py-3 font-mono text-xs">{s.orderNumber}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{s.carrier}</p>
                    <p className="text-xs text-muted-foreground">{s.service}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="flex items-center gap-1 text-xs">
                      <MapPin className="size-3 text-muted-foreground" />
                      {s.origin}
                    </p>
                    <p className="flex items-center gap-1 pt-1 text-xs">
                      <MapPin className="size-3 text-emerald-600" />
                      {s.destination}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{s.weightKg} kg</td>
                  <td className="px-5 py-3 font-semibold">{fmtEUR(s.cost)}</td>
                  <td className="px-5 py-3">
                    <Badge
                      variant={
                        s.status === "delivered"
                          ? "success"
                          : s.status === "exception"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {labelForStatus(s.status)}
                    </Badge>
                    <p className="mt-1 text-xs text-muted-foreground">ETA {fmtDate(s.estimatedDelivery)}</p>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Printer className="size-4" />
                        Étiquette
                      </Button>
                      <Button size="sm" variant="outline">
                        Suivi
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tracking timeline of last shipment */}
      <Card className="p-5">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Suivi détaillé · {SHIPMENTS[0].tracking}</h2>
            <p className="text-sm text-muted-foreground">
              {SHIPMENTS[0].carrier} · {SHIPMENTS[0].origin} → {SHIPMENTS[0].destination}
            </p>
          </div>
          <Badge variant="secondary">{labelForStatus(SHIPMENTS[0].status)}</Badge>
        </header>
        <ol className="space-y-4">
          {SHIPMENTS[0].events.map((e, idx) => (
            <li key={idx} className="flex gap-3">
              <div className="relative">
                <span className="block size-3 rounded-full bg-primary" />
                {idx < SHIPMENTS[0].events.length - 1 && (
                  <span className="absolute left-1/2 top-3 h-12 w-px -translate-x-1/2 bg-border" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium">{e.label}</p>
                <p className="text-xs text-muted-foreground">
                  {fmtDateTime(e.at)} · {e.location}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}

function RateBlock({ title, rates }: { title: string; rates: ReturnType<typeof computeRates> }) {
  const cheapest = rates[0]
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <ul className="space-y-2">
        {rates.map((r) => {
          const isBest = r.carrier === cheapest.carrier && r.service === cheapest.service
          return (
            <li
              key={`${r.carrier}-${r.service}`}
              className={
                "flex items-center justify-between rounded-md border bg-card p-3 " +
                (isBest ? "ring-2 ring-primary" : "")
              }
            >
              <div>
                <p className="text-sm font-medium">
                  {r.carrier} <span className="text-muted-foreground">· {r.service}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.estimatedDays}
                  {r.insurance ? " · assuré" : ""}
                  {r.pickup ? " · enlèvement" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{fmtEUR(r.price)}</p>
                {isBest && <span className="text-[10px] font-semibold uppercase text-primary">Recommandé</span>}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function labelForStatus(s: string) {
  const map: Record<string, string> = {
    label_created: "Étiquette créée",
    ready_for_pickup: "Prête à enlever",
    picked_up: "Prise en charge",
    in_transit: "En transit",
    out_for_delivery: "En tournée",
    delivered: "Livrée",
    exception: "Incident",
  }
  return map[s] ?? s
}
