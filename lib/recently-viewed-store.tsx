"use client"

import * as React from "react"

type Ctx = {
  slugs: string[]
  push: (slug: string) => void
  clear: () => void
}

const STORAGE_KEY = "bazario_recently_viewed"
const MAX_ITEMS = 12

const RecentlyViewedContext = React.createContext<Ctx | null>(null)

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = React.useState<string[]>([])

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setSlugs(parsed.filter((s) => typeof s === "string").slice(0, MAX_ITEMS))
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const persist = React.useCallback((next: string[]) => {
    setSlugs(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
  }, [])

  const push = React.useCallback(
    (slug: string) => {
      if (!slug) return
      setSlugs((current) => {
        const filtered = current.filter((s) => s !== slug)
        const next = [slug, ...filtered].slice(0, MAX_ITEMS)
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [],
  )

  const clear = React.useCallback(() => {
    persist([])
  }, [persist])

  const value = React.useMemo(() => ({ slugs, push, clear }), [slugs, push, clear])

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>
}

export function useRecentlyViewed() {
  const ctx = React.useContext(RecentlyViewedContext)
  if (!ctx) {
    return { slugs: [], push: () => {}, clear: () => {} } as Ctx
  }
  return ctx
}
