"use client"

import type React from "react"
import { useStore } from "@/lib/store"
import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Search,
  Package,
  Truck,
  RotateCcw,
  CreditCard,
  User,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  FileText,
  Shield,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FAQ {
  question: string
  answer: string
}

interface HelpCategory {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  faqs: FAQ[]
}

const helpCategories: HelpCategory[] = [
  {
    id: "orders",
    title: "Orders & Tracking",
    icon: <Package className="w-6 h-6" />,
    description: "Track your order, modify orders, and order status",
    faqs: [
      {
        question: "How do I track my order?",
        answer:
          "Once your order ships, you'll receive an email with tracking information. You can also visit our Order Tracking page and enter your order ID to see real-time status updates.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 1 hour of placement. After that, our fulfillment process begins. Contact us immediately at support@splendidbeauty.com if you need to make changes.",
      },
      {
        question: "What if my order is damaged or missing items?",
        answer:
          "We're so sorry if this happened! Please contact us within 48 hours of delivery with photos of the damage. We'll send a replacement or refund promptly.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: <Truck className="w-6 h-6" />,
    description: "Shipping rates, delivery times, and international orders",
    faqs: [
      {
        question: "What are the shipping options?",
        answer:
          "We offer Standard (5-7 business days, free on orders $75+), Express (2-3 business days, $14.99), and Priority (1-2 business days, $24.99). International shipping varies by destination.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes! We ship to Canada, UK, and select countries. International orders may be subject to customs fees and duties, which are the responsibility of the recipient.",
      },
      {
        question: "How is shipping calculated?",
        answer:
          "Shipping is calculated based on your location and order weight. Use our shipping calculator at checkout to see exact rates before completing your purchase.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: <RotateCcw className="w-6 h-6" />,
    description: "Return policy, refunds, and exchanges",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of purchase for unopened products in original packaging. Opened products can be returned within 14 days if you're unsatisfied.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Email support@splendidbeauty.com with your order number and reason for return. We'll provide a prepaid return label and process your refund within 5-7 business days of receiving the item.",
      },
      {
        question: "Can I exchange a product?",
        answer:
          "Yes! For exchanges, please initiate a return and place a new order for the desired item. This ensures fastest processing and availability.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Billing",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Payment methods, security, and billing questions",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. We use industry-standard SSL encryption and never store your full credit card details. We're PCI DSS compliant for your protection.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes! We partner with Afterpay and Klarna for buy-now-pay-later options on orders over $50. Select your preferred option at checkout.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Profile",
    icon: <User className="w-6 h-6" />,
    description: "Account settings, password reset, and preferences",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign In' in the header and select 'Create Account'. You can also create an account during checkout by checking the 'Create account' option.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Sign In', then 'Forgot Password'. Enter your email and we'll send you a password reset link valid for 24 hours.",
      },
      {
        question: "How do I update my email preferences?",
        answer:
          "Log into your account and visit Account Settings > Email Preferences. You can manage which types of emails you receive there.",
      },
    ],
  },
  {
    id: "products",
    title: "Products & Ingredients",
    icon: <FileText className="w-6 h-6" />,
    description: "Product information, ingredients, and authenticity",
    faqs: [
      {
        question: "Are your products authentic?",
        answer:
          "100% yes! We source directly from artisan producers across Africa and the Caribbean. Each product comes with heritage documentation and batch traceability.",
      },
      {
        question: "Are your products cruelty-free?",
        answer:
          "All Splendid Beauty products are cruelty-free and never tested on animals. Many are also vegan - check individual product pages for details.",
      },
      {
        question: "How do I know if a product is right for me?",
        answer:
          "Each product page lists target concerns, ingredients, and usage instructions. You can also use our chat support or email us for personalized recommendations.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const { openLiveChat } = useStore()

  const filteredCategories = searchQuery
    ? helpCategories.filter(
        (cat) =>
          cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.faqs.some(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : helpCategories

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">How Can We Help?</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/order-tracking"
              className="flex items-center gap-4 p-6 border border-border rounded-xl hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Track Your Order</h3>
                <p className="text-sm text-muted-foreground">Enter your order ID to see status</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
            </Link>

            <a
              href="mailto:support@splendidbeauty.com"
              className="flex items-center gap-4 p-6 border border-border rounded-xl hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@splendidbeauty.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
            </a>

            <a
              href="tel:1-888-555-0123"
              className="flex items-center gap-4 p-6 border border-border rounded-xl hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Call Us</h3>
                <p className="text-sm text-muted-foreground">1-888-555-0123 (9am-6pm EST)</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
            </a>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl text-foreground mb-8">Browse by Topic</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={cn(
                  "border border-border rounded-xl overflow-hidden transition-all",
                  activeCategory === category.id ? "ring-2 ring-primary" : "",
                )}
              >
                <button
                  onClick={() => setActiveCategory(activeCategory === category.id ? "all" : category.id)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform",
                        activeCategory === category.id ? "rotate-180" : "",
                      )}
                    />
                  </div>
                </button>

                {activeCategory === category.id && (
                  <div className="border-t border-border p-4 space-y-2 bg-muted/30">
                    {category.faqs.map((faq, idx) => (
                      <div key={idx} className="border border-border rounded-lg overflow-hidden bg-background">
                        <button
                          onClick={() =>
                            setActiveCategory(
                              activeCategory === `${category.id}-${idx}` ? "all" : `${category.id}-${idx}`,
                            )
                          }
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <span className="font-medium text-foreground text-sm">{faq.question}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-2",
                              activeCategory === `${category.id}-${idx}` ? "rotate-180" : "",
                            )}
                          />
                        </button>
                        {activeCategory === `${category.id}-${idx}` && (
                          <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.answer}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-foreground mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our customer support team is available Monday-Friday, 9am-6pm EST. We typically respond within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-primary-foreground" onClick={openLiveChat}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="bg-transparent w-full">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Shopping</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              <span className="text-sm">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Free Shipping $75+</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
