import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop | Splendid Beauty - African & Caribbean Beauty Products",
  description:
    "Browse our curated collection of luxury African and Caribbean beauty products. Filter by concern, brand, and price to find your perfect products.",
  openGraph: {
    title: "Shop | Splendid Beauty",
    description: "Discover luxury African and Caribbean beauty products rooted in heritage.",
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
