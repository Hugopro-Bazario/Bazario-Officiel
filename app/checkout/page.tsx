"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Lock, ShieldCheck, Zap, Infinity as InfinityIcon, Mail } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { StripeCheckoutButton } from "@/components/checkout/stripe-checkout-button"
import { formatPrice } from "@/lib/data"

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [email, setEmail] = React.useState("")

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Votre panier est vide</h1>
        <p className="mb-6 text-muted-foreground">Découvrez nos produits digitaux et services IA.</p>
        <Button asChild variant="accent">
          <Link href="/search">Explorer le catalogue</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 font-display text-3xl font-bold tracking-tight">Finaliser ma commande</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Paiement sécurisé par Stripe. Vos produits sont livrés instantanément après le paiement.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-1 text-lg font-semibold">Livraison numérique</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Indiquez l&apos;email où recevoir vos accès et liens de téléchargement.
            </p>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Adresse email</span>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="pl-9"
                />
              </div>
            </label>

            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              <Perk icon={Zap} label="Accès instantané" />
              <Perk icon={InfinityIcon} label="Mises à jour à vie" />
              <Perk icon={ShieldCheck} label="Garantie 14 jours" />
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Articles ({items.length})</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative size-16 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                    <p className="text-xs text-muted-foreground">Quantité : {item.qty}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Récapitulatif</h2>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span className="text-accent">Instantanée · 0 €</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="mb-5 flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold">{formatPrice(subtotal)}</span>
            </div>

            <StripeCheckoutButton email={email} className="w-full">
              Payer {formatPrice(subtotal)}
            </StripeCheckoutButton>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              Paiement chiffré — Visa, Mastercard, Apple&nbsp;Pay, Google&nbsp;Pay
            </div>
            <Badge variant="secondary" className="mt-4 w-full justify-center gap-1.5 py-1.5">
              <ShieldCheck className="size-3.5" />
              Propulsé par Stripe
            </Badge>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function Perk({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <li className="flex items-center gap-2 rounded-lg border bg-secondary/30 px-3 py-2 text-xs font-medium">
      <Icon className="h-4 w-4 text-accent" />
      {label}
    </li>
  )
}
