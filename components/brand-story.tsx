import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const brands = [
  {
    name: "Shea Radiance",
    origin: "Ghana",
    image: "/shea-butter-luxury-brand-logo-gold.jpg",
  },
  {
    name: "Island Glow",
    origin: "Jamaica",
    image: "/tropical-island-beauty-brand-logo.jpg",
  },
  {
    name: "Baobab Beauty",
    origin: "Senegal",
    image: "/baobab-tree-african-beauty-brand-logo.jpg",
  },
  {
    name: "Cocoa Luxe",
    origin: "Ivory Coast",
    image: "/cocoa-luxury-skincare-brand-logo.jpg",
  },
]

export function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-primary font-medium tracking-wider mb-3 sm:mb-4 text-sm">OUR PARTNERS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6">
              Curated from the <span className="text-primary italic">Finest Artisans</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
              We partner directly with artisan producers and heritage brands across Africa and the Caribbean. Each
              collaboration ensures authentic ingredients, fair trade practices, and the preservation of traditional
              beauty wisdom passed down through generations.
            </p>

            {/* Brand Logos Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-muted overflow-hidden flex-shrink-0">
                    <Image
                      src={brand.image || "/placeholder.svg"}
                      alt={brand.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{brand.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{brand.origin}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/brands">
              <Button className="group">
                View All Brands
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/african-woman-artisan-creating-natural-beauty-prod.jpg"
                alt="Artisan creating beauty products"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-foreground text-background p-4 sm:p-6 rounded-xl max-w-[200px] sm:max-w-xs">
              <p className="text-2xl sm:text-3xl font-serif text-primary mb-1 sm:mb-2">50+</p>
              <p className="text-xs sm:text-sm text-background/80">Artisan partners across 12 countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
