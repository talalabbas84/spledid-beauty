"use client"

import { motion } from "framer-motion"
import { Book, MessageCircle, Mail, Phone, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useStore } from "@/lib/store"

const faqs = [
  {
    question: "How do I add a new product?",
    answer:
      "Go to Products > Add New Product. Fill in all required fields including name, description, price, images, and inventory. Submit for approval - our team will review within 24-48 hours.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Payouts are processed bi-weekly on the 1st and 15th of each month. Funds are transferred to your registered bank account within 2-3 business days.",
  },
  {
    question: "How do I fulfill an order?",
    answer:
      "When you receive a new order, go to Orders, select the order, and click 'Ship Order'. Enter your tracking number and carrier. The customer will be notified automatically.",
  },
  {
    question: "What is the commission rate?",
    answer:
      "Our standard commission rate is 15% on all sales. This covers payment processing, platform fees, and customer support. Higher-volume sellers may qualify for reduced rates.",
  },
  {
    question: "How do I handle returns?",
    answer:
      "If a customer requests a return, you'll receive a notification. Review the request in your Orders dashboard. Approve or deny within 48 hours. Approved returns should be processed within 7 days.",
  },
]

const resources = [
  { title: "Seller Handbook", description: "Complete guide to selling", icon: Book },
  { title: "Product Guidelines", description: "Requirements and best practices", icon: FileText },
  { title: "Shipping Guide", description: "Packaging and fulfillment tips", icon: FileText },
]

export default function SellerHelpPage() {
  const { openLiveChat } = useStore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-foreground">Help & Support</h1>
        <p className="text-muted-foreground mt-1">Get help with your seller account</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card
            className="bg-card border-border hover:border-primary transition-colors cursor-pointer"
            onClick={openLiveChat}
          >
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with our team</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border hover:border-primary transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Email Support</h3>
              <p className="text-sm text-muted-foreground">sellers@splendidbeauty.com</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border hover:border-primary transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Phone</h3>
              <p className="text-sm text-muted-foreground">1-800-555-0123</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Resources */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Resources</CardTitle>
          <CardDescription>Helpful guides and documentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {resources.map((resource, index) => (
            <motion.button
              key={resource.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <resource.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{resource.title}</p>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-lg px-4 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
