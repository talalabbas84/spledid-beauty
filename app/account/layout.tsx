import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Account | Splendid Beauty",
  description: "Manage your account, orders, wishlist, and preferences at Splendid Beauty.",
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children
}
