import { Hero } from "@/components/home/hero"
import { ValueProps } from "@/components/home/value-props"
import { CategoriesGrid } from "@/components/home/categories-grid"
import { FlashSales } from "@/components/home/flash-sales"
import { LiveDrops } from "@/components/home/live-drops"
import { Trending } from "@/components/home/trending"
import { PremiumBanner } from "@/components/home/premium-banner"
import { BrandMarquee } from "@/components/home/brand-marquee"
import { PressBar } from "@/components/home/press-bar"
import { Editorial } from "@/components/home/editorial"
import { FeaturedSellers } from "@/components/home/featured-sellers"
import { Testimonials } from "@/components/home/testimonials"
import { SocialProof } from "@/components/home/social-proof"
import { Recommended } from "@/components/home/recommended"
import { Newsletter } from "@/components/home/newsletter"
import { RecentlyViewedStrip } from "@/components/product/recently-viewed"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CategoriesGrid />
      <FlashSales />
      <LiveDrops />
      <Trending />
      <RecentlyViewedStrip />
      <PressBar />
      <PremiumBanner />
      <BrandMarquee />
      <Editorial />
      <FeaturedSellers />
      <Testimonials />
      <SocialProof />
      <Recommended />
      <Newsletter />
    </>
  )
}
