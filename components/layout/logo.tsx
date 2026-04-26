import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  variant = "default",
  showWordmark = true,
}: {
  className?: string
  variant?: "default" | "light"
  showWordmark?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight",
        variant === "light" ? "text-primary-foreground" : "text-foreground",
        className,
      )}
      aria-label="Bazario, retour à l'accueil"
    >
      <LogoMark variant={variant} />
      {showWordmark && (
        <span className="leading-none">
          bazario
          <span className="text-accent">.</span>
        </span>
      )}
    </Link>
  )
}

export function LogoMark({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "light"
}) {
  const isLight = variant === "light"
  return (
    <span
      className={cn(
        "relative inline-flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-transform group-hover:scale-105",
        isLight ? "bg-primary-foreground" : "bg-primary",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className={cn("h-4 w-4", isLight ? "text-primary" : "text-primary-foreground")}
        fill="currentColor"
      >
        {/* Stylized "B" mark with bag silhouette */}
        <path d="M5 4h7.2c2.4 0 4.3 1.6 4.3 3.9 0 1.6-.9 2.7-2 3.2 1.6.4 2.8 1.7 2.8 3.6 0 2.5-2 4.3-4.7 4.3H5V4zm3 2.6v3.5h3.6c1 0 1.7-.7 1.7-1.7s-.7-1.8-1.7-1.8H8zm0 6v3.8h4.1c1.1 0 1.9-.8 1.9-1.9s-.8-1.9-1.9-1.9H8z" />
      </svg>
      <span
        className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background"
        aria-hidden
      />
    </span>
  )
}
