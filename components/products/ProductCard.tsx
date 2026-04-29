import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] || "https://placehold.co/720x720/f4f4f5/18181b?text=Bazario";
  const isPromo = typeof product.compare_price === "number" && product.compare_price > product.price;

  return (
    <Link href={`/produits/${product.slug}`} className="group">
      <Card className="h-full overflow-hidden transition group-hover:-translate-y-0.5 group-hover:shadow-md">
        <div className="relative aspect-square bg-zinc-100">
          <Image
            src={image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
        <CardContent className="space-y-2">
          <h3 className="line-clamp-2 text-sm font-semibold">{product.title}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold">{formatPrice(product.price)}</span>
            {isPromo ? <span className="text-sm text-zinc-500 line-through">{formatPrice(product.compare_price!)}</span> : null}
          </div>
          {isPromo ? <Badge>Promo</Badge> : null}
        </CardContent>
      </Card>
    </Link>
  );
}
