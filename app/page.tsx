import { Hero } from "@/components/home/hero"
import { CategoriesGrid } from "@/components/home/categories-grid"
import { FlashSales } from "@/components/home/flash-sales"
import { Trending } from "@/components/home/trending"
import { PremiumBanner } from "@/components/home/premium-banner"
import { FeaturedSellers } from "@/components/home/featured-sellers"
import { Recommended } from "@/components/home/recommended"

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <FlashSales />
      <Trending />
      <PremiumBanner />
      <FeaturedSellers />
      <Recommended />
    </>
  )
}
