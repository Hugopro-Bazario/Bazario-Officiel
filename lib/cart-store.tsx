"use client"
import * as React from "react"
import { PRODUCTS, type Product, type Variant } from "@/lib/data"

export type CartItem = {
  productId: string
  variantId: string
  qty: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (productId: string, variantId: string, qty?: number) => void
  removeItem: (productId: string, variantId: string) => void
  updateQty: (productId: string, variantId: string, qty: number) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = React.createContext<CartContextValue | null>(null)

const STORAGE_KEY = "bazario:cart:v1"

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setItems(readStorage())
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = React.useCallback(
    (productId: string, variantId: string, qty: number = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === productId && i.variantId === variantId,
        )
        if (existing) {
          return prev.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, qty: i.qty + qty }
              : i,
          )
        }
        return [...prev, { productId, variantId, qty }]
      })
    },
    [],
  )

  const removeItem = React.useCallback((productId: string, variantId: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variantId === variantId),
      ),
    )
  }, [])

  const updateQty = React.useCallback(
    (productId: string, variantId: string, qty: number) => {
      if (qty <= 0) {
        setItems((prev) =>
          prev.filter(
            (i) => !(i.productId === productId && i.variantId === variantId),
          ),
        )
        return
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, qty }
            : i,
        ),
      )
    },
    [],
  )

  const clear = React.useCallback(() => setItems([]), [])

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const subtotal = items.reduce((sum, i) => {
    const p = PRODUCTS.find((pp) => pp.id === i.productId)
    if (!p) return sum
    const v = p.variants.find((vv) => vv.id === i.variantId)
    if (!v) return sum
    return sum + v.price * i.qty
  }, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clear, count, subtotal }}
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

export function resolveCartItem(item: CartItem): { product: Product; variant: Variant } | null {
  const product = PRODUCTS.find((p) => p.id === item.productId)
  if (!product) return null
  const variant = product.variants.find((v) => v.id === item.variantId)
  if (!variant) return null
  return { product, variant }
}
