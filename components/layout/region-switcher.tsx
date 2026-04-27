"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Globe, X } from "lucide-react"
import { cn } from "@/lib/utils"

const COUNTRIES = [
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR" },
  { code: "BE", name: "Belgique", flag: "🇧🇪", currency: "EUR" },
  { code: "CH", name: "Suisse", flag: "🇨🇭", currency: "CHF" },
  { code: "DE", name: "Allemagne", flag: "🇩🇪", currency: "EUR" },
  { code: "IT", name: "Italie", flag: "🇮🇹", currency: "EUR" },
  { code: "ES", name: "Espagne", flag: "🇪🇸", currency: "EUR" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", currency: "EUR" },
  { code: "NL", name: "Pays-Bas", flag: "🇳🇱", currency: "EUR" },
  { code: "GB", name: "Royaume-Uni", flag: "🇬🇧", currency: "GBP" },
  { code: "US", name: "États-Unis", flag: "🇺🇸", currency: "USD" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "JP", name: "Japon", flag: "🇯🇵", currency: "JPY" },
] as const

const LANGUAGES = [
  { code: "fr", name: "Français" },
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ja", name: "日本語" },
] as const

const STORAGE_KEY = "bazario:region"

export function RegionSwitcher() {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState<string>("FR")
  const [language, setLanguage] = useState<string>("fr")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { country?: string; language?: string }
        if (parsed.country) setCountry(parsed.country)
        if (parsed.language) setLanguage(parsed.language)
      }
    } catch {
      /* noop */
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = original
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const current = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0]

  function persist(nextCountry: string, nextLanguage: string) {
    setCountry(nextCountry)
    setLanguage(nextLanguage)
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ country: nextCountry, language: nextLanguage }),
      )
    } catch {
      /* noop */
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 text-muted-foreground">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          <span aria-hidden="true">{current.flag}</span>
          <span>{current.code}</span>
          <span className="text-muted-foreground/60">/</span>
          <span className="uppercase">{language}</span>
          <ChevronDown className="h-3 w-3" />
          <span className="sr-only">Modifier la région et la langue</span>
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          {current.currency}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Préférences régionales"
          className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 p-4 backdrop-blur-sm md:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="relative w-full max-w-2xl rounded-2xl border bg-background p-6 shadow-xl md:p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Préférences régionales
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Bazario livre dans 42 pays. Choisissez votre destination, votre
                langue et votre devise — les prix et frais de port s&apos;ajustent
                automatiquement.
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pays / devise
                </h3>
                <ul className="mt-3 grid max-h-72 gap-1 overflow-auto pr-1">
                  {COUNTRIES.map((c) => (
                    <li key={c.code}>
                      <button
                        type="button"
                        onClick={() => persist(c.code, language)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2 text-left text-sm hover:border-border hover:bg-muted",
                          country === c.code && "border-foreground/20 bg-muted",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span aria-hidden="true">{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {c.currency}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Langue
                </h3>
                <ul className="mt-3 grid gap-1">
                  {LANGUAGES.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        onClick={() => persist(country, l.code)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2 text-left text-sm hover:border-border hover:bg-muted",
                          language === l.code && "border-foreground/20 bg-muted",
                        )}
                      >
                        <span>{l.name}</span>
                        <span className="text-xs uppercase text-muted-foreground">
                          {l.code}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-md bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                  Le déploiement multilingue complet est en cours. Pour
                  l&apos;instant l&apos;interface reste en français : votre choix
                  sera appliqué dès activation, sans nouvelle action de votre
                  part.
                </p>
              </section>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
