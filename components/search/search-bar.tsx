"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Search,
  Clock,
  TrendingUp,
  X,
  Tag,
  Store,
  Package,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES, SELLERS, products, formatPrice } from "@/lib/data"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "bazario_recent_searches_v1"
const MAX_RECENT = 6

const POPULAR = [
  "lampe à poser",
  "casque sans fil",
  "sérum vitamine C",
  "sneakers",
  "table basse",
  "robe été",
] as const

const TRENDING_TAGS = [
  { label: "Made in France", icon: Sparkles },
  { label: "Sous 50 €", icon: Tag },
  { label: "Livraison express", icon: Package },
] as const

type Suggestion =
  | { kind: "product"; id: string; slug: string; title: string; price: number; image?: string; brand: string }
  | { kind: "category"; slug: string; name: string }
  | { kind: "seller"; slug: string; name: string; logo: string; rating: number }

export function SearchBar({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "")
  const [open, setOpen] = React.useState(false)
  const [recent, setRecent] = React.useState<string[]>([])
  const [activeIndex, setActiveIndex] = React.useState(-1)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Load recent
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as string[]
        if (Array.isArray(parsed)) setRecent(parsed.slice(0, MAX_RECENT))
      }
    } catch {
      // ignore
    }
  }, [])

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open])

  // Build suggestions
  const suggestions = React.useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []

    const matchedCategories = CATEGORIES.filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map<Suggestion>((c) => ({ kind: "category", slug: c.slug, name: c.name }))

    const matchedSellers = SELLERS.filter((s) => s.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map<Suggestion>((s) => ({
        kind: "seller",
        slug: s.slug,
        name: s.name,
        logo: s.logo,
        rating: s.rating,
      }))

    const matchedProducts = products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryPath.some((c) => c.toLowerCase().includes(q)),
      )
      .slice(0, 5)
      .map<Suggestion>((p) => ({
        kind: "product",
        id: p.id,
        slug: p.slug,
        title: p.title,
        price: p.price,
        image: p.images[0],
        brand: p.brand,
      }))

    return [...matchedCategories, ...matchedSellers, ...matchedProducts]
  }, [query])

  // Reset active index when suggestions change
  React.useEffect(() => {
    setActiveIndex(-1)
  }, [suggestions.length, query])

  function persistRecent(term: string) {
    const t = term.trim()
    if (!t) return
    setRecent((prev) => {
      const next = [t, ...prev.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, MAX_RECENT)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  function clearRecent() {
    setRecent([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  function submit(term: string) {
    const q = term.trim()
    if (q) persistRecent(q)
    setOpen(false)
    inputRef.current?.blur()
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search")
  }

  function go(s: Suggestion) {
    persistRecent(s.kind === "product" ? s.title : s.kind === "category" ? s.name : s.name)
    setOpen(false)
    inputRef.current?.blur()
    if (s.kind === "product") router.push(`/p/${s.slug}`)
    else if (s.kind === "category") router.push(`/c/${s.slug}`)
    else router.push(`/s/${s.slug}`)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false)
      inputRef.current?.blur()
      return
    }
    if (suggestions.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault()
      go(suggestions[activeIndex])
    }
  }

  const showEmptyState = open && query.trim().length < 2
  const showResults = open && suggestions.length > 0
  const showNoResults = open && query.trim().length >= 2 && suggestions.length === 0

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(query)
        }}
        role="search"
        className={variant === "desktop" ? "ml-2 hidden flex-1 items-center md:flex" : ""}
      >
        <div className="relative flex w-full">
          {variant === "desktop" && (
            <div className="hidden items-center rounded-l-md border border-r-0 border-input bg-secondary px-3 text-sm text-muted-foreground lg:flex">
              Tout
              <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </div>
          )}
          <div className="relative flex-1">
            {variant === "mobile" && (
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            )}
            <Input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              placeholder={
                variant === "desktop"
                  ? "Rechercher un produit, une marque, un vendeur…"
                  : "Rechercher sur Bazario…"
              }
              className={cn(
                variant === "desktop" && "rounded-none border-r-0 lg:rounded-none",
                variant === "mobile" && "pl-9",
              )}
              aria-label="Rechercher"
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls="search-suggestions"
            />
            {query && (
              <button
                type="button"
                aria-label="Effacer la recherche"
                onClick={() => {
                  setQuery("")
                  inputRef.current?.focus()
                }}
                className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          {variant === "desktop" && (
            <Button type="submit" className="rounded-l-none" aria-label="Lancer la recherche">
              <Search className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-1">Rechercher</span>
            </Button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {open && (
        <div
          id="search-suggestions"
          role="listbox"
          className={cn(
            "absolute left-0 right-0 z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border bg-popover shadow-2xl",
            variant === "desktop" && "lg:left-[unset] lg:right-0 lg:w-[640px]",
          )}
        >
          {showEmptyState && (
            <div className="space-y-5 p-5">
              {recent.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Clock className="size-3.5" />
                      Récentes
                    </p>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Effacer
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recent.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => submit(r)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm hover:bg-muted"
                      >
                        <Clock className="size-3 text-muted-foreground" />
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="size-3.5" />
                  Recherches populaires
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => submit(p)}
                      className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-sm hover:border-primary hover:bg-primary/5"
                    >
                      <TrendingUp className="size-3 text-accent" />
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tendances
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TRENDING_TAGS.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => submit(t.label)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent hover:bg-accent/20"
                      >
                        <Icon className="size-3" />
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="-mb-1 -mx-1 border-t pt-3 px-3">
                <Link
                  href="/discover"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
                >
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    Voir le journal Bazario
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>
          )}

          {showResults && (
            <ul className="divide-y">
              {suggestions.map((s, i) => {
                const isActive = i === activeIndex
                if (s.kind === "category") {
                  return (
                    <li key={`c-${s.slug}`}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => go(s)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                          isActive ? "bg-muted" : "hover:bg-muted/60",
                        )}
                      >
                        <span className="inline-flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Tag className="size-4" />
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-muted-foreground">Catégorie</p>
                        </div>
                        <ArrowUpRight className="size-4 text-muted-foreground" />
                      </button>
                    </li>
                  )
                }
                if (s.kind === "seller") {
                  return (
                    <li key={`s-${s.slug}`}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => go(s)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                          isActive ? "bg-muted" : "hover:bg-muted/60",
                        )}
                      >
                        <span className="relative inline-block size-9 overflow-hidden rounded-md bg-muted">
                          <Image src={s.logo} alt="" fill sizes="36px" className="object-cover" />
                        </span>
                        <div className="flex-1">
                          <p className="inline-flex items-center gap-1.5 text-sm font-medium">
                            {s.name}
                            <Badge variant="secondary" className="px-1 py-0 text-[10px]">
                              {s.rating.toFixed(1)}
                            </Badge>
                          </p>
                          <p className="text-xs text-muted-foreground">Vendeur</p>
                        </div>
                        <Store className="size-4 text-muted-foreground" />
                      </button>
                    </li>
                  )
                }
                return (
                  <li key={`p-${s.id}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => go(s)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                        isActive ? "bg-muted" : "hover:bg-muted/60",
                      )}
                    >
                      <span className="relative inline-block size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                        {s.image && (
                          <Image src={s.image} alt="" fill sizes="48px" className="object-cover" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{s.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.brand} · {formatPrice(s.price, "EUR")}
                        </p>
                      </div>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  </li>
                )
              })}
              <li className="bg-muted/40">
                <button
                  type="button"
                  onClick={() => submit(query)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium hover:bg-muted"
                >
                  <span className="inline-flex items-center gap-2">
                    <Search className="size-4 text-muted-foreground" />
                    Voir tous les résultats pour
                    <span className="font-bold">&quot;{query}&quot;</span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </button>
              </li>
            </ul>
          )}

          {showNoResults && (
            <div className="space-y-3 p-6 text-center">
              <div className="mx-auto inline-flex size-10 items-center justify-center rounded-full bg-muted">
                <Search className="size-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">
                Aucun résultat pour <span className="font-bold">&quot;{query}&quot;</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Essayez des mots plus génériques ou parcourez nos catégories.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {CATEGORIES.slice(0, 5).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/c/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs hover:bg-muted"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
