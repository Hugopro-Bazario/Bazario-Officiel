import Image from "next/image"
import { AlertTriangle, ShieldCheck, X, Eye, Flag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"

const REPORTS = [
  {
    id: "r1",
    productSlug: products[0]?.slug,
    title: products[0]?.title ?? "Produit",
    image: products[0]?.images?.[0],
    reason: "Description trompeuse",
    detail: "L'acheteur indique que la mention 'cuir véritable' ne correspond pas au matériau reçu.",
    reportedBy: "12 utilisateurs",
    severity: "high" as const,
    time: "il y a 18 min",
  },
  {
    id: "r2",
    productSlug: products[1]?.slug,
    title: products[1]?.title ?? "Produit",
    image: products[1]?.images?.[0],
    reason: "Photos non conformes",
    detail: "Les visuels semblent provenir d'un autre site (vérification de copyright en cours).",
    reportedBy: "3 utilisateurs",
    severity: "medium" as const,
    time: "il y a 2h",
  },
  {
    id: "r3",
    productSlug: products[2]?.slug,
    title: products[2]?.title ?? "Produit",
    image: products[2]?.images?.[0],
    reason: "Avis suspects",
    detail: "Pic anormal d'avis 5 étoiles sur 24h (+412 %). À vérifier.",
    reportedBy: "Algorithme Bazario",
    severity: "low" as const,
    time: "il y a 5h",
  },
]

export default function AdminModeration() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Modération</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">File d&apos;attente</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {REPORTS.length} signalements actifs · SLA moyen : 2h12
        </p>
      </div>

      {/* Severity filters */}
      <div className="flex flex-wrap gap-2">
        {["Tous", "Haute priorité", "Moyenne", "Faible", "Auto-détectés"].map((label, i) => (
          <Button key={label} variant={i === 0 ? "default" : "outline"} size="sm">
            {label}
          </Button>
        ))}
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        {REPORTS.map((r) => (
          <Card key={r.id} className="overflow-hidden">
            <div className="grid gap-0 sm:grid-cols-[120px_1fr_auto]">
              {/* Image */}
              <div className="relative aspect-square sm:aspect-auto sm:h-full">
                {r.image && <Image src={r.image} alt={r.title} fill className="object-cover" />}
                <div
                  className={
                    "absolute left-2 top-2 flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider " +
                    (r.severity === "high"
                      ? "bg-destructive text-destructive-foreground"
                      : r.severity === "medium"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-foreground")
                  }
                >
                  <Flag className="size-2.5" />
                  {r.severity === "high" ? "Urgent" : r.severity === "medium" ? "Modéré" : "Faible"}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-semibold">{r.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {r.reason}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.detail}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <AlertTriangle className="size-3" />
                    Signalé par {r.reportedBy}
                  </span>
                  <span>· {r.time}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 border-t bg-muted/20 p-4 sm:flex-col sm:border-l sm:border-t-0 sm:p-5">
                <Button size="sm" className="flex-1 sm:flex-none">
                  <Eye className="mr-1.5 size-4" />
                  Examiner
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent sm:flex-none">
                  <ShieldCheck className="mr-1.5 size-4" />
                  Valider
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive sm:flex-none">
                  <X className="mr-1.5 size-4" />
                  Retirer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
