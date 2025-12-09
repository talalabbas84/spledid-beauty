import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Leaf, Users, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/african-woman-in-nature-golden-hour-beauty.jpg"
            alt="African beauty"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl text-background mb-6">Our Story</h1>
          <p className="text-background/90 text-lg md:text-xl leading-relaxed">
            Beauty rooted in heritage. Products that honor ancestral wisdom while delivering modern luxury.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Celebrating <span className="text-primary italic">Cultural Beauty</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Splendid Beauty was founded on a simple belief: the beauty secrets passed down through generations in
              African and Caribbean communities deserve to be celebrated and shared with the world.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our founder, inspired by her grandmother&apos;s shea butter rituals in Ghana, set out to create a brand
              that honors these traditions while meeting the highest standards of modern skincare.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we partner directly with women&apos;s cooperatives and artisan communities across Africa and the
              Caribbean, bringing you products that are as authentic as they are effective.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/african-women-cooperative-making-shea-butter.jpg"
              alt="Women's cooperative"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Heritage First",
                description: "Every product honors centuries-old beauty traditions and ancestral wisdom.",
              },
              {
                icon: Leaf,
                title: "Natural & Pure",
                description: "We use only authentic, naturally-sourced ingredients with no harmful additives.",
              },
              {
                icon: Users,
                title: "Community Impact",
                description: "Fair trade partnerships that empower local communities and artisans.",
              },
              {
                icon: Globe,
                title: "Sustainability",
                description: "Eco-conscious practices that protect our planet for future generations.",
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "12+", label: "Countries Sourced From" },
            { number: "500+", label: "Artisan Partners" },
            { number: "50K+", label: "Happy Customers" },
            { number: "100%", label: "Cruelty Free" },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="font-serif text-4xl md:text-5xl text-primary mb-2">{stat.number}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
