import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Award, Gift, BookOpen } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Best Sellers", href: "/shop?filter=best-sellers" },
    { name: "New Arrivals", href: "/shop?filter=new" },
    { name: "Skincare", href: "/shop?category=skincare" },
    { name: "Hair Care", href: "/shop?category=hair-care" },
    { name: "Gift Cards", href: "/gift-cards" },
  ],
  company: [
    { name: "Our Story", href: "/about" },
    { name: "Our Brands", href: "/brands" },
    { name: "Blog", href: "/blog" },
    { name: "Sustainability", href: "/about#sustainability" },
    { name: "Rewards Program", href: "/rewards" },
    { name: "Careers", href: "/careers" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "My Account", href: "/account" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Track Order", href: "/order-tracking" },
    { name: "Wishlist", href: "/wishlist" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Rewards Banner */}
      <div className="bg-primary/90 py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary-foreground" />
              <span className="font-medium text-primary-foreground">Join Splendid Rewards</span>
            </div>
            <span className="text-primary-foreground/80 text-sm">Earn 10 points for every $1 spent</span>
            <Link
              href="/rewards"
              className="text-sm font-medium text-primary-foreground underline underline-offset-4 hover:no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl font-serif">
                Splendid <span className="text-primary">Beauty</span>
              </span>
            </Link>
            <p className="text-background/70 mb-4 sm:mb-6 max-w-sm text-sm sm:text-base leading-relaxed">
              Beauty rooted in heritage. Premium African and Caribbean beauty products that honor ancestral wisdom while
              delivering modern luxury.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-background/70">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm">123 Heritage Lane, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-background/70">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm">+1 (888) 555-0123</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-background/70">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm">hello@splendidbeauty.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-1"
                  >
                    {link.name === "Gift Cards" && <Gift className="h-3 w-3" />}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-1"
                  >
                    {link.name === "Rewards Program" && <Award className="h-3 w-3" />}
                    {link.name === "Blog" && <BookOpen className="h-3 w-3" />}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-background/60 text-center md:text-left">
              © {new Date().getFullYear()} Splendid Beauty. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-xs sm:text-sm text-background/60 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs sm:text-sm text-background/60 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-xs sm:text-sm text-background/60 hover:text-primary transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
