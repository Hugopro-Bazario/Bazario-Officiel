import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { CATEGORIES, getProductsByCategory } from "@/lib/data"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) notFound()

  const products = getProductsByCategory(slug)

  return (
    <div className="container py-6">
      <nav className="mb-3 text-xs text-muted-foreground" aria-label="Fil d'Ariane">
        <ol className="flex items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="text-foreground">{category.name}</li>
        </ol>
      </nav>

      <div className="rounded-2xl bg-secondary p-8 sm:p-10">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Découvrez {category.productCount.toLocaleString("fr-FR")} produits sélectionnés
          dans la catégorie {category.name.toLowerCase()}, vendus par des marchands vérifiés
          partout dans le monde.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/search?c=${slug}`}
            className="rounded-full border bg-background px-3 py-1 text-xs hover:border-primary hover:text-primary"
          >
            Voir tous les filtres
          </Link>
          <Link
            href={`/search?c=${slug}&sort=popular`}
            className="rounded-full border bg-background px-3 py-1 text-xs hover:border-primary hover:text-primary"
          >
            Plus vendus
          </Link>
          <Link
            href={`/search?c=${slug}&sort=price-asc`}
            className="rounded-full border bg-background px-3 py-1 text-xs hover:border-primary hover:text-primary"
          >
            Petits prix
          </Link>
        </div>
      </div>

      <h2 className="mt-8 font-display text-xl font-bold">Produits populaires</h2>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <p className="col-span-full text-sm text-muted-foreground">
            Aucun produit dans cette catégorie pour le moment.
          </p>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  )
}
