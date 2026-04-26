"use client"
import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronDown, SlidersHorizontal, Grid3x3, List, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { SearchFilters, type Filters } from "@/components/search/search-filters"
import { PRODUCTS, searchProducts } from "@/lib/data"

const DEFAULT_FILTERS: Filters = {
  categories: [],
  brands: [],
  rating: 0,
  freeShipping: false,
  verified: false,
  priceMin: 0,
  priceMax: 0,
}

const SORT_OPTIONS = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "popular", label: "Plus vendus" },
  { value: "newest", label: "Nouveautés" },
]

function SearchPageInner() {
  const params = useSearchParams()
  const router = useRouter()
  const query = params.get("q") ?? ""
  const initialCategory = params.get("c")

  const [filters, setFilters] = React.useState<Filters>({
    ...DEFAULT_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
  })
  const [sort, setSort] = React.useState("relevance")
  const [view, setView] = React.useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

  const allBrands = React.useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort(),
    [],
  )

  const baseResults = React.useMemo(() => searchProducts(query), [query])

  const filtered = React.useMemo(() => {
    let list = baseResults

    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category))
    }
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand))
    }
    if (filters.rating > 0) {
      list = list.filter((p) => p.rating >= filters.rating)
    }
    if (filters.priceMin > 0) {
      list = list.filter((p) => p.price >= filters.priceMin)
    }
    if (filters.priceMax > 0) {
      list = list.filter((p) => p.price <= filters.priceMax)
    }
    if (filters.verified) {
      list = list.filter((p) => p.seller.verified)
    }
    // freeShipping is informational in mock data; pass-through
    return list
  }, [baseResults, filters])

  const sorted = React.useMemo(() => {
    const list = [...filtered]
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price)
      case "price-desc":
        return list.sort((a, b) => b.price - a.price)
      case "rating":
        return list.sort((a, b) => b.rating - a.rating)
      case "popular":
        return list.sort((a, b) => b.sold - a.sold)
      case "newest":
        return list.sort((a, b) => (b.badges.includes("new") ? 1 : 0) - (a.badges.includes("new") ? 1 : 0))
      default:
        return list
    }
  }, [filtered, sort])

  function reset() {
    setFilters(DEFAULT_FILTERS)
  }

  const activeChips: { label: string; onRemove: () => void }[] = []
  filters.categories.forEach((c) => {
    activeChips.push({
      label: c,
      onRemove: () =>
        setFilters((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })),
    })
  })
  filters.brands.forEach((b) => {
    activeChips.push({
      label: b,
      onRemove: () =>
        setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })),
    })
  })
  if (filters.rating > 0)
    activeChips.push({
      label: `${filters.rating}★ et plus`,
      onRemove: () => setFilters((f) => ({ ...f, rating: 0 })),
    })
  if (filters.priceMax > 0 || filters.priceMin > 0)
    activeChips.push({
      label: `${filters.priceMin || 0} – ${filters.priceMax || "∞"} €`,
      onRemove: () => setFilters((f) => ({ ...f, priceMin: 0, priceMax: 0 })),
    })
  if (filters.verified)
    activeChips.push({
      label: "Vendeur vérifié",
      onRemove: () => setFilters((f) => ({ ...f, verified: false })),
    })

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="mb-3 text-xs text-muted-foreground" aria-label="Fil d'Ariane">
        <ol className="flex items-center gap-1">
          <li>
            <button onClick={() => router.push("/")} className="hover:text-foreground">
              Accueil
            </button>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">Recherche</li>
        </ol>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {query ? (
              <>
                Résultats pour <span className="text-primary">&laquo;{query}&raquo;</span>
              </>
            ) : (
              "Tous les produits"
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {sorted.length.toLocaleString("fr-FR")} produits trouvés
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtres
          </Button>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 rounded-md border border-input bg-background pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Trier"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Trier : {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
          </div>

          <div className="hidden gap-1 rounded-md border bg-card p-0.5 sm:inline-flex">
            <button
              onClick={() => setView("grid")}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-sm ${view === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Affichage grille"
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-sm ${view === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Affichage liste"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Filtres actifs :</span>
          {activeChips.map((chip, i) => (
            <button
              key={i}
              onClick={chip.onRemove}
              className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-0.5 text-xs hover:bg-muted"
            >
              {chip.label}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            onClick={reset}
            className="text-xs font-medium text-primary hover:underline"
          >
            Tout effacer
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <SearchFilters
            filters={filters}
            onChange={setFilters}
            brands={allBrands}
            onReset={reset}
          />
        </div>

        <div>
          {sorted.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <p className="text-base font-medium">Aucun produit ne correspond à vos critères.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Essayez d&apos;élargir votre recherche ou de modifier les filtres.
              </p>
              <Button onClick={reset} variant="outline" className="mt-4">
                Réinitialiser les filtres
              </Button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {sorted.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {sorted.map((p) => (
                <li key={p.id} className="rounded-lg border bg-card p-3">
                  <a href={`/p/${p.slug}`} className="flex gap-4">
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-md bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                      <h3 className="text-sm font-medium">{p.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {p.description}
                      </p>
                      <div className="mt-auto flex items-baseline gap-2">
                        <span className="text-lg font-bold">
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: p.currency,
                          }).format(p.price)}
                        </span>
                        {p.compareAtPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {new Intl.NumberFormat("fr-FR", {
                              style: "currency",
                              currency: p.currency,
                            }).format(p.compareAtPrice)}
                          </span>
                        )}
                        <Badge variant="secondary" className="ml-auto">
                          {p.seller.name}
                        </Badge>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <p className="text-base font-semibold">Filtres</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SearchFilters
                filters={filters}
                onChange={setFilters}
                brands={allBrands}
                onReset={reset}
              />
            </div>
            <div className="border-t p-4">
              <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                Voir les {sorted.length} résultats
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-12 text-center text-muted-foreground">Chargement…</div>}>
      <SearchPageInner />
    </Suspense>
  )
}
