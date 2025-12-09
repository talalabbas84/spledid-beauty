import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout | Splendid Beauty",
  description: "Complete your order securely. Free shipping on orders over $75.",
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
