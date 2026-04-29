import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ProductCard } from "@/components/products/ProductCard";
import { getAllProducts, getHeroProduct } from "@/lib/products";

export default async function HomePage() {
  const [hero, products] = await Promise.all([getHeroProduct(), getAllProducts({ limit: 12 })]);

  return (
    <div className="space-y-12">
      <HeroSection hero={hero} />
      <FeaturedProductSection hero={hero} />
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Nos produits</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <WhyUsSection />
    </div>
  );
}
