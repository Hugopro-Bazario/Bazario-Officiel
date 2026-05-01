"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, CreditCard, Lock, MapPin, Package, ShieldCheck, Truck } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatPrice, sellers } from "@/lib/data"

type Step = "address" | "shipping" | "payment" | "review"

const STEPS: { id: Step; label: string; icon: typeof MapPin }[] = [
  { id: "address", label: "Adresse", icon: MapPin },
  { id: "shipping", label: "Livraison", icon: Truck },
  { id: "payment", label: "Paiement", icon: CreditCard },
  { id: "review", label: "Confirmation", icon: CheckCircle2 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clear } = useCart()
  const [step, setStep] = useState<Step>("address")
  const [placing, setPlacing] = useState(false)

  const itemsBySeller = useMemo(() => {
    const map = new Map<string, typeof items>()
    for (const item of items) {
      const list = map.get(item.sellerId) ?? []
      list.push(item)
      map.set(item.sellerId, list)
    }
    return Array.from(map.entries()).map(([sellerId, list]) => ({
      seller: sellers.find((s) => s.id === sellerId),
      items: list,
      subtotal: list.reduce((acc, it) => acc + it.price * it.qty, 0),
    }))
  }, [items])

  const shipping = items.length > 0 ? (subtotal > 50 ? 0 : 4.99 * itemsBySeller.length) : 0
  const total = subtotal + shipping

  const currentStepIndex = STEPS.findIndex((s) => s.id === step)

  function next() {
    const nextIdx = currentStepIndex + 1
    if (nextIdx < STEPS.length) setStep(STEPS[nextIdx].id)
  }

  function back() {
    const prevIdx = currentStepIndex - 1
    if (prevIdx >= 0) setStep(STEPS[prevIdx].id)
  }

  async function placeOrder() {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1200))
    const orderId = `BZ-${Date.now().toString().slice(-8)}`
    clear()
    router.push(`/checkout/success?order=${orderId}`)
  }

  if (items.length === 0 && !placing) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Votre panier est vide</h1>
        <Button asChild>
          <Link href="/">Retour à la boutique</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Finaliser ma commande</h1>

      {/* Stepper */}
      <ol className="mb-8 flex items-center justify-between gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const active = i === currentStepIndex
          const done = i < currentStepIndex
          return (
            <li key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex size-10 items-center justify-center rounded-full border-2 transition-colors ${
                    done
                      ? "border-success bg-success text-white"
                      : active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {done ? <CheckCircle2 className="size-5" /> : <Icon className="size-5" />}
                </div>
                <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 ${done ? "bg-success" : "bg-border"}`} />
              )}
            </li>
          )
        })}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          {step === "address" && <AddressStep onNext={next} />}
          {step === "shipping" && <ShippingStep onNext={next} onBack={back} />}
          {step === "payment" && <PaymentStep onNext={next} onBack={back} />}
          {step === "review" && (
            <ReviewStep
              itemsBySeller={itemsBySeller}
              total={total}
              onBack={back}
              onPlaceOrder={placeOrder}
              placing={placing}
            />
          )}
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Votre commande</h2>
            <ul className="mb-4 space-y-3">
              {items.slice(0, 4).map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative size-14 flex-shrink-0 overflow-hidden rounded bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="line-clamp-2 font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.variantLabel}</p>
                  </div>
                  <span className="text-xs font-semibold">{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
              {items.length > 4 && (
                <li className="text-center text-xs text-muted-foreground">+ {items.length - 4} autres articles</li>
              )}
            </ul>
            <Separator className="my-4" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">{formatPrice(total)}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              Paiement 100% sécurisé
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function AddressStep({ onNext }: { onNext: () => void }) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Adresse de livraison</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onNext()
        }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <Field label="Prénom" required>
          <Input defaultValue="Hugo" required />
        </Field>
        <Field label="Nom" required>
          <Input defaultValue="Pro" required />
        </Field>
        <Field label="Adresse" required className="sm:col-span-2">
          <Input placeholder="12 rue de la République" required />
        </Field>
        <Field label="Complément (facultatif)" className="sm:col-span-2">
          <Input placeholder="Apt, étage…" />
        </Field>
        <Field label="Code postal" required>
          <Input placeholder="75001" required />
        </Field>
        <Field label="Ville" required>
          <Input placeholder="Paris" required />
        </Field>
        <Field label="Pays" required className="sm:col-span-2">
          <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option>France</option>
            <option>Belgique</option>
            <option>Suisse</option>
            <option>Canada</option>
            <option>États-Unis</option>
          </select>
        </Field>
        <Field label="Téléphone" required className="sm:col-span-2">
          <Input type="tel" placeholder="+33 6 12 34 56 78" required />
        </Field>
        <div className="sm:col-span-2 flex justify-end">
          <Button type="submit" size="lg">
            Continuer
          </Button>
        </div>
      </form>
    </Card>
  )
}

function ShippingStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState("standard")
  const options = [
    { id: "standard", label: "Standard", time: "3-5 jours ouvrés", price: "Gratuite" },
    { id: "express", label: "Express", time: "1-2 jours ouvrés", price: "+ 7,90 €" },
    { id: "premium", label: "Bazario Premium", time: "Demain avant 18h", price: "+ 12,90 €" },
  ]
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Mode de livraison</h2>
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-colors ${
              selected === opt.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
              className="size-4 accent-primary"
            />
            <Truck className="size-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">{opt.label}</p>
              <p className="text-sm text-muted-foreground">{opt.time}</p>
            </div>
            <span className="font-semibold">{opt.price}</span>
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Retour
        </Button>
        <Button size="lg" onClick={onNext}>
          Continuer
        </Button>
      </div>
    </Card>
  )
}

function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [method, setMethod] = useState("card")
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Paiement</h2>
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { id: "card", label: "Carte" },
          { id: "paypal", label: "PayPal" },
          { id: "applepay", label: "Apple Pay" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`rounded-lg border-2 p-4 text-sm font-medium transition-colors ${
              method === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {method === "card" && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onNext()
          }}
          className="grid gap-4"
        >
          <Field label="Numéro de carte" required>
            <Input placeholder="1234 5678 9012 3456" required maxLength={19} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiration" required>
              <Input placeholder="MM/AA" required />
            </Field>
            <Field label="CVV" required>
              <Input placeholder="123" required maxLength={4} />
            </Field>
          </div>
          <Field label="Nom sur la carte" required>
            <Input placeholder="HUGO PRO" required />
          </Field>
          <div className="flex items-center gap-2 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-success" />
            Vos données sont chiffrées et sécurisées (3-D Secure)
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="ghost" onClick={onBack}>
              Retour
            </Button>
            <Button type="submit" size="lg">
              Vérifier la commande
            </Button>
          </div>
        </form>
      )}

      {method !== "card" && (
        <div className="space-y-4">
          <p className="rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
            Vous serez redirigé vers {method === "paypal" ? "PayPal" : "Apple Pay"} pour finaliser votre paiement en
            toute sécurité.
          </p>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={onBack}>
              Retour
            </Button>
            <Button size="lg" onClick={onNext}>
              Continuer
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

type SellerGroup = {
  seller: (typeof sellers)[number] | undefined
  items: ReturnType<typeof useCart>["items"]
  subtotal: number
}

function ReviewStep({
  itemsBySeller,
  total,
  onBack,
  onPlaceOrder,
  placing,
}: {
  itemsBySeller: SellerGroup[]
  total: number
  onBack: () => void
  onPlaceOrder: () => void
  placing: boolean
}) {
  return (
    <Card className="p-6">
      <h2 className="mb-2 text-xl font-semibold">Vérifiez votre commande</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Votre commande sera répartie en {itemsBySeller.length} colis selon les vendeurs.
      </p>

      <div className="space-y-4">
        {itemsBySeller.map(({ seller, items, subtotal }) => (
          <div key={seller?.id} className="rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="size-4 text-muted-foreground" />
                <span className="font-medium">{seller?.name}</span>
                {seller?.verified && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <ShieldCheck className="size-3" />
                    Vérifié
                  </Badge>
                )}
              </div>
              <span className="text-sm font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <ul className="space-y-2 text-sm">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-2 text-muted-foreground">
                  <span className="line-clamp-1">
                    {item.qty} × {item.title}
                  </span>
                  <span className="flex-shrink-0 font-medium text-foreground">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="flex items-baseline justify-between">
        <span className="text-lg font-semibold">Montant total</span>
        <span className="text-3xl font-bold">{formatPrice(total)}</span>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={onBack} disabled={placing}>
          Retour
        </Button>
        <Button size="lg" onClick={onPlaceOrder} disabled={placing}>
          {placing ? "Traitement…" : "Confirmer et payer"}
        </Button>
      </div>
    </Card>
  )
}

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {children}
    </label>
  )
}
