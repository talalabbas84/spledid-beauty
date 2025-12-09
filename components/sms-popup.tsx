"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageSquare, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SMSPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if user already subscribed or dismissed
    const hasSeenSMS = localStorage.getItem("splendid-sms-popup-seen")
    const hasSeenEmail = localStorage.getItem("splendid-popup-seen")

    // Show SMS popup 30 seconds after email popup or if email was already seen
    if (!hasSeenSMS && hasSeenEmail) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 30000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone) {
      setIsSubmitted(true)
      localStorage.setItem("splendid-sms-popup-seen", "true")
      setTimeout(() => setIsOpen(false), 3000)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("splendid-sms-popup-seen", "true")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-[#1a1a1a] rounded-2xl overflow-hidden"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 text-center">
              {!isSubmitted ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C9A227]/20 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-[#C9A227]" />
                  </div>

                  <h2 className="text-2xl font-serif text-white mb-2">Get VIP Text Alerts</h2>
                  <p className="text-white/70 mb-6">
                    Be the first to know about flash sales, restocks, and exclusive drops. Plus, get{" "}
                    <span className="text-[#C9A227] font-medium">20% OFF</span> your next order!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full bg-[#C9A227] text-[#1a1a1a] hover:bg-[#B8922A] h-12 font-medium"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Get My 20% Off
                    </Button>
                  </form>

                  <p className="text-xs text-white/50 mt-4">
                    By signing up, you agree to receive marketing texts. Msg & data rates may apply. Reply STOP to
                    unsubscribe.
                  </p>
                </>
              ) : (
                <div className="py-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif text-white mb-2">You're In!</h2>
                  <p className="text-white/70">Check your phone for your 20% off code. Welcome to the VIP list!</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
