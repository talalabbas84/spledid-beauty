"use client"

import { useState, useEffect } from "react"
import { Gift, Mail, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getGiftCards } from "@/lib/api/strapi"
import type { GiftCard } from "@/lib/api/types"
import { cn } from "@/lib/utils"

export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])
  const [selectedAmount, setSelectedAmount] = useState<number>(50)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "physical">("email")
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchGiftCards() {
      const cards = await getGiftCards()
      setGiftCards(cards)
      if (cards.length > 1) {
        setSelectedAmount(cards[1].amount)
      }
    }
    fetchGiftCards()
  }, [])

  const finalAmount = customAmount ? Number.parseFloat(customAmount) : selectedAmount

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Gift className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Gift Cards</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Give the gift of beauty and heritage. Our gift cards let your loved ones choose their perfect products.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gift Card Preview */}
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-8">
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                    <span className="font-serif text-2xl text-primary">Splendid Beauty</span>
                    <Gift className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Gift Card Value</p>
                    <p className="font-serif text-4xl text-foreground">${finalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <Label className="text-foreground font-medium">Select Amount</Label>
                <div className="grid grid-cols-4 gap-3">
                  {giftCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => {
                        setSelectedAmount(card.amount)
                        setCustomAmount("")
                      }}
                      className={cn(
                        "py-3 rounded-lg border-2 font-medium transition-all",
                        selectedAmount === card.amount && !customAmount
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 text-foreground",
                      )}
                    >
                      ${card.amount}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">or</span>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount(0)
                      }}
                      className="pl-8"
                      min="10"
                      max="500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gift Card Form */}
            <div className="space-y-6">
              {/* Delivery Method */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Delivery Method</Label>
                <RadioGroup value={deliveryMethod} onValueChange={(v) => setDeliveryMethod(v as "email" | "physical")}>
                  <div className="flex gap-4">
                    <label
                      className={cn(
                        "flex-1 flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                        deliveryMethod === "email"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <RadioGroupItem value="email" />
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Email Delivery</p>
                        <p className="text-sm text-muted-foreground">Instant delivery</p>
                      </div>
                    </label>
                    <label
                      className={cn(
                        "flex-1 flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                        deliveryMethod === "physical"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <RadioGroupItem value="physical" />
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Physical Card</p>
                        <p className="text-sm text-muted-foreground">Ships in 2-3 days</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Recipient Info */}
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      placeholder="Enter name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>
                  {deliveryMethod === "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="recipientEmail">Recipient Email</Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        placeholder="Enter email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderName">Your Name</Label>
                  <Input
                    id="senderName"
                    placeholder="Enter your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Write a personal message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className={cn(
                  "w-full py-6 text-lg transition-all",
                  added ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90",
                )}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  `Add Gift Card - $${finalAmount.toFixed(2)}`
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Gift cards never expire and can be used on any product.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
