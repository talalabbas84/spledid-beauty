import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help Center | Splendid Beauty",
  description:
    "Find answers to frequently asked questions about orders, shipping, returns, and more at Splendid Beauty.",
  openGraph: {
    title: "Help Center | Splendid Beauty",
    description: "Get help with your orders and products.",
  },
}

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return children
}
