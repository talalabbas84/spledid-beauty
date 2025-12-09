import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Splendid Beauty",
  description:
    "Get in touch with our customer service team. We're here to help with orders, product questions, and more.",
  openGraph: {
    title: "Contact Us | Splendid Beauty",
    description: "Reach out to our friendly customer support team.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
