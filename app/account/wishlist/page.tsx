import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/data"

export default function WishlistPage() {
  // Mock wishlist : on prend 6 produits
  const wishlist = products.slice(0, 6)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Liste de souhaits</h2>
        <p className="text-sm text-muted-foreground">{wishlist.length} produits sauvegardés</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
