"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Gift, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [includeSms, setIncludeSms] = useState(false)

  useEffect(() => {
    // Check if popup was already shown/dismissed
    const hasSeenPopup = localStorage.getItem("splendid-popup-seen")
    if (hasSeenPopup) return

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to Klaviyo/Mailchimp
    console.log("Email signup:", { email, phone, includeSms })
    setSubmitted(true)
    localStorage.setItem("splendid-popup-seen", "true")
    setTimeout(() => setIsOpen(false), 3000)
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("splendid-popup-seen", "true")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={cn(
          "relative w-full max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden",
          "animate-in fade-in zoom-in-95 duration-300",
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <div className="hidden md:block relative h-full min-h-[300px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/hero-bg.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-serif text-2xl">Beauty Rooted in Heritage</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8">
            {!submitted ? (
              <>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-2">Get 15% Off Your First Order</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Join our community and receive exclusive offers, new product alerts, and heritage beauty tips.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sms-signup"
                      checked={includeSms}
                      onChange={(e) => setIncludeSms(e.target.checked)}
                      className="rounded border-border"
                    />
                    <label htmlFor="sms-signup" className="text-sm text-muted-foreground cursor-pointer">
                      Also sign up for SMS deals (extra 5% off!)
                    </label>
                  </div>

                  {includeSms && (
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full"
                    />
                  )}

                  <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    Unlock My Discount
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to receive marketing emails. Unsubscribe anytime.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">Welcome to the Family!</h3>
                <p className="text-muted-foreground text-sm">Check your inbox for your 15% discount code.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
