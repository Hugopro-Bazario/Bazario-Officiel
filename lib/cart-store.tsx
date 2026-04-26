"use client"

import * as React from "react"
import { PRODUCTS } from "@/lib/data"

export type CartItem = {
  id: string // unique row id = `${productId}:${variantId}`
  productId: string
  productSlug: string
  variantId: string
  variantLabel: string
  sellerId: string
  title: string
  image: string
  price: number
  qty: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (productId: string, variantId: string, qty?: number) => void
  remove: (id: string) => void
  removeItem: (productId: string, variantId: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = React.createContext<CartContextValue | null>(null)

const STORAGE_KEY = "bazario:cart:v2"

type StoredItem = { productId: string; variantId: string; qty: number }

function readStorage(): StoredItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function denormalize(stored: StoredItem[]): CartItem[] {
  const out: CartItem[] = []
  for (const s of stored) {
    const product = PRODUCTS.find((p) => p.id === s.productId)
    if (!product) continue
    const variant = product.variants.find((v) => v.id === s.variantId) ?? product.variants[0]
    if (!variant) continue
    out.push({
      id: `${s.productId}:${s.variantId}`,
      productId: s.productId,
      productSlug: product.slug,
      variantId: variant.id,
      variantLabel: variant.label,
      sellerId: product.seller.id,
      title: product.title,
      image: product.images[0],
      price: variant.price,
      qty: s.qty,
    })
  }
  return out
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = React.useState<StoredItem[]>([])
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setStored(readStorage())
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  }, [stored, hydrated])

  const addItem = React.useCallback((productId: string, variantId: string, qty: number = 1) => {
    setStored((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.variantId === variantId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.variantId === variantId ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { productId, variantId, qty }]
    })
  }, [])

  const removeById = React.useCallback((id: string) => {
    setStored((prev) => prev.filter((i) => `${i.productId}:${i.variantId}` !== id))
  }, [])

  const removeItem = React.useCallback((productId: string, variantId: string) => {
    setStored((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)))
  }, [])

  const updateQty = React.useCallback((id: string, qty: number) => {
    setStored((prev) => {
      if (qty <= 0) return prev.filter((i) => `${i.productId}:${i.variantId}` !== id)
      return prev.map((i) => (`${i.productId}:${i.variantId}` === id ? { ...i, qty } : i))
    })
  }, [])

  const clear = React.useCallback(() => setStored([]), [])

  const items = React.useMemo(() => denormalize(stored), [stored])
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, remove: removeById, removeItem, updateQty, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
