import Link from "next/link"
import { CheckCircle2, Download, Mail, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClearDigitalCart } from "@/components/checkout/clear-digital-cart"

type SessionSummary = {
  email: string | null
  amountTotal: number | null
  currency: string
  reference: string
  lineItems: { description: string; quantity: number }[]
}

async function loadSession(sessionId: string): Promise<SessionSummary | null> {
  try {
    // Import dynamique : n'échoue pas le rendu si Stripe n'est pas configuré.
    const { getStripe } = await import("@/lib/stripe/server")
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    })
    return {
      email: session.customer_details?.email ?? session.customer_email ?? null,
      amountTotal: session.amount_total != null ? session.amount_total / 100 : null,
      currency: (session.currency ?? "eur").toUpperCase(),
      reference: session.id.slice(-8).toUpperCase(),
      lineItems: (session.line_items?.data ?? []).map((i) => ({
        description: i.description ?? "Produit",
        quantity: i.quantity ?? 1,
      })),
    }
  } catch {
    return null
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; session_id?: string; sub?: string }>
}) {
  const { order, session_id, sub } = await searchParams
  const isSubscription = sub === "1"
  const summary = session_id ? await loadSession(session_id) : null
  const reference = summary?.reference ?? order ?? session_id?.slice(-8).toUpperCase() ?? "BZ-NEXUS"

  const formatPrice = (value: number, currency: string) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(value)

  return (
    <div className="container mx-auto px-4 py-16">
      <ClearDigitalCart />
      <Card className="mx-auto max-w-2xl p-10 text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-success/10">
          {isSubscription ? (
            <Crown className="size-10 text-accent" />
          ) : (
            <CheckCircle2 className="size-10 text-success" />
          )}
        </div>

        <h1 className="mb-3 font-display text-3xl font-bold">
          {isSubscription ? "Bienvenue dans Nexus+ !" : "Commande confirmée !"}
        </h1>
        <p className="mb-2 text-muted-foreground">
          {isSubscription
            ? "Votre abonnement est actif. Vos avantages et crédits IA sont débloqués."
            : "Merci pour votre achat. Vos produits sont disponibles immédiatement."}
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          Référence :{" "}
          <span className="font-mono font-semibold text-foreground">{reference}</span>
        </p>

        {summary && summary.lineItems.length > 0 && (
          <div className="mb-8 rounded-xl border p-5 text-left">
            <h2 className="mb-3 text-sm font-semibold">Récapitulatif</h2>
            <ul className="space-y-2 text-sm">
              {summary.lineItems.map((item, i) => (
                <li key={i} className="flex justify-between gap-3 text-muted-foreground">
                  <span>
                    {item.quantity} × {item.description}
                  </span>
                </li>
              ))}
            </ul>
            {summary.amountTotal != null && (
              <div className="mt-3 flex justify-between border-t pt-3 text-sm font-semibold">
                <span>Total</span>
                <span>{formatPrice(summary.amountTotal, summary.currency)}</span>
              </div>
            )}
          </div>
        )}

        <div className="mb-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="flex gap-3 rounded-lg border p-4">
            <Zap className="size-5 flex-shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium">Accès instantané</p>
              <p className="text-xs text-muted-foreground">
                Vos produits et licences sont disponibles dès maintenant dans votre espace.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border p-4">
            <Mail className="size-5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">Email de confirmation</p>
              <p className="text-xs text-muted-foreground">
                {summary?.email
                  ? `Liens et reçu envoyés à ${summary.email}.`
                  : "Liens de téléchargement et reçu envoyés par email."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href={isSubscription ? "/premium" : "/account/orders"}>
              {isSubscription ? "Gérer mon abonnement" : "Mes téléchargements"}
            </Link>
          </Button>
          <Button asChild size="lg" variant="accent">
            <Link href="/search">
              <Download className="size-4" />
              Explorer le catalogue
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
