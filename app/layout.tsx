import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LiveChat } from "@/components/live-chat"
import { EmailPopup } from "@/components/email-popup"
import { SMSPopup } from "@/components/sms-popup"
import { AbandonedCartBanner } from "@/components/abandoned-cart-banner"
import { QuickViewModal } from "@/components/quick-view-modal"
import { CompareDrawer } from "@/components/compare-drawer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Splendid Beauty | Luxury African & Caribbean Beauty Products",
  description:
    "Discover premium African and Caribbean beauty products. Authentic ingredients, luxurious results, cultural pride in every bottle. Beauty rooted in heritage.",
  keywords: [
    "African beauty",
    "Caribbean beauty",
    "luxury skincare",
    "heritage beauty",
    "natural ingredients",
    "black beauty brands",
    "organic skincare",
    "shea butter",
    "african black soap",
  ],
  generator: "v0.app",
  openGraph: {
    title: "Splendid Beauty | Luxury African & Caribbean Beauty Products",
    description: "Premium African and Caribbean beauty products rooted in heritage.",
    type: "website",
    locale: "en_US",
    siteName: "Splendid Beauty",
  },
  twitter: {
    card: "summary_large_image",
    title: "Splendid Beauty",
    description: "Premium African and Caribbean beauty products rooted in heritage.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}>
        <AbandonedCartBanner />
        {children}
        <QuickViewModal />
        <CompareDrawer />
        <LiveChat />
        <EmailPopup />
        <SMSPopup />
        <Analytics />
      </body>
    </html>
  )
}
