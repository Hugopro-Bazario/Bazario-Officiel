"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ChartConfig = Record<string, { label: string; color: string }>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { config: ChartConfig }) {
  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {}
    Object.entries(config).forEach(([key, value]) => {
      vars[`--color-${key}`] = value.color
    })
    return vars as React.CSSProperties
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/60 [&_.recharts-tooltip-cursor]:stroke-border", className)}
        style={cssVars}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  )
}

export function ChartTooltip({ content }: { content?: React.ReactElement }) {
  return content ?? null
}

type TooltipPayload = {
  name?: string
  value?: number | string
  dataKey?: string
  color?: string
  payload?: Record<string, unknown>
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  hideLabel = false,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string | number
  formatter?: (value: number | string, name: string) => React.ReactNode
  hideLabel?: boolean
}) {
  const ctx = React.useContext(ChartContext)
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-lg">
      {!hideLabel && label !== undefined && (
        <div className="mb-1 font-semibold text-foreground">{label}</div>
      )}
      <div className="space-y-1">
        {payload.map((item, i) => {
          const key = String(item.dataKey ?? item.name ?? i)
          const cfg = ctx?.config[key]
          const display = cfg?.label ?? item.name ?? key
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-sm"
                style={{ background: item.color }}
              />
              <span className="text-muted-foreground">{display}</span>
              <span className="ml-auto font-medium text-foreground">
                {formatter && item.value !== undefined
                  ? formatter(item.value, String(display))
                  : item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
