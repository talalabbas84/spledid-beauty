import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gift Cards | Splendid Beauty",
  description:
    "Give the gift of luxury beauty. Purchase digital gift cards for friends and family to enjoy our African and Caribbean beauty products.",
  openGraph: {
    title: "Gift Cards | Splendid Beauty",
    description: "Give the gift of heritage beauty.",
  },
}

export default function GiftCardsLayout({ children }: { children: React.ReactNode }) {
  return children
}
