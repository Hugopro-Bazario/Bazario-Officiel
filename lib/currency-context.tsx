"use client"

import * as React from "react"
import { formatPrice as baseFormatPrice } from "@/lib/data"

/**
 * Indicative FX rates against EUR (mid-market, refreshed periodically).
 * In production these would come from an API; here we use a stable snapshot
 * so the demo can convert prices live without a network call.
 */
const RATES: Record<string, { rate: number; locale: string }> = {
  EUR: { rate: 1, locale: "fr-FR" },
  USD: { rate: 1.08, locale: "en-US" },
  GBP: { rate: 0.85, locale: "en-GB" },
  CHF: { rate: 0.96, locale: "de-CH" },
  CAD: { rate: 1.48, locale: "fr-CA" },
  AUD: { rate: 1.65, locale: "en-AU" },
  JPY: { rate: 168, locale: "ja-JP" },
  AED: { rate: 3.97, locale: "ar-AE" },
  SGD: { rate: 1.45, locale: "en-SG" },
}

type CurrencyState = {
  currency: string
  locale: string
  setCurrency: (c: string) => void
  format: (eurValue: number, baseCurrency?: string) => string
  convert: (eurValue: number, baseCurrency?: string) => number
}

const CurrencyCtx = React.createContext<CurrencyState | null>(null)

const STORAGE_KEY = "bazario-currency"

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<string>("EUR")

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored && RATES[stored]) setCurrencyState(stored)
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && RATES[e.newValue]) {
        setCurrencyState(e.newValue)
      }
    }
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<{ currency?: string }>).detail
      if (detail?.currency && RATES[detail.currency]) {
        setCurrencyState(detail.currency)
      }
    }
    window.addEventListener("storage", onStorage)
    window.addEventListener("bazario:currency-change", onCustom)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("bazario:currency-change", onCustom)
    }
  }, [])

  const setCurrency = React.useCallback((c: string) => {
    if (!RATES[c]) return
    setCurrencyState(c)
    try {
      window.localStorage.setItem(STORAGE_KEY, c)
      window.dispatchEvent(
        new CustomEvent("bazario:currency-change", { detail: { currency: c } })
      )
    } catch {}
  }, [])

  const value = React.useMemo<CurrencyState>(() => {
    const meta = RATES[currency] ?? RATES.EUR
    const convert = (eurValue: number, baseCurrency: string = "EUR") => {
      // Treat the source value as EUR-equivalent unless told otherwise
      const eur = baseCurrency === "EUR" ? eurValue : eurValue / (RATES[baseCurrency]?.rate ?? 1)
      return eur * meta.rate
    }
    const format = (eurValue: number, baseCurrency: string = "EUR") => {
      const converted = convert(eurValue, baseCurrency)
      return baseFormatPrice(converted, currency, meta.locale)
    }
    return { currency, locale: meta.locale, setCurrency, format, convert }
  }, [currency, setCurrency])

  return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>
}

export function useCurrency(): CurrencyState {
  const ctx = React.useContext(CurrencyCtx)
  if (!ctx) {
    // Safe fallback so non-wrapped server-rendered children don't crash.
    return {
      currency: "EUR",
      locale: "fr-FR",
      setCurrency: () => {},
      format: (v) => baseFormatPrice(v, "EUR", "fr-FR"),
      convert: (v) => v,
    }
  }
  return ctx
}

export const SUPPORTED_CURRENCIES = Object.keys(RATES)
