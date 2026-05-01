import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockAddresses } from "@/lib/data"

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mes adresses</h2>
          <p className="text-sm text-muted-foreground">
            {mockAddresses.length} adresse{mockAddresses.length > 1 ? "s" : ""} enregistrée
            {mockAddresses.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Ajouter une adresse
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockAddresses.map((addr) => (
          <Card key={addr.id} className="p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span className="font-semibold">{addr.label}</span>
                {addr.isDefault && <Badge variant="accent">Par défaut</Badge>}
              </div>
              <div className="flex gap-1">
                <button className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <Pencil className="size-4" />
                </button>
                <button className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground">{addr.fullName}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>
                {addr.zip} {addr.city}
              </p>
              <p>{addr.country}</p>
              <p className="mt-1">{addr.phone}</p>
            </div>
            {!addr.isDefault && (
              <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
                Définir par défaut
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
