import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Cart | Splendid Beauty",
  description: "Review your shopping cart and proceed to checkout for luxury African and Caribbean beauty products.",
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
