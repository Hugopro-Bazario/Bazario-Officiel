"use client"
import * as React from "react"
import type { Variant } from "@/lib/data"
import { cn } from "@/lib/utils"

export function VariantPicker({
  variants,
  value,
  onChange,
}: {
  variants: Variant[]
  value: string
  onChange: (id: string) => void
}) {
  // Group attributes (e.g. Couleur, Pointure) from variants
  const attrKeys = React.useMemo(() => {
    const set = new Set<string>()
    variants.forEach((v) => Object.keys(v.attrs).forEach((k) => set.add(k)))
    return Array.from(set)
  }, [variants])

  if (attrKeys.length === 0) return null

  return (
    <div className="space-y-4">
      {attrKeys.map((key) => {
        const options = Array.from(new Set(variants.map((v) => v.attrs[key]))).filter(Boolean)
        const selectedVariant = variants.find((v) => v.id === value)
        const selectedOption = selectedVariant?.attrs[key]

        return (
          <div key={key}>
            <p className="text-sm">
              <span className="font-medium">{key} : </span>
              <span className="text-muted-foreground">{selectedOption}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {options.map((opt) => {
                // Find a variant matching this option (and other selected attrs if possible)
                const candidate = variants.find((v) => v.attrs[key] === opt)
                if (!candidate) return null
                const isSelected = selectedVariant?.attrs[key] === opt
                const outOfStock = candidate.stock === 0

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={outOfStock}
                    onClick={() => onChange(candidate.id)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm transition-colors",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-input hover:border-primary/40",
                      outOfStock && "cursor-not-allowed opacity-40 line-through",
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
