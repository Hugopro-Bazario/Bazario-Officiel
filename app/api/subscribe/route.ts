import { NextResponse, type NextRequest } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe/server"

export const runtime = "nodejs"

// Tarifs Nexus+ (en centimes). Utilisés en repli si aucun price ID Stripe n'est
// fourni via les variables d'environnement.
const PLANS = {
  monthly: { amount: 999, interval: "month" as const, label: "Bazario Nexus+ (mensuel)" },
  yearly: { amount: 9990, interval: "year" as const, label: "Bazario Nexus+ (annuel)" },
}

function readOrigin(request: NextRequest): string {
  const origin = request.headers.get("origin")
  if (origin) return origin.replace(/\/$/, "")
  return (process.env.APP_URL || "https://www.bazario-official.com").replace(/\/$/, "")
}

/**
 * Crée une session Stripe Checkout en mode abonnement pour Bazario Nexus+.
 * Si un price ID est configuré (STRIPE_PRICE_NEXUS_MONTHLY / _YEARLY) il est
 * utilisé ; sinon un prix récurrent est défini en ligne afin que l'abonnement
 * fonctionne dès l'ajout de la clé secrète Stripe.
 */
export async function POST(request: NextRequest) {
  let stripe: Stripe
  try {
    stripe = getStripe()
  } catch {
    return NextResponse.json(
      { error: "L'abonnement n'est pas encore configuré. Ajoutez STRIPE_SECRET_KEY." },
      { status: 503 },
    )
  }

  let body: { plan?: "monthly" | "yearly"; email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  const planKey = body.plan === "yearly" ? "yearly" : "monthly"
  const plan = PLANS[planKey]
  const configuredPrice =
    planKey === "yearly"
      ? process.env.STRIPE_PRICE_NEXUS_YEARLY
      : process.env.STRIPE_PRICE_NEXUS_MONTHLY

  const lineItem = configuredPrice
    ? { price: configuredPrice, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: plan.amount,
          recurring: { interval: plan.interval },
          product_data: { name: plan.label },
        },
      }

  const origin = readOrigin(request)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [lineItem],
      customer_email: typeof body.email === "string" && body.email.includes("@") ? body.email : undefined,
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 30,
        metadata: { plan: planKey, product: "nexus_plus" },
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&sub=1`,
      cancel_url: `${origin}/premium?cancelled=true`,
      metadata: { kind: "subscription", plan: planKey },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur Stripe inconnue."
    console.error(JSON.stringify({ scope: "subscribe", error: message }))
    return NextResponse.json({ error: "Impossible de créer la session d'abonnement." }, { status: 502 })
  }
}
