"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useStore } from "@/lib/store"
import { useState } from "react"

export function RecentlyViewed() {
  const { recentlyViewed } = useStore()
  const [currentIndex, setCurrentIndex] = useState(0)

  if (recentlyViewed.length === 0) return null

  const visibleProducts = recentlyViewed.slice(currentIndex, currentIndex + 4)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, recentlyViewed.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Math.max(1, recentlyViewed.length - 3)) % Math.max(1, recentlyViewed.length - 3),
    )
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-foreground">Recently Viewed</h2>
          {recentlyViewed.length > 4 && (
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visibleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group flex items-center gap-3 p-3 border border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground uppercase">{product.brand}</p>
                <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                  {product.name}
                </p>
                <p className="font-semibold text-foreground">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
