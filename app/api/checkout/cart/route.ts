import { NextResponse, type NextRequest } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe/server"
import { PRODUCTS } from "@/lib/data"
import { computeCartBundleDiscount, getBundleProducts } from "@/lib/bundles"

export const runtime = "nodejs"

type IncomingItem = { productId: string; variantId: string; qty: number }

type CheckoutLineItem = {
  quantity: number
  price_data: {
    currency: string
    unit_amount: number
    product_data: {
      name: string
      description?: string
      metadata?: Record<string, string>
    }
  }
}

function readOrigin(request: NextRequest): string {
  const origin = request.headers.get("origin")
  if (origin) return origin.replace(/\/$/, "")
  return (process.env.APP_URL || "https://www.bazario-official.com").replace(/\/$/, "")
}

/**
 * Crée une session Stripe Checkout à partir du panier.
 *
 * Les prix sont TOUJOURS recalculés côté serveur depuis le catalogue : on ne
 * fait jamais confiance aux montants envoyés par le client. Les produits étant
 * numériques, aucune adresse de livraison n'est collectée.
 */
export async function POST(request: NextRequest) {
  let stripe: Stripe
  try {
    stripe = getStripe()
  } catch {
    return NextResponse.json(
      { error: "Le paiement n'est pas encore configuré. Ajoutez STRIPE_SECRET_KEY." },
      { status: 503 },
    )
  }

  let body: { items?: IncomingItem[]; email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  const incoming = Array.isArray(body.items) ? body.items : []
  if (incoming.length === 0) {
    return NextResponse.json({ error: "Votre panier est vide." }, { status: 400 })
  }

  type BuiltLine = { product: (typeof PRODUCTS)[number]; variant: (typeof PRODUCTS)[number]["variants"][number]; qty: number }
  const built: BuiltLine[] = []
  const metadataItems: { id: string; v: string; q: number }[] = []

  for (const raw of incoming) {
    const product = PRODUCTS.find((p) => p.id === raw.productId)
    if (!product) continue
    const variant = product.variants.find((v) => v.id === raw.variantId) ?? product.variants[0]
    if (!variant) continue
    const qty = Math.min(Math.max(Math.floor(Number(raw.qty) || 1), 1), 20)
    built.push({ product, variant, qty })
    metadataItems.push({ id: product.id, v: variant.id, q: qty })
  }

  if (built.length === 0) {
    return NextResponse.json({ error: "Aucun produit valide dans le panier." }, { status: 400 })
  }

  // Remise « packs » : si tous les produits d'un pack sont présents au tarif de
  // base, une unité de chacun est facturée au prorata du prix pack (répartition
  // exacte au centime, le reliquat va au dernier produit du pack).
  const { bundles } = computeCartBundleDiscount(
    built.map((b) => ({ productId: b.product.id, qty: b.qty, price: b.variant.price })),
  )
  const packUnitCents = new Map<string, { cents: number; bundleName: string }>()
  for (const bundle of bundles) {
    const items = getBundleProducts(bundle)
    const originalCents = items.reduce((sum, p) => sum + Math.round(p.price * 100), 0)
    const packCents = Math.round(bundle.price * 100)
    let allocated = 0
    items.forEach((p, i) => {
      const cents =
        i === items.length - 1
          ? packCents - allocated
          : Math.round((Math.round(p.price * 100) * packCents) / originalCents)
      allocated += cents
      packUnitCents.set(p.id, { cents, bundleName: bundle.name })
    })
  }

  const line_items: CheckoutLineItem[] = []
  const pushLine = (b: BuiltLine, quantity: number, unit_amount: number, description?: string) => {
    line_items.push({
      quantity,
      price_data: {
        currency: (b.product.currency || "EUR").toLowerCase(),
        unit_amount,
        product_data: {
          name: b.product.title,
          description: description ?? (b.variant.label !== b.product.title ? b.variant.label : undefined),
          metadata: { product_id: b.product.id, variant_id: b.variant.id, seller_id: b.product.seller.id },
        },
      },
    })
  }

  for (const b of built) {
    const fullUnit = Math.round(b.variant.price * 100)
    const pack = packUnitCents.get(b.product.id)
    const isBaseVariant = b.variant.price === b.product.price
    if (pack && isBaseVariant) {
      pushLine(b, 1, pack.cents, `${b.variant.label} · tarif pack « ${pack.bundleName} »`)
      if (b.qty > 1) pushLine(b, b.qty - 1, fullUnit)
    } else {
      pushLine(b, b.qty, fullUnit)
    }
  }

  const origin = readOrigin(request)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      // Produits digitaux : on collecte l'email pour la livraison numérique.
      customer_email: typeof body.email === "string" && body.email.includes("@") ? body.email : undefined,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?cancelled=true`,
      metadata: {
        kind: "digital_cart",
        items: JSON.stringify(metadataItems).slice(0, 480),
        bundles: bundles.map((b) => b.slug).join(","),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur Stripe inconnue."
    console.error(JSON.stringify({ scope: "checkout_cart", error: message }))
    return NextResponse.json({ error: "Impossible de créer la session de paiement." }, { status: 502 })
  }
}
