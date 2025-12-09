import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accessibility, Eye, Keyboard, Monitor, MessageCircle } from "lucide-react"

export const metadata = {
  title: "Accessibility | Splendid Beauty",
  description: "Learn about Splendid Beauty's commitment to digital accessibility.",
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <Accessibility className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Accessibility Statement</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to making Splendid Beauty accessible to everyone, regardless of ability or technology.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                Splendid Beauty is committed to ensuring digital accessibility for people with disabilities. We are
                continually improving the user experience for everyone and applying the relevant accessibility standards
                to achieve these goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Visual Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Alt text for all images, high contrast text, and scalable fonts for users with visual impairments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Keyboard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Keyboard Navigation</h3>
                  <p className="text-sm text-muted-foreground">
                    Full keyboard navigation support for users who cannot use a mouse or prefer keyboard input.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Screen Reader Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Compatible with popular screen readers including JAWS, NVDA, and VoiceOver.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Feedback Welcome</h3>
                  <p className="text-sm text-muted-foreground">
                    We welcome your feedback on the accessibility of our site. Please let us know if you encounter any
                    barriers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">Contact Us</h3>
              <p className="text-muted-foreground mb-4">
                If you have specific questions or concerns about the accessibility of this site, or if you need
                assistance using any part of our website, please contact us:
              </p>
              <p className="text-foreground">
                <strong>Email:</strong> accessibility@splendidbeauty.com
                <br />
                <strong>Phone:</strong> 1-888-555-0123
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
