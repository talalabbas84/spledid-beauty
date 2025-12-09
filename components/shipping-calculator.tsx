"use client"

import type React from "react"

import { useState } from "react"
import { Truck, Package, Zap, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ShippingRate {
  carrier: string
  service: string
  price: number
  estimatedDays: string
  icon: React.ReactNode
}

const shippingRates: Record<string, ShippingRate[]> = {
  US: [
    { carrier: "USPS", service: "Standard", price: 5.99, estimatedDays: "5-7", icon: <Package className="w-5 h-5" /> },
    { carrier: "UPS", service: "Ground", price: 8.99, estimatedDays: "3-5", icon: <Truck className="w-5 h-5" /> },
    { carrier: "UPS", service: "Express", price: 14.99, estimatedDays: "2-3", icon: <Zap className="w-5 h-5" /> },
    { carrier: "FedEx", service: "Priority", price: 24.99, estimatedDays: "1-2", icon: <Zap className="w-5 h-5" /> },
  ],
  CA: [
    {
      carrier: "Canada Post",
      service: "Standard",
      price: 9.99,
      estimatedDays: "7-10",
      icon: <Package className="w-5 h-5" />,
    },
    {
      carrier: "Canada Post",
      service: "Express",
      price: 18.99,
      estimatedDays: "3-5",
      icon: <Truck className="w-5 h-5" />,
    },
    { carrier: "UPS", service: "Express", price: 29.99, estimatedDays: "2-3", icon: <Zap className="w-5 h-5" /> },
  ],
  UK: [
    {
      carrier: "Royal Mail",
      service: "Standard",
      price: 12.99,
      estimatedDays: "10-14",
      icon: <Package className="w-5 h-5" />,
    },
    { carrier: "DHL", service: "Express", price: 34.99, estimatedDays: "3-5", icon: <Zap className="w-5 h-5" /> },
  ],
}

interface ShippingCalculatorProps {
  subtotal: number
  onSelectRate?: (rate: ShippingRate) => void
}

export function ShippingCalculator({ subtotal, onSelectRate }: ShippingCalculatorProps) {
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("US")
  const [rates, setRates] = useState<ShippingRate[] | null>(null)
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    if (!postalCode) return
    setIsCalculating(true)

    // Simulate API call
    setTimeout(() => {
      let calculatedRates = shippingRates[country] || shippingRates.US

      // Free shipping on orders over $75
      if (subtotal >= 75) {
        calculatedRates = [
          {
            carrier: "Standard",
            service: "Free Shipping",
            price: 0,
            estimatedDays: "5-7",
            icon: <Package className="w-5 h-5" />,
          },
          ...calculatedRates.slice(1),
        ]
      }

      setRates(calculatedRates)
      setIsCalculating(false)
    }, 1000)
  }

  const handleSelectRate = (rate: ShippingRate) => {
    setSelectedRate(rate)
    onSelectRate?.(rate)
  }

  return (
    <div className="border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 text-foreground font-medium">
        <MapPin className="w-5 h-5 text-primary" />
        <span>Shipping Calculator</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="UK">United Kingdom</option>
        </select>
        <Input placeholder="Postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      </div>

      <Button
        onClick={handleCalculate}
        disabled={!postalCode || isCalculating}
        className="w-full bg-primary text-primary-foreground"
      >
        {isCalculating ? "Calculating..." : "Calculate Shipping"}
      </Button>

      {rates && (
        <div className="space-y-2 pt-2">
          <p className="text-sm text-muted-foreground">Available shipping options:</p>
          {rates.map((rate, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectRate(rate)}
              className={cn(
                "w-full flex items-center justify-between p-3 border rounded-lg transition-colors text-left",
                selectedRate === rate ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="text-primary">{rate.icon}</div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {rate.carrier} {rate.service}
                  </p>
                  <p className="text-xs text-muted-foreground">{rate.estimatedDays} business days</p>
                </div>
              </div>
              <span className="font-semibold text-foreground">
                {rate.price === 0 ? "FREE" : `$${rate.price.toFixed(2)}`}
              </span>
            </button>
          ))}
        </div>
      )}

      {subtotal < 75 && (
        <p className="text-sm text-center text-muted-foreground">
          Add <span className="font-medium text-primary">${(75 - subtotal).toFixed(2)}</span> more for free shipping!
        </p>
      )}
    </div>
  )
}
