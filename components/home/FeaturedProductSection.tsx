import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export function FeaturedProductSection({ hero }: { hero: Product | null }) {
  if (!hero) return null;
  const image = hero.images[0] || "https://placehold.co/1280x720/f4f4f5/18181b?text=Bazario";

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Produit phare</h2>
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-video md:aspect-auto">
            <Image src={image} alt={hero.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <CardContent className="space-y-4 p-6">
            <h3 className="text-xl font-bold">{hero.title}</h3>
            <p className="line-clamp-4 text-sm text-zinc-700">{hero.description || "Produit selectionne par Bazario."}</p>
            <div className="text-lg font-bold">{formatPrice(hero.price)}</div>
            <Link href={`/produits/${hero.slug}`}>
              <Button>Voir la fiche produit</Button>
            </Link>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
