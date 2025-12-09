"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { getProducts } from "@/lib/api/shopify"
import type { Product } from "@/lib/api/types"
import { cn } from "@/lib/utils"

export function NewArrivals() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [newProducts, setNewProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts({ sort: "newest", limit: 4 })
      setNewProducts(products)
    }
    fetchProducts()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn("h-3.5 w-3.5", i < Math.floor(rating) ? "fill-primary text-primary" : "fill-muted text-muted")}
      />
    ))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.title,
      brand: product.brandName,
      price: product.price.amount,
      image: product.images[0] || "",
      category: product.category,
      rating: product.averageRating,
      reviews: product.reviewCount,
    })
  }

  const handleWishlist = (product: Product) => {
    const cartProduct = {
      id: product.id,
      name: product.title,
      brand: product.brandName,
      price: product.price.amount,
      image: product.images[0] || "",
      category: product.category,
      rating: product.averageRating,
      reviews: product.reviewCount,
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(cartProduct)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4 sm:gap-6">
          <div>
            <p className="text-primary font-medium tracking-wider mb-2 sm:mb-3 text-sm">JUST DROPPED</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">New Arrivals</h2>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-background/30 text-background hover:bg-background hover:text-foreground bg-transparent h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-background/30 text-background hover:bg-background hover:text-foreground bg-transparent h-10 w-10"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.map((product) => (
            <div key={product.id} className="group">
              {/* Image */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-background/10 mb-3 sm:mb-5">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                {/* Quick Actions */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleWishlist(product)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5",
                        isInWishlist(product.id) ? "fill-primary text-primary" : "text-foreground",
                      )}
                    />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                  </button>
                </div>
                <span className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold bg-primary text-primary-foreground rounded">
                  NEW
                </span>
              </div>
              {/* Content */}
              <p className="text-[10px] sm:text-xs font-medium text-background/60 tracking-wider mb-1">
                {product.brandName}
              </p>
              <Link href={`/product/${product.id}`}>
                <h3 className="font-medium text-background mb-1 sm:mb-2 text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <div className="flex">{renderStars(product.averageRating)}</div>
                <span className="text-xs sm:text-sm text-background/60">({product.reviewCount})</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-primary">${product.price.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
