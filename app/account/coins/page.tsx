import { Coins, ArrowUpRight, ArrowDownRight, Gift, ShoppingBag, Star, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Bazario Coins — Mon programme de fidélité" }

const HISTORY = [
  { id: 1, type: "earn" as const, label: "Commande BZ-20264102", amount: +413, date: "12 avr. 2026" },
  { id: 2, type: "earn" as const, label: "Avis vérifié déposé", amount: +50, date: "10 avr. 2026" },
  { id: 3, type: "spend" as const, label: "Code promo COINS-25", amount: -250, date: "5 avr. 2026" },
  { id: 4, type: "earn" as const, label: "Commande BZ-20264087", amount: +219, date: "8 avr. 2026" },
  { id: 5, type: "earn" as const, label: "Bonus parrainage Léa M.", amount: +500, date: "1 avr. 2026" },
  { id: 6, type: "earn" as const, label: "Commande BZ-20264055", amount: +78, date: "2 avr. 2026" },
]

const REWARDS = [
  { id: "r1", title: "5€ de réduction", cost: 500, icon: Gift, desc: "À utiliser dès 30€ d'achat" },
  { id: "r2", title: "15€ de réduction", cost: 1500, icon: Gift, desc: "À utiliser dès 80€ d'achat" },
  { id: "r3", title: "Livraison express offerte", cost: 200, icon: Truck, desc: "Sur votre prochaine commande" },
  { id: "r4", title: "1 mois Premium offert", cost: 800, icon: Star, desc: "Activation immédiate" },
  { id: "r5", title: "Bon d'achat 50€", cost: 5000, icon: ShoppingBag, desc: "Sans minimum d'achat" },
]

export default function CoinsPage() {
  const balance = 1460
  const monthEarned = 760
  const nextTier = 2000
  const tierProgress = (balance / nextTier) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Bazario Coins</h1>
        <p className="text-muted-foreground">Gagnez des coins à chaque achat et échangez-les contre des récompenses.</p>
      </div>

      {/* Balance card */}
      <div className="overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary-foreground/70">Solde actuel</p>
            <div className="mt-2 flex items-center gap-3">
              <Coins className="h-8 w-8 text-accent" />
              <span className="font-display text-5xl font-bold tabular-nums">{balance.toLocaleString("fr-FR")}</span>
              <span className="text-lg text-primary-foreground/70">coins</span>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Soit environ {(balance / 100).toFixed(2)}€ de pouvoir d&apos;achat.
            </p>
          </div>
          <Badge className="bg-accent text-accent-foreground">Niveau Argent</Badge>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-primary-foreground/70">
            <span>Argent</span>
            <span>{balance} / {nextTier} coins jusqu&apos;à Or</span>
            <span>Or</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${tierProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={ArrowUpRight} label="Gagnés ce mois" value={`+${monthEarned}`} tone="success" />
        <StatCard icon={ArrowDownRight} label="Dépensés ce mois" value="-250" tone="destructive" />
        <StatCard icon={Star} label="Avantage Premium" value="x2 cashback" tone="accent" />
      </div>

      {/* Rewards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Récompenses disponibles</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Échangez vos coins en un clic.</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REWARDS.map((r) => {
              const Icon = r.icon
              const canRedeem = balance >= r.cost
              return (
                <div key={r.id} className="rounded-2xl border bg-card p-5 transition hover:border-primary/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-display font-bold">
                      <Coins className="h-4 w-4 text-accent" />
                      <span className="tabular-nums">{r.cost.toLocaleString("fr-FR")}</span>
                    </div>
                    <Button size="sm" variant={canRedeem ? "default" : "outline"} disabled={!canRedeem}>
                      {canRedeem ? "Échanger" : "Bientôt"}
                    </Button>
                  </div>
                  {!canRedeem && (
                    <Progress value={(balance / r.cost) * 100} className="mt-3 h-1.5" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>Historique</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {HISTORY.map((h) => {
              const isEarn = h.type === "earn"
              return (
                <li key={h.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={
                        isEarn
                          ? "flex h-9 w-9 items-center justify-center rounded-full bg-success/15 text-success"
                          : "flex h-9 w-9 items-center justify-center rounded-full bg-destructive/15 text-destructive"
                      }
                    >
                      {isEarn ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{h.label}</p>
                      <p className="text-xs text-muted-foreground">{h.date}</p>
                    </div>
                  </div>
                  <span
                    className={
                      isEarn
                        ? "font-display text-sm font-bold tabular-nums text-success"
                        : "font-display text-sm font-bold tabular-nums text-destructive"
                    }
                  >
                    {h.amount > 0 ? "+" : ""}
                    {h.amount} coins
                  </span>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>Comment ça marche ?</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-3">
          <Step n="1" title="Gagnez">
            1 coin pour chaque 1€ dépensé. Doublez avec Premium. Bonus avis et parrainage.
          </Step>
          <Step n="2" title="Cumulez">
            Vos coins n&apos;expirent jamais tant que vous restez actif (1 commande tous les 12 mois).
          </Step>
          <Step n="3" title="Échangez">
            Réductions, livraison, cadeaux, dons à des associations. Vous choisissez.
          </Step>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone: "success" | "destructive" | "accent"
}) {
  const palette = {
    success: "bg-success/10 text-success",
    destructive: "bg-destructive/10 text-destructive",
    accent: "bg-accent/15 text-accent",
  }[tone]
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${palette}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-display text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
        {n}
      </div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}
