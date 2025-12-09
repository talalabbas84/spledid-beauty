"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { getFeaturedProducts } from "@/lib/api/shopify"
import type { Product } from "@/lib/api/types"
import { cn } from "@/lib/utils"

export function BestSellers() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    async function fetchProducts() {
      const products = await getFeaturedProducts(4)
      setBestSellers(products)
    }
    fetchProducts()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn("h-4 w-4", i < Math.floor(rating) ? "fill-primary text-primary" : "fill-muted text-muted")}
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
    <section ref={ref} className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">Best Sellers</h2>
          <p className="text-muted-foreground text-base md:text-lg">Our most-loved products, trusted by thousands</p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                {/* Badge */}
                {product.badge && (
                  <span
                    className={cn(
                      "absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded",
                      product.badge === "NEW" ? "bg-foreground text-background" : "bg-primary text-primary-foreground",
                    )}
                  >
                    {product.badge}
                  </span>
                )}
                {/* Wishlist */}
                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5",
                      isInWishlist(product.id) ? "fill-primary text-primary" : "text-foreground",
                    )}
                  />
                </button>
                {/* Add to Cart */}
                <div
                  className={cn(
                    "absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 transition-all duration-300",
                    hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  )}
                >
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground gap-2 rounded-full text-xs sm:text-sm"
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-5">
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground tracking-wider mb-1 sm:mb-2">
                  {product.brandName}
                </p>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium text-foreground mb-2 sm:mb-3 line-clamp-2 text-sm sm:text-base hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <div className="flex">{renderStars(product.averageRating)}</div>
                  <span className="text-xs sm:text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    ${product.price.amount.toFixed(2)}
                  </p>
                  {product.compareAtPrice && (
                    <p className="text-xs sm:text-sm text-muted-foreground line-through">
                      ${product.compareAtPrice.amount.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link href="/shop?filter=best-sellers">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 sm:px-10 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
            >
              View All Best Sellers
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
