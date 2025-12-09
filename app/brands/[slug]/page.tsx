import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"
import { getBrands, getBrandBySlug } from "@/lib/api/strapi"
import { getProducts } from "@/lib/api/shopify"
import { Star, MapPin, Award, Leaf, Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  const brands = await getBrands()
  return brands.map((brand) => ({
    slug: brand.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)

  if (!brand) {
    return { title: "Brand Not Found | Splendid Beauty" }
  }

  return {
    title: `${brand.name} | Splendid Beauty`,
    description: `Discover ${brand.name} - ${brand.tagline}. Shop authentic African and Caribbean beauty products.`,
    openGraph: {
      title: `${brand.name} | Splendid Beauty`,
      description: brand.tagline,
      images: [brand.logo],
    },
  }
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)

  if (!brand) {
    notFound()
  }

  const allProducts = await getProducts({ brandSlug: slug })

  const certifications = [
    { name: "Organic Certified", icon: Leaf },
    { name: "Fair Trade", icon: Award },
    { name: "Cruelty Free", icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <CartDrawer />
      <SearchModal />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-b from-muted/50 to-background pt-4">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Brands
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-32 h-32 bg-background rounded-2xl shadow-lg flex items-center justify-center mb-8 p-4">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{brand.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{brand.origin}</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{brand.tagline}</p>

              {/* Certifications */}
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <cert.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={brand.heroImage || brand.logo || "/placeholder.svg"}
                alt={brand.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            The <span className="text-primary italic">Story</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="prose prose-lg text-muted-foreground">
              <p>{brand.story}</p>
            </div>
            <div className="space-y-6">
              {brand.culturalSignificance && (
                <div className="bg-background p-6 rounded-xl border border-border">
                  <h3 className="font-serif text-xl text-foreground mb-3">Cultural Significance</h3>
                  <p className="text-muted-foreground">{brand.culturalSignificance}</p>
                </div>
              )}
              {brand.manufacturingRoots && (
                <div className="bg-background p-6 rounded-xl border border-border">
                  <h3 className="font-serif text-xl text-foreground mb-3">Manufacturing Roots</h3>
                  <p className="text-muted-foreground">{brand.manufacturingRoots}</p>
                </div>
              )}
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="font-serif text-xl text-foreground mb-3">Community Impact</h3>
                <p className="text-muted-foreground">
                  We employ over {brand.artisansEmployed || 50}+ local artisans and reinvest in community development
                  programs focused on education and sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products from this Brand */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            Products from <span className="text-primary italic">{brand.name}</span>
          </h2>

          {allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-square bg-muted rounded-xl overflow-hidden mb-4">
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      <Button className="w-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-primary tracking-wider mb-1">{product.brandName}</p>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(product.averageRating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                    </div>
                    <span className="font-medium text-foreground">${product.price.amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12">Products coming soon. Check back later!</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
