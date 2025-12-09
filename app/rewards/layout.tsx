import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rewards Program | Splendid Beauty",
  description:
    "Join our Heritage Rewards program and earn points on every purchase. Unlock exclusive discounts and perks.",
  openGraph: {
    title: "Rewards Program | Splendid Beauty",
    description: "Earn points and unlock exclusive perks with Heritage Rewards.",
  },
}

export default function RewardsLayout({ children }: { children: React.ReactNode }) {
  return children
}
