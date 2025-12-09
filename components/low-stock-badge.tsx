"use client"

import { AlertTriangle, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface LowStockBadgeProps {
  stock: number
  threshold?: number
  showTrending?: boolean
  className?: string
}

export function LowStockBadge({ stock, threshold = 10, showTrending = false, className }: LowStockBadgeProps) {
  if (stock > threshold && !showTrending) return null

  if (stock === 0) {
    return (
      <div className={cn("flex items-center gap-1.5 text-red-600 text-sm font-medium", className)}>
        <AlertTriangle className="w-4 h-4" />
        <span>Out of Stock</span>
      </div>
    )
  }

  if (stock <= threshold) {
    return (
      <div className={cn("flex items-center gap-1.5 text-amber-600 text-sm font-medium", className)}>
        <AlertTriangle className="w-4 h-4" />
        <span>Only {stock} left in stock!</span>
      </div>
    )
  }

  if (showTrending) {
    return (
      <div className={cn("flex items-center gap-1.5 text-green-600 text-sm font-medium", className)}>
        <TrendingUp className="w-4 h-4" />
        <span>Trending - selling fast!</span>
      </div>
    )
  }

  return null
}
