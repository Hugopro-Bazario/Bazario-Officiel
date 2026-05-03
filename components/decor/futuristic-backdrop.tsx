type Props = {
  variant?: "hero" | "soft" | "dark"
  className?: string
}

/**
 * Decorative-only backdrop. Adds:
 *  - blueprint grid (mask-radial faded)
 *  - 3 floating aurora orbs (brand colors only)
 *  - one slow scanline
 *
 * Pure CSS, respects prefers-reduced-motion via globals.css.
 * Pointer-events: none so it never intercepts clicks.
 */
export function FuturisticBackdrop({ variant = "hero", className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Grid */}
      <div
        className={`absolute inset-0 ${
          variant === "dark" ? "bg-grid-strong opacity-40" : "bg-grid"
        }`}
      />

      {/* Aurora orbs */}
      <div
        className="animate-orb absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "hsl(var(--primary) / 0.35)" }}
      />
      <div
        className="animate-orb-slow absolute -right-32 top-20 h-[360px] w-[360px] rounded-full blur-3xl"
        style={{ background: "hsl(var(--neon) / 0.30)" }}
      />
      <div
        className="animate-orb absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full blur-3xl"
        style={{ background: "hsl(var(--accent) / 0.22)" }}
      />

      {/* Subtle scanline */}
      <div
        className="animate-scanline absolute inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--neon) / 0.6), transparent)",
        }}
      />
    </div>
  )
}
