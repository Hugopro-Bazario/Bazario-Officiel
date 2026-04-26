import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "light"
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center font-display text-2xl font-bold tracking-tight",
        variant === "light" ? "text-primary-foreground" : "text-foreground",
        className,
      )}
      aria-label="Bazario, retour à l'accueil"
    >
      <span>bazario</span>
      <span className="relative ml-0.5 inline-flex h-4 w-4 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary" />
        <span className="relative h-1.5 w-1.5 translate-x-1 rounded-full bg-accent" />
      </span>
    </Link>
  )
}
