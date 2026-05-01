import Link from "next/link"
import { CheckCircle2, Package, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const { order } = await searchParams
  const orderId = order ?? "BZ-00000000"

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="mx-auto max-w-2xl p-10 text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="size-10 text-success" />
        </div>
        <h1 className="mb-3 text-3xl font-bold">Commande confirmée !</h1>
        <p className="mb-2 text-muted-foreground">Merci pour votre achat sur Bazario.</p>
        <p className="mb-8 text-sm text-muted-foreground">
          Numéro de commande :{" "}
          <span className="font-mono font-semibold text-foreground">{orderId}</span>
        </p>

        <div className="mb-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="flex gap-3 rounded-lg border p-4">
            <Mail className="size-5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">Confirmation par email</p>
              <p className="text-xs text-muted-foreground">
                Vous recevrez un récapitulatif détaillé sous quelques minutes.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border p-4">
            <Package className="size-5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">Suivi de livraison</p>
              <p className="text-xs text-muted-foreground">
                Vos colis sont préparés. Vous recevrez les liens de suivi par vendeur.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/account/orders">Voir mes commandes</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/">Continuer mes achats</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
