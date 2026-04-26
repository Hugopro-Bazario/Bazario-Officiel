"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cookie, Shield, BarChart3, Megaphone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Consent = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = "bazario_consent"
const COOKIE_VERSION = "v1"

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.version !== COOKIE_VERSION) return null
    return parsed.consent as Consent
  } catch {
    return null
  }
}

function writeConsent(consent: Consent) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: COOKIE_VERSION, consent, timestamp: Date.now() }),
  )
}

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const consent = readConsent()
    if (!consent) {
      const t = window.setTimeout(() => setOpen(true), 600)
      return () => window.clearTimeout(t)
    }
  }, [])

  // Allow re-opening from footer
  useEffect(() => {
    function handler() {
      setShowPreferences(true)
      setOpen(true)
    }
    window.addEventListener("bazario:open-cookies", handler)
    return () => window.removeEventListener("bazario:open-cookies", handler)
  }, [])

  if (!open) return null

  function acceptAll() {
    writeConsent({ necessary: true, analytics: true, marketing: true })
    setOpen(false)
    setShowPreferences(false)
  }

  function rejectAll() {
    writeConsent({ necessary: true, analytics: false, marketing: false })
    setOpen(false)
    setShowPreferences(false)
  }

  function savePreferences() {
    writeConsent({ necessary: true, analytics, marketing })
    setOpen(false)
    setShowPreferences(false)
  }

  return (
    <>
      {/* Backdrop only when preferences open */}
      {showPreferences && (
        <button
          aria-label="Fermer"
          onClick={() => setShowPreferences(false)}
          className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
        />
      )}

      <div
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-md"
      >
        <div className="rounded-2xl border border-border bg-background p-5 shadow-2xl shadow-foreground/10">
          {!showPreferences ? (
            <>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Cookie className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 id="cookie-title" className="font-display text-base font-semibold tracking-tight">
                    Bazario respecte votre vie privée
                  </h2>
                  <p id="cookie-desc" className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Nous utilisons des cookies pour faire fonctionner le site, mesurer son audience et personnaliser
                    votre expérience. Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.{" "}
                    <Link href="/legal/cookies" className="font-medium text-foreground underline underline-offset-4">
                      En savoir plus
                    </Link>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap">
                <Button variant="ghost" size="sm" onClick={() => setShowPreferences(true)} className="sm:flex-1">
                  Personnaliser
                </Button>
                <Button variant="outline" size="sm" onClick={rejectAll} className="sm:flex-1">
                  Tout refuser
                </Button>
                <Button size="sm" onClick={acceptAll} className="sm:flex-1">
                  Tout accepter
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-semibold tracking-tight">Personnaliser mes cookies</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Choisissez les catégories que vous autorisez.</p>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  aria-label="Fermer"
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2.5">
                <CookieRow
                  icon={Shield}
                  title="Strictement nécessaires"
                  description="Indispensables au fonctionnement du site (panier, session, sécurité)."
                  checked
                  disabled
                />
                <CookieRow
                  icon={BarChart3}
                  title="Mesure d'audience"
                  description="Statistiques anonymes pour améliorer le site (Google Analytics 4)."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CookieRow
                  icon={Megaphone}
                  title="Marketing"
                  description="Personnalisation des publicités sur les autres sites que vous visitez."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row">
                <Button variant="ghost" size="sm" onClick={rejectAll} className="sm:flex-1">
                  Tout refuser
                </Button>
                <Button size="sm" onClick={savePreferences} className="sm:flex-1">
                  Enregistrer mes choix
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function CookieRow({
  icon: Icon,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  icon: typeof Shield
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3 ${disabled ? "opacity-80" : "cursor-pointer hover:bg-muted/50"}`}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <span className="relative mt-1 inline-flex">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span className="block h-5 w-9 rounded-full bg-muted-foreground/30 transition peer-checked:bg-primary peer-disabled:opacity-60" />
        <span className="absolute left-0.5 top-0.5 block size-4 rounded-full bg-background shadow-sm transition peer-checked:translate-x-4" />
      </span>
    </label>
  )
}
