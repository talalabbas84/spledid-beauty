import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Beauty Journal | Splendid Beauty Blog",
  description:
    "Expert beauty tips, heritage stories, and wisdom rooted in African and Caribbean traditions. Discover skincare, hair care, and wellness advice.",
  openGraph: {
    title: "Beauty Journal | Splendid Beauty Blog",
    description: "Expert beauty tips and heritage stories from Splendid Beauty",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
