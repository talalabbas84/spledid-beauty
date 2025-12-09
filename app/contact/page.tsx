"use client"

import type React from "react"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@splendidbeauty.com",
    subtext: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (888) 555-0123",
    subtext: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Heritage Lane",
    subtext: "New York, NY 10001",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Monday - Friday",
    subtext: "9:00 AM - 6:00 PM EST",
  },
]

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all unopened products. If you're not satisfied, simply contact us for a full refund.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days depending on your location.",
  },
  {
    question: "Are your products cruelty-free?",
    answer:
      "Absolutely. All Splendid Beauty products are 100% cruelty-free and never tested on animals. Many of our products are also vegan.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive an email with tracking information. You can also track your order through your account dashboard.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { openLiveChat } = useStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 2000) // Simulate form submission delay
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <CartDrawer />
      <SearchModal />

      {/* Hero */}
      <section className="bg-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-background mb-6">Get in Touch</h1>
          <p className="text-background/80 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about our products or need assistance? We're here to help you on your beauty journey.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="bg-background border border-border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">{info.title}</h3>
              <p className="text-foreground font-medium">{info.details}</p>
              <p className="text-sm text-muted-foreground">{info.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Send Us a Message</h2>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-serif text-2xl text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 min-h-[150px]"
                    placeholder="How can we help you?"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-6 bg-primary text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div>
            <h2 className="font-serif text-3xl text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-muted/30 rounded-xl p-6 cursor-pointer">
                  <summary className="font-medium text-foreground flex items-center justify-between list-none">
                    {faq.question}
                    <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>

            {/* Live Chat CTA */}
            <div className="mt-8 bg-foreground rounded-xl p-8 text-center">
              <h3 className="font-serif text-2xl text-background mb-3">Need Immediate Help?</h3>
              <p className="text-background/70 mb-6">
                Our customer service team is available for live chat during business hours.
              </p>
              <Button
                variant="outline"
                className="border-background text-background hover:bg-background hover:text-foreground bg-transparent"
                onClick={openLiveChat}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
