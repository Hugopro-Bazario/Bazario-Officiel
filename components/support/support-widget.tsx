"use client"

import * as React from "react"
import Link from "next/link"
import {
  MessageCircle,
  X,
  Mail,
  Phone,
  Sparkles,
  Truck,
  Undo2,
  CreditCard,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const QUICK_TOPICS = [
  { icon: Truck, label: "Suivre ma commande", href: "/track" },
  { icon: Undo2, label: "Demander un retour", href: "/faq#retours" },
  { icon: CreditCard, label: "Question paiement", href: "/faq#paiement" },
  { icon: ShieldCheck, label: "Garanties Bazario", href: "/loyalty" },
]

export function SupportWidget() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fermer l'assistance" : "Ouvrir l'assistance"}
        className={cn(
          "fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg shadow-foreground/20 transition hover:scale-105 md:bottom-6 md:right-6 md:px-5 md:py-3.5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
        )}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">Aide</span>
            <span className="ml-1 hidden h-2 w-2 rounded-full bg-emerald-400 sm:inline-block" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Assistance Bazario"
          className="fixed bottom-36 right-4 z-40 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl md:bottom-24 md:right-6"
        >
          <header className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Bazario Concierge</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  En ligne — réponse en moins de 2 min
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="px-4 py-4">
            <p className="text-sm text-muted-foreground">
              Bonjour <span className="font-semibold text-foreground">!</span> Une équipe de
              vraies personnes en France et au Portugal est disponible 7 j/7 de 8 h à 23 h.
            </p>

            <ul className="mt-4 space-y-1.5">
              {QUICK_TOPICS.map((t) => {
                const Icon = t.icon
                return (
                  <li key={t.href}>
                    <Link
                      href={t.href}
                      className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition hover:border-foreground/40 hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span className="flex-1">{t.label}</span>
                      <span aria-hidden="true" className="text-muted-foreground">›</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="mailto:support@bazario-official.com"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-3 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                E-mail
              </a>
              <a
                href="tel:+33180000000"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Appel
              </a>
            </div>

            <p className="mt-4 text-center text-[11px] uppercase tracking-wide text-muted-foreground">
              Bazario Concierge · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
