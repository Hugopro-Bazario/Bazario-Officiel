"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "1 mar.", revenue: 320, orders: 4 },
  { day: "3 mar.", revenue: 480, orders: 6 },
  { day: "5 mar.", revenue: 410, orders: 5 },
  { day: "7 mar.", revenue: 620, orders: 8 },
  { day: "9 mar.", revenue: 580, orders: 7 },
  { day: "11 mar.", revenue: 740, orders: 9 },
  { day: "13 mar.", revenue: 690, orders: 8 },
  { day: "15 mar.", revenue: 880, orders: 11 },
  { day: "17 mar.", revenue: 950, orders: 12 },
  { day: "19 mar.", revenue: 870, orders: 10 },
  { day: "21 mar.", revenue: 1120, orders: 14 },
  { day: "23 mar.", revenue: 1080, orders: 13 },
  { day: "25 mar.", revenue: 1240, orders: 15 },
  { day: "27 mar.", revenue: 1180, orders: 14 },
  { day: "29 mar.", revenue: 1390, orders: 17 },
  { day: "31 mar.", revenue: 1480, orders: 18 },
]

export function RevenueChart() {
  return (
    <ChartContainer
      config={{
        revenue: { label: "Chiffre d'affaires", color: "hsl(217 70% 35%)" },
        orders: { label: "Commandes", color: "hsl(24 95% 55%)" },
      }}
      className="h-[280px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${v}€`} width={48} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) =>
                  name === "Chiffre d'affaires" ? `${Number(value).toLocaleString("fr-FR")} €` : value
                }
              />
            }
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2.5}
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
