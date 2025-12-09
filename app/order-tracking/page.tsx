"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Package, Truck, CheckCircle, Clock, MapPin, Search, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface OrderStatus {
  id: string
  status: "processing" | "shipped" | "out-for-delivery" | "delivered"
  date: string
  items: { name: string; quantity: number }[]
  estimatedDelivery: string
  trackingNumber: string
  carrier: string
  timeline: { status: string; date: string; location?: string; completed: boolean }[]
}

function OrderTrackingContent() {
  const [searchOrderId, setSearchOrderId] = useState("")
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock order data for demonstration
  const mockOrder: OrderStatus = {
    id: "SB-ABC123",
    status: "shipped",
    date: "December 5, 2024",
    items: [
      { name: "African Black Soap Deep Cleanser", quantity: 1 },
      { name: "Shea Butter Radiance Cream", quantity: 2 },
    ],
    estimatedDelivery: "December 12, 2024",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    timeline: [
      { status: "Order Placed", date: "Dec 5, 2024 - 2:30 PM", completed: true },
      { status: "Payment Confirmed", date: "Dec 5, 2024 - 2:32 PM", completed: true },
      { status: "Processing", date: "Dec 5, 2024 - 4:00 PM", completed: true },
      { status: "Shipped", date: "Dec 6, 2024 - 10:15 AM", location: "New York, NY", completed: true },
      { status: "In Transit", date: "Dec 7, 2024 - 8:00 AM", location: "Philadelphia, PA", completed: true },
      { status: "Out for Delivery", date: "Expected Dec 12", completed: false },
      { status: "Delivered", date: "Expected Dec 12", completed: false },
    ],
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (searchOrderId.toUpperCase() === "SB-ABC123" || searchOrderId.length > 5) {
        setOrder(mockOrder)
      } else {
        setError("Order not found. Please check your order ID and try again.")
        setOrder(null)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">Track Your Order</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Enter your order ID to see the current status of your delivery
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="flex gap-3">
            <Input
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="Enter order ID (e.g., SB-ABC123)"
              className="flex-1"
            />
            <Button type="submit" className="bg-primary text-primary-foreground" disabled={loading}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {order && (
          <div className="max-w-3xl mx-auto">
            {/* Order Summary Card */}
            <div className="bg-muted/30 rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-medium text-foreground">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <p className="font-medium text-foreground">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-medium text-primary">{order.estimatedDelivery}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-3">Items in Order</p>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-foreground">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Carrier: </span>
                    <span className="font-medium text-foreground">{order.carrier}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tracking: </span>
                    <span className="font-medium text-primary">{order.trackingNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-background border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl text-foreground mb-6">Delivery Progress</h2>
              <div className="relative">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {step.status === "Delivered" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step.status === "Out for Delivery" ? (
                          <Truck className="h-5 w-5" />
                        ) : step.status.includes("Transit") ? (
                          <MapPin className="h-5 w-5" />
                        ) : step.status === "Shipped" ? (
                          <Package className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      {idx < order.timeline.length - 1 && (
                        <div
                          className={cn("w-0.5 flex-1 mt-2", step.completed ? "bg-primary" : "bg-border")}
                          style={{ minHeight: "2rem" }}
                        />
                      )}
                    </div>
                    <div className="pt-2">
                      <p className={cn("font-medium", step.completed ? "text-foreground" : "text-muted-foreground")}>
                        {step.status}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                      {step.location && <p className="text-sm text-primary mt-1">{step.location}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="max-w-xl mx-auto mt-12 text-center">
          <p className="text-muted-foreground mb-4">Need help with your order?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline" className="bg-transparent w-full">
                Contact Support
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" className="bg-transparent w-full">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function OrderTrackingPage() {
  return <OrderTrackingContent />
}
