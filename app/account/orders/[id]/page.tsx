import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Package,
  Truck,
  CheckCircle2,
  ChevronLeft,
  Download,
  MessageSquare,
  MapPin,
  CreditCard,
  Phone,
  Copy,
  Star,
  ShieldCheck,
  Clock,
  Box,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockOrders, formatPrice, sellers } from "@/lib/data"

type Step = {
  key: string
  label: string
  description: string
  date?: string
  icon: typeof Package
  done: boolean
  current?: boolean
}

function buildSteps(status: string): Step[] {
  const all: Step[] = [
    {
      key: "ordered",
      label: "Commande confirmée",
      description: "Paiement validé. Bazario a notifié votre vendeur.",
      date: "Il y a 3 jours · 14:21",
      icon: CheckCircle2,
      done: true,
    },
    {
      key: "preparing",
      label: "Préparation par le vendeur",
      description: "Vos articles sont emballés et étiquetés en entrepôt.",
      date: "Il y a 2 jours · 09:08",
      icon: Box,
      done: status !== "pending",
      current: status === "pending",
    },
    {
      key: "shipped",
      label: "Expédié",
      description: "Pris en charge par notre transporteur partenaire.",
      date: status === "shipped" || status === "delivered" ? "Hier · 18:42" : undefined,
      icon: Truck,
      done: status === "shipped" || status === "delivered",
      current: status === "shipped",
    },
    {
      key: "out",
      label: "En cours de livraison",
      description: "Votre colis est dans le véhicule de livraison.",
      date: status === "delivered" ? "Aujourd'hui · 08:30" : undefined,
      icon: Truck,
      done: status === "delivered",
    },
    {
      key: "delivered",
      label: "Livré",
      description: "Colis remis au destinataire ou en point relais.",
      date: status === "delivered" ? "Aujourd'hui · 11:14" : undefined,
      icon: CheckCircle2,
      done: status === "delivered",
      current: status === "delivered",
    },
  ]
  return all
}

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = mockOrders.find((o) => o.id === id)
  if (!order) notFound()

  const steps = buildSteps(order.status)
  const currentIndex = steps.findIndex((s) => s.current)
  const progress = ((currentIndex + 1) / steps.length) * 100
  const sellerId = order.items[0]?.sellerId
  const seller =
    sellers.find(
      (s) =>
        s.id === sellerId ||
        s.slug === sellerId ||
        s.slug.includes(String(sellerId)) ||
        s.name.toLowerCase().includes(String(sellerId)),
    ) ?? sellers[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Retour aux commandes
        </Link>
      </div>

      {/* Hero header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">
                Commande
              </p>
              <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
                {order.id}
              </h1>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Passée le {order.date} · {order.items.length} article
                {order.items.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">
                Total
              </p>
              <p className="mt-1 text-3xl font-bold">{formatPrice(order.total)}</p>
              <Badge variant="secondary" className="mt-2 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
                {order.statusLabel}
              </Badge>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/20">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-primary-foreground/80">
              <span>Confirmée</span>
              <span>Livrée</span>
            </div>
          </div>
        </div>

        {/* Tracking ID strip */}
        {order.status !== "pending" && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/40 px-6 py-3 text-sm">
            <div className="flex items-center gap-3">
              <Truck className="size-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">N° de suivi DHL Express</p>
                <p className="font-mono font-semibold">JD0042901743FR</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="mr-1.5 size-3.5" />
                Copier
              </Button>
              <Button size="sm">Suivre en direct</Button>
            </div>
          </div>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left: timeline + items */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Suivi en temps réel</h2>
              <Badge variant="outline" className="gap-1.5">
                <span className="size-1.5 animate-soft-pulse rounded-full bg-success" />
                Mis à jour il y a 4 min
              </Badge>
            </div>

            <ol className="relative space-y-6 pl-2">
              {/* Vertical rail */}
              <div
                aria-hidden
                className="absolute left-[15px] top-3 bottom-3 w-px bg-border"
              />
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <li key={step.key} className="relative flex gap-4">
                    <span
                      className={
                        "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition " +
                        (step.done
                          ? "border-primary bg-primary text-primary-foreground"
                          : step.current
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border bg-background text-muted-foreground")
                      }
                    >
                      <Icon className="size-4" />
                    </span>
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p
                          className={
                            "text-sm font-semibold " +
                            (step.done || step.current ? "text-foreground" : "text-muted-foreground")
                          }
                        >
                          {step.label}
                        </p>
                        {step.date && (
                          <span className="text-xs font-medium text-muted-foreground">
                            {step.date}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* ETA */}
            <Separator className="my-6" />
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
              <Clock className="size-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Livraison estimée</p>
                <p className="text-sm text-muted-foreground">
                  Vendredi 1er mai · entre 9h et 13h
                </p>
              </div>
              <Button variant="outline" size="sm">
                Modifier le créneau
              </Button>
            </div>
          </Card>

          {/* Items */}
          <Card className="p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold">Articles ({order.items.length})</h2>
            <ul className="divide-y">
              {order.items.map((item, i) => (
                <li key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Vendu par <span className="font-medium text-foreground">{seller?.name ?? "Vendeur Bazario"}</span>
                    </p>
                    <div className="mt-2 flex items-baseline gap-3 text-sm">
                      <span className="font-semibold">{formatPrice(item.price)}</span>
                      <span className="text-muted-foreground">× {item.qty}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <p className="font-semibold">{formatPrice(item.price * item.qty)}</p>
                    {order.status === "delivered" && (
                      <Button variant="ghost" size="sm" className="text-primary">
                        <Star className="mr-1 size-3.5" />
                        Avis
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right: meta panels */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {/* Address */}
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">Adresse de livraison</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Hugo Pro
              <br />
              12 rue de la République, Apt 4B
              <br />
              75001 Paris, France
              <br />
              <span className="text-muted-foreground">+33 6 12 34 56 78</span>
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full bg-transparent">
              Modifier l&apos;adresse
            </Button>
          </Card>

          {/* Payment */}
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">Paiement</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-12 items-center justify-center rounded bg-foreground/90 font-mono text-[10px] font-bold text-background">
                VISA
              </div>
              <div>
                <p className="text-sm font-medium">Visa •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expire en 03/2028</p>
              </div>
            </div>
            <Separator className="my-4" />
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Sous-total</dt>
                <dd>{formatPrice(order.total - 9.9)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Livraison</dt>
                <dd>{formatPrice(9.9)}</dd>
              </div>
              <div className="flex justify-between font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </Card>

          {/* Seller */}
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">Vendeur</h3>
            </div>
            {seller && (
              <div className="flex items-center gap-3">
                <div className="relative size-10 overflow-hidden rounded-full bg-muted">
                  <Image src={seller.logo} alt={seller.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{seller.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-current text-accent" />
                    {seller.rating} · {seller.country}
                  </p>
                </div>
              </div>
            )}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-1.5 size-3.5" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="mr-1.5 size-3.5" />
                Appeler
              </Button>
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="space-y-2 p-5">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="mr-2 size-4" />
              Télécharger la facture (PDF)
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Package className="mr-2 size-4" />
              Demander un retour
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              Signaler un problème
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  )
}
