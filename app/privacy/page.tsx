import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Splendid Beauty",
  description: "Learn how Splendid Beauty protects and handles your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Splendid Beauty, we are committed to protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or make a purchase.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Name, email address, and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through our payment providers)</li>
                    <li>Order history and product preferences</li>
                    <li>Communications you send to us</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Respond to your questions and requests</li>
                    <li>Send promotional communications (with your consent)</li>
                    <li>Improve our website and customer experience</li>
                    <li>Detect and prevent fraud</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">Data Security</h2>
                  <p className="text-muted-foreground mb-4">
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>256-bit SSL encryption for all data transmission</li>
                    <li>PCI DSS compliant payment processing</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited employee access to personal data</li>
                    <li>Secure data centers with 24/7 monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">Your Rights</h2>
                  <p className="text-muted-foreground mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy or wish to exercise your rights, please contact us
                    at:
                  </p>
                  <p className="text-foreground mt-4">
                    <strong>Email:</strong> privacy@splendidbeauty.com
                    <br />
                    <strong>Address:</strong> 123 Heritage Lane, New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
