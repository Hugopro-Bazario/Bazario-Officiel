"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Audio", value: 4820, fill: "hsl(217 70% 35%)" },
  { name: "Mode", value: 2340, fill: "hsl(24 95% 55%)" },
  { name: "Beauté", value: 1620, fill: "hsl(217 60% 60%)" },
  { name: "Maison", value: 1180, fill: "hsl(24 80% 70%)" },
  { name: "Autres", value: 520, fill: "hsl(220 15% 75%)" },
]

const total = data.reduce((sum, d) => sum + d.value, 0)

export function CategoryBreakdown() {
  return (
    <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
      <ChartContainer
        config={Object.fromEntries(data.map((d) => [d.name.toLowerCase(), { label: d.name, color: d.fill }]))}
        className="h-[180px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => `${name} · ${Number(value).toLocaleString("fr-FR")} €`}
                />
              }
            />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={2}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} stroke="hsl(var(--background))" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ul className="space-y-2.5 text-sm">
        {data.map((d) => {
          const pct = ((d.value / total) * 100).toFixed(1)
          return (
            <li key={d.name} className="flex items-center gap-3">
              <span className="size-2.5 rounded-sm" style={{ background: d.fill }} />
              <span className="flex-1 text-muted-foreground">{d.name}</span>
              <span className="font-semibold tabular-nums">{pct}%</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
