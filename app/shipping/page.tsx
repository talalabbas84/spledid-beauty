import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Truck, Package, Globe, Clock, DollarSign, RotateCcw } from "lucide-react"

export const metadata = {
  title: "Shipping & Returns | Splendid Beauty",
  description: "Learn about Splendid Beauty's shipping options, delivery times, and return policy.",
}

const shippingOptions = [
  {
    name: "Standard Shipping",
    price: "Free on orders $75+",
    time: "5-7 business days",
    description: "Our most economical option for non-urgent orders",
  },
  {
    name: "Express Shipping",
    price: "$14.99",
    time: "2-3 business days",
    description: "Faster delivery for when you need your products sooner",
  },
  {
    name: "Priority Shipping",
    price: "$24.99",
    time: "1-2 business days",
    description: "Fastest option for urgent orders",
  },
]

const internationalRates = [
  { region: "Canada", standard: "$9.99 (7-10 days)", express: "$18.99 (3-5 days)" },
  { region: "United Kingdom", standard: "$12.99 (10-14 days)", express: "$34.99 (3-5 days)" },
  { region: "Europe", standard: "$14.99 (10-14 days)", express: "$39.99 (3-5 days)" },
  { region: "Australia", standard: "$16.99 (14-21 days)", express: "$44.99 (5-7 days)" },
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Shipping & Returns</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about getting your products delivered and our hassle-free return policy.
          </p>
        </div>
      </section>

      {/* Domestic Shipping */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">Domestic Shipping (US)</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {shippingOptions.map((option) => (
              <div
                key={option.name}
                className="border border-border rounded-xl p-6 hover:border-primary transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{option.name}</h3>
                <p className="text-2xl font-bold text-primary mb-1">{option.price}</p>
                <p className="text-sm text-muted-foreground mb-3">{option.time}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Free Shipping Threshold</h3>
            </div>
            <p className="text-muted-foreground">
              Enjoy free standard shipping on all orders over $75! Orders under $75 have a flat rate of $5.99 for
              standard shipping.
            </p>
          </div>
        </div>
      </section>

      {/* International Shipping */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">International Shipping</h2>
          </div>

          <div className="bg-background rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">Region</th>
                  <th className="text-left p-4 font-semibold text-foreground">Standard</th>
                  <th className="text-left p-4 font-semibold text-foreground">Express</th>
                </tr>
              </thead>
              <tbody>
                {internationalRates.map((rate, idx) => (
                  <tr key={rate.region} className={idx % 2 === 0 ? "" : "bg-muted/50"}>
                    <td className="p-4 text-foreground font-medium">{rate.region}</td>
                    <td className="p-4 text-muted-foreground">{rate.standard}</td>
                    <td className="p-4 text-muted-foreground">{rate.express}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            * International orders may be subject to customs duties and import taxes, which are the responsibility of
            the recipient.
          </p>
        </div>
      </section>

      {/* Processing Time */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">Processing Time</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Order Processing</h3>
              <p className="text-muted-foreground mb-4">
                Orders placed before 2:00 PM EST on business days are processed the same day. Orders placed after 2:00
                PM EST or on weekends/holidays will be processed the next business day.
              </p>
              <p className="text-muted-foreground">
                During peak seasons (holidays, sales events), processing may take an additional 1-2 business days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Order Tracking</h3>
              <p className="text-muted-foreground mb-4">
                Once your order ships, you'll receive an email with tracking information. You can also track your order
                anytime by visiting our Order Tracking page.
              </p>
              <p className="text-muted-foreground">
                Tracking information may take 24-48 hours to update after your order ships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <RotateCcw className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-2xl text-foreground">Returns & Exchanges</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">30-Day Return Policy</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Unopened products can be returned within 30 days for a full refund
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Opened products can be returned within 14 days if you're unsatisfied
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Items must be in original packaging with all tags attached
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Refunds processed within 5-7 business days of receiving return
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">How to Return</h3>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">1.</span>
                  Email support@splendidbeauty.com with your order number
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">2.</span>
                  Receive your prepaid return shipping label
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">3.</span>
                  Pack items securely in original packaging
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">4.</span>
                  Drop off at any authorized shipping location
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
