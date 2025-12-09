import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Brands | Splendid Beauty - Partner Artisans & Producers",
  description:
    "Explore our partner brands from across Africa and the Caribbean. Each brand brings authentic, ethically-sourced beauty products rooted in cultural heritage.",
  openGraph: {
    title: "Our Brands | Splendid Beauty",
    description: "Authentic beauty brands from Africa and the Caribbean.",
  },
}

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children
}
