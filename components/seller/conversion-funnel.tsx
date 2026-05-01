const STEPS = [
  { label: "Vues fiche produit", value: 4321, percent: 100 },
  { label: "Ajouts au panier", value: 612, percent: 14.2 },
  { label: "Démarrage checkout", value: 248, percent: 5.7 },
  { label: "Commandes finalisées", value: 87, percent: 2.0 },
]

export function ConversionFunnel() {
  return (
    <div className="space-y-3">
      {STEPS.map((s, i) => {
        const intensity = 100 - i * 12
        return (
          <div key={s.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{s.label}</span>
              <span className="tabular-nums text-muted-foreground">
                <span className="font-semibold text-foreground">{s.value.toLocaleString("fr-FR")}</span>
                <span className="ml-2 text-xs">{s.percent}%</span>
              </span>
            </div>
            <div className="h-7 overflow-hidden rounded-md bg-muted">
              <div
                className="h-full rounded-md bg-gradient-to-r from-primary to-primary/70 transition-all"
                style={{ width: `${s.percent}%`, opacity: intensity / 100 }}
              />
            </div>
          </div>
        )
      })}
      <div className="mt-4 flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3 text-sm">
        <span className="text-muted-foreground">Taux de conversion global</span>
        <span className="font-bold text-foreground">2.01% <span className="text-xs font-medium text-success">+0.4 pt</span></span>
      </div>
    </div>
  )
}
