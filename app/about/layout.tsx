import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Story | Splendid Beauty - Luxury Rooted in Heritage",
  description:
    "Discover the story behind Splendid Beauty. Learn about our mission to celebrate African and Caribbean beauty traditions while delivering modern luxury.",
  openGraph: {
    title: "Our Story | Splendid Beauty",
    description: "Beauty rooted in African and Caribbean heritage traditions.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
