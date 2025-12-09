import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, ShoppingBag, CreditCard, Truck, RotateCcw, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Terms of Service | Splendid Beauty",
  description: "Read the terms and conditions for using Splendid Beauty's website and services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">General Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using splendidbeauty.com, you agree to be bound by these Terms of Service. If you do
                  not agree to these terms, please do not use our website.
                </p>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                  posting to the website. Your continued use of the site following any changes constitutes acceptance of
                  those changes.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Orders & Payment</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>All prices are listed in USD and are subject to change without notice</li>
                  <li>Payment is required at the time of order placement</li>
                  <li>We accept major credit cards, PayPal, Apple Pay, and Google Pay</li>
                  <li>Orders are subject to product availability and order verification</li>
                  <li>We reserve the right to refuse or cancel any order for any reason</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Shipping</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Free standard shipping on orders over $75 within the continental US</li>
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss transfers to you upon delivery to the carrier</li>
                  <li>International orders may be subject to customs duties and taxes</li>
                  <li>We are not responsible for delays caused by shipping carriers</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Returns & Refunds</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Unopened products may be returned within 30 days of purchase</li>
                  <li>Opened products may be returned within 14 days if unsatisfied</li>
                  <li>Items must be in original packaging with all tags attached</li>
                  <li>Refunds will be processed within 5-7 business days of receiving the return</li>
                  <li>Shipping costs are non-refundable unless the return is due to our error</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  Splendid Beauty shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages arising out of or relating to your use of our website or products.
                </p>
                <p className="text-muted-foreground">
                  Our total liability to you for any claims arising from your use of our products or services shall not
                  exceed the amount you paid for the specific product or service giving rise to the claim.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-6 bg-muted rounded-xl">
            <p className="text-center text-muted-foreground">
              For questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@splendidbeauty.com" className="text-primary hover:underline">
                legal@splendidbeauty.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
