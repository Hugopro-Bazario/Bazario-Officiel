"use client"

import { useState } from "react"
import { Check, Clock, MapPin, Package, Truck, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Step = {
  icon: typeof Package
  label: string
  detail: string
  done: boolean
  current?: boolean
}

const DEMO_STEPS: Step[] = [
  {
    icon: Check,
    label: "Commande confirmée",
    detail: "Paiement validé · 24 avr. 2026 — 14:32",
    done: true,
  },
  {
    icon: Package,
    label: "Préparation chez le vendeur",
    detail: "Atelier Lumen · Lyon — 25 avr. 2026 — 09:11",
    done: true,
  },
  {
    icon: Truck,
    label: "En transit vers le hub Bazario",
    detail: "Hub Paris-Sud · arrivée 26 avr. 2026 — 08:45",
    done: true,
    current: true,
  },
  {
    icon: MapPin,
    label: "Tournée du livreur",
    detail: "Estimé le 27 avr. 2026 entre 09:00 et 13:00",
    done: false,
  },
  {
    icon: Check,
    label: "Livré",
    detail: "Signature électronique requise",
    done: false,
  },
]

export function TrackOrderForm() {
  const [order, setOrder] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "found">("idle")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!order.trim() || !email.trim()) return
    setStatus("loading")
    setTimeout(() => setStatus("found"), 700)
  }

  return (
    <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-8">
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="order">Numéro de commande</Label>
          <Input
            id="order"
            placeholder="BZR-2026-XXXX"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">E-mail de la commande</Label>
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-4 py-3 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {status === "loading" ? "Localisation…" : "Suivre ma commande"}
        </button>
        <p className="text-xs text-muted-foreground">
          Astuce : connecté à votre compte, le suivi est encore plus complet
          dans <span className="underline">Mes commandes</span>.
        </p>
      </form>

      {status === "found" && (
        <div className="mt-6 border-t pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Commande {order || "BZR-2026-AB12"}
          </p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight">
            Livraison estimée le 27 avr. 2026
          </p>
          <ol className="mt-5 space-y-4">
            {DEMO_STEPS.map((s) => (
              <li key={s.label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                    s.done
                      ? "border-foreground bg-foreground text-background"
                      : s.current
                        ? "border-foreground bg-background text-foreground"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {s.current ? (
                    <Clock className="h-3.5 w-3.5" />
                  ) : (
                    <s.icon className="h-3.5 w-3.5" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
