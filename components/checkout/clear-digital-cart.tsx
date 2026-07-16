"use client"

import { useEffect } from "react"
import { useCart } from "@/lib/cart-store"

/**
 * Vide le panier (store Context) une fois la commande confirmée.
 */
export function ClearDigitalCart() {
  const { clear } = useCart()
  useEffect(() => {
    clear()
  }, [clear])
  return null
}
