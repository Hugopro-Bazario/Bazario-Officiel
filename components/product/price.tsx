"use client"

import { cn } from "@/lib/utils"
import { useCurrency } from "@/lib/currency-context"

interface PriceProps {
  /** Source price expressed in the product's base currency (defaults to EUR). */
  value: number
  baseCurrency?: string
  className?: string
  /** Render strikethrough style for compare-at prices. */
  strike?: boolean
}

/**
 * Renders a price that automatically converts to the user's selected currency.
 * Server rendering uses the base currency (EUR) for SEO; the converted price is
 * applied client-side once the CurrencyProvider hydrates.
 */
export function Price({ value, baseCurrency = "EUR", className, strike = false }: PriceProps) {
  const { format } = useCurrency()
  return (
    <span className={cn("tabular-nums", strike && "line-through", className)}>
      {format(value, baseCurrency)}
    </span>
  )
}
