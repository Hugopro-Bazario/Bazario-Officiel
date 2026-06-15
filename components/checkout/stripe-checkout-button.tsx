"use client"

import * as React from "react"
import { Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store"

export function StripeCheckoutButton({
  email,
  className,
  children,
}: {
  email?: string
  className?: string
  children?: React.ReactNode
}) {
  const { items } = useCart()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/checkout/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map((i) => ({ productId: i.productId, variantId: i.variantId, qty: i.qty })),
        }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Le paiement a échoué. Réessayez.")
      }
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : "Le paiement a échoué. Réessayez.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        size="xl"
        variant="accent"
        className={className}
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirection sécurisée…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            {children ?? "Payer avec Stripe"}
          </>
        )}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
