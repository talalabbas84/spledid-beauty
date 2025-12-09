import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCollections } from "@/components/featured-collections"
import { BestSellers } from "@/components/best-sellers"
import { CulturalRoots } from "@/components/cultural-roots"
import { NewArrivals } from "@/components/new-arrivals"
import { BrandStory } from "@/components/brand-story"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"
import { RecentlyViewed } from "@/components/recently-viewed"
import { TrustBadges } from "@/components/trust-badges"
import { BrandLogos } from "@/components/brand-logos"
import { ConcernsGrid } from "@/components/concerns-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <SearchModal />
      <HeroSection key="hero-unique" />
      <TrustBadges />
      <FeaturedCollections />
      <ConcernsGrid />
      <BestSellers />
      <CulturalRoots />
      <BrandLogos />
      <NewArrivals />
      <BrandStory />
      <Testimonials />
      <RecentlyViewed />
      <Newsletter />
      <Footer />
    </main>
  )
}
