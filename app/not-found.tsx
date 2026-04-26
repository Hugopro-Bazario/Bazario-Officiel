import Link from "next/link"
import { Search, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="font-display text-[120px] font-bold leading-none text-primary">
          4<span className="text-accent">0</span>4
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
          Cette page s&apos;est égarée dans le bazar
        </h1>
        <p className="mt-3 text-muted-foreground">
          La page que vous cherchez a peut-être été déplacée, supprimée, ou n&apos;a jamais existé. Pas de panique, retournons sur des pistes plus rentables.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/search">
              <Search className="h-4 w-4" />
              Rechercher un produit
            </Link>
          </Button>
        </div>
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <ArrowLeft className="h-3 w-3" /> Ou utilisez la flèche retour de votre navigateur
        </p>
      </div>
    </div>
  )
}
