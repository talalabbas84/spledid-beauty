import { getBrands } from "@/lib/api/strapi"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, ArrowRight, Award, Leaf, Users, Shield, CheckCircle } from "lucide-react"

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-40" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl text-background mb-6">Our Partner Brands</h1>
          <p className="text-background/80 text-lg md:text-xl leading-relaxed">
            We work directly with artisan communities across Africa and the Caribbean to bring you authentic,
            heritage-rooted beauty products
          </p>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Leaf, label: "100% Natural Ingredients" },
              { icon: Shield, label: "Authenticity Guaranteed" },
              { icon: Users, label: "Fair Trade Certified" },
              { icon: Award, label: "Cruelty-Free" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                <badge.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {brands.map((brand, brandIdx) => (
            <div
              key={brand.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${brandIdx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={brandIdx % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-cover" />
                </div>
              </div>
              <div className={brandIdx % 2 === 1 ? "md:order-1" : ""}>
                <div className="flex items-center gap-2 text-primary text-sm mb-3">
                  <MapPin className="h-4 w-4" />
                  {brand.origin}
                  {brand.foundedYear && <span className="text-muted-foreground">• Est. {brand.foundedYear}</span>}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{brand.name}</h2>
                <p className="text-lg text-muted-foreground mb-4">{brand.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{brand.story}</p>

                {/* Manufacturing & Organic Info */}
                {brand.manufacturingRoots && (
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Manufacturing Roots
                    </h4>
                    <p className="text-sm text-muted-foreground">{brand.manufacturingRoots}</p>
                  </div>
                )}

                {brand.organicCommitment && (
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      Commitment to Natural Ingredients
                    </h4>
                    <p className="text-sm text-muted-foreground">{brand.organicCommitment}</p>
                  </div>
                )}

                {/* Certifications */}
                {brand.certifications && brand.certifications.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-3">Certifications & Trust Badges</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {brand.artisansEmployed && (
                  <p className="text-sm text-primary font-medium mb-6">Supporting {brand.artisansEmployed}+ artisans</p>
                )}

                <Link
                  href={`/brands/${brand.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Shop {brand.name} Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Commitment */}
      <section className="bg-foreground py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-background text-center mb-4">Our Commitment to You</h2>
          <p className="text-background/70 text-center max-w-2xl mx-auto mb-12">
            Every product we sell meets our strict standards for authenticity, sustainability, and ethical sourcing.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Authenticity Guaranteed",
                description: "Every product is verified authentic and sourced directly from artisan communities.",
              },
              {
                icon: Users,
                title: "Fair Trade Practices",
                description: "We ensure fair wages and safe working conditions for all our artisan partners.",
              },
              {
                icon: Leaf,
                title: "Sustainable Sourcing",
                description: "All ingredients are sustainably harvested to protect ecosystems and communities.",
              },
              {
                icon: Award,
                title: "Community Investment",
                description: "A portion of every sale supports local education and healthcare initiatives.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-background mb-3">{item.title}</h3>
                <p className="text-background/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-foreground mb-4">Want to Partner With Us?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            If you're an artisan brand committed to heritage beauty traditions, we'd love to hear from you.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
