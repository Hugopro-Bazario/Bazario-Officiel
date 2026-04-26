"use client"
import * as React from "react"
import { Star, Truck, BadgeCheck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

type Filters = {
  categories: string[]
  brands: string[]
  rating: number
  freeShipping: boolean
  verified: boolean
  priceMin: number
  priceMax: number
}

const ALL_CATEGORIES = [
  { slug: "mode", name: "Mode" },
  { slug: "tech", name: "Tech" },
  { slug: "maison", name: "Maison" },
  { slug: "beaute", name: "Beauté" },
  { slug: "sport", name: "Sport" },
  { slug: "auto", name: "Auto & Moto" },
]

export function SearchFilters({
  filters,
  onChange,
  brands,
  onReset,
}: {
  filters: Filters
  onChange: (next: Filters) => void
  brands: string[]
  onReset: () => void
}) {
  function toggleArray(key: "categories" | "brands", value: string) {
    const current = filters[key]
    onChange({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    })
  }

  return (
    <aside className="rounded-lg border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Filtres</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-primary hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      <Separator className="my-4" />

      <FilterGroup label="Catégories">
        <div className="space-y-2">
          {ALL_CATEGORIES.map((cat) => (
            <label
              key={cat.slug}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => toggleArray("categories", cat.slug)}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </FilterGroup>

      <Separator className="my-4" />

      <FilterGroup label="Prix">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="numeric"
            value={filters.priceMin || ""}
            onChange={(e) =>
              onChange({ ...filters, priceMin: Number(e.target.value) || 0 })
            }
            placeholder="Min €"
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            aria-label="Prix minimum"
          />
          <input
            type="number"
            inputMode="numeric"
            value={filters.priceMax || ""}
            onChange={(e) =>
              onChange({ ...filters, priceMax: Number(e.target.value) || 0 })
            }
            placeholder="Max €"
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            aria-label="Prix maximum"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[50, 100, 200, 500].map((max) => (
            <button
              key={max}
              type="button"
              onClick={() => onChange({ ...filters, priceMin: 0, priceMax: max })}
              className="rounded-full border px-2.5 py-0.5 text-xs hover:border-primary hover:text-primary"
            >
              jusqu&apos;à {max} €
            </button>
          ))}
        </div>
      </FilterGroup>

      <Separator className="my-4" />

      <FilterGroup label="Marques">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleArray("brands", brand)}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              {brand}
            </label>
          ))}
        </div>
      </FilterGroup>

      <Separator className="my-4" />

      <FilterGroup label="Avis clients">
        <div className="space-y-2">
          {[4, 3, 2].map((min) => (
            <label key={min} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === min}
                onChange={() => onChange({ ...filters, rating: min })}
                className="h-4 w-4 accent-primary"
              />
              <span className="inline-flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < min
                        ? "h-3.5 w-3.5 fill-accent text-accent"
                        : "h-3.5 w-3.5 text-muted-foreground/40"
                    }
                  />
                ))}
              </span>
              <span className="text-muted-foreground">et plus</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <Separator className="my-4" />

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.freeShipping}
            onChange={(e) => onChange({ ...filters, freeShipping: e.target.checked })}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          <Truck className="h-4 w-4 text-muted-foreground" />
          Livraison gratuite
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.verified}
            onChange={(e) => onChange({ ...filters, verified: e.target.checked })}
            className="h-4 w-4 rounded border-input accent-primary"
          />
          <BadgeCheck className="h-4 w-4 text-muted-foreground" />
          Vendeur vérifié
        </label>
      </div>

      <Button variant="outline" className="mt-5 w-full" onClick={onReset}>
        Effacer les filtres
      </Button>
    </aside>
  )
}

function FilterGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{label}</p>
      {children}
    </div>
  )
}

export type { Filters }
