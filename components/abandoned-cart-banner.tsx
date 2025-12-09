"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ShoppingCart, Clock } from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export function AbandonedCartBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const { cart, cartTotal } = useStore()

  useEffect(() => {
    // Check if user has items in cart and left the site before
    const lastVisit = localStorage.getItem("splendid-last-visit")
    const now = Date.now()

    if (lastVisit && cart.length > 0) {
      const timeSinceLastVisit = now - Number.parseInt(lastVisit)
      // Show banner if user was away for more than 30 seconds (demo purposes, would be longer in production)
      if (timeSinceLastVisit > 30000) {
        setIsVisible(true)
      }
    }

    // Update last visit time
    localStorage.setItem("splendid-last-visit", now.toString())
  }, [cart.length])

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])

  if (!isVisible || cart.length === 0) return null

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 px-4 animate-in slide-in-from-top duration-500">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm md:text-base">
            <span className="font-medium">Welcome back!</span> Complete your order and get{" "}
            <span className="font-bold">10% off</span> with code{" "}
            <span className="font-mono bg-primary-foreground/20 px-2 py-0.5 rounded">COMEBACK10</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>
              Expires in {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <Link href="/checkout">
            <Button size="sm" variant="secondary" className="whitespace-nowrap">
              Complete Order
            </Button>
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
