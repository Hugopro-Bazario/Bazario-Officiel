"use client"

import * as React from "react"

const STORAGE_KEY = "bazario_wishlist_v1"

type WishlistContextValue = {
  ids: string[]
  count: number
  has: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const WishlistContext = React.createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = React.useState<string[]>([])
  const [hydrated, setHydrated] = React.useState(false)

  // Hydrate from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as string[]
        if (Array.isArray(parsed)) {
          setIds(parsed.filter((x) => typeof x === "string"))
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  // Persist on change after first hydration
  React.useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // ignore
    }
  }, [ids, hydrated])

  const has = React.useCallback((id: string) => ids.includes(id), [ids])

  const toggle = React.useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]))
  }, [])

  const remove = React.useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const clear = React.useCallback(() => setIds([]), [])

  const value = React.useMemo<WishlistContextValue>(
    () => ({ ids, count: ids.length, has, toggle, remove, clear }),
    [ids, has, toggle, remove, clear],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist(): WishlistContextValue {
  const ctx = React.useContext(WishlistContext)
  if (!ctx) {
    // Fallback no-op store so the component does not crash if used outside the provider
    return {
      ids: [],
      count: 0,
      has: () => false,
      toggle: () => {},
      remove: () => {},
      clear: () => {},
    }
  }
  return ctx
}
