"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Eye, GitCompare } from "lucide-react"
import { useStore, type Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { LowStockBadge } from "@/components/low-stock-badge"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleCart,
    openQuickView,
    addToCompare,
    addToRecentlyViewed,
    compareProducts,
  } = useStore()
  const inWishlist = isInWishlist(product.id)
  const inCompare = compareProducts.some((p) => p.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toggleCart()
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product)
  }

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCompare(product)
  }

  const handleClick = () => {
    addToRecentlyViewed(product)
  }

  return (
    <Link href={`/product/${product.id}`} onClick={handleClick} className={cn("group block", className)}>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted mb-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlist}
            className="w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("w-4 h-4", inWishlist ? "fill-red-500 text-red-500" : "text-foreground")} />
          </button>
          <button
            onClick={handleQuickView}
            className="w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
            title="Quick view"
          >
            <Eye className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={handleCompare}
            className={cn(
              "w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors",
              inCompare ? "bg-primary text-primary-foreground" : "bg-background/80 hover:bg-background text-foreground",
            )}
            title={inCompare ? "Added to compare" : "Add to compare"}
            disabled={compareProducts.length >= 4 && !inCompare}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        </div>

        {/* Quick add to cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background"
            size="sm"
            disabled={!product.inStock || (product.stockQuantity !== undefined && product.stockQuantity === 0)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {!product.inStock || (product.stockQuantity !== undefined && product.stockQuantity === 0)
              ? "Out of Stock"
              : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Low stock badge */}
        {product.stockQuantity !== undefined && <LowStockBadge stock={product.stockQuantity} threshold={10} />}
      </div>
    </Link>
  )
}
