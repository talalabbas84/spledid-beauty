import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wishlist | Splendid Beauty",
  description: "View your saved products and add them to your cart when you're ready.",
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
