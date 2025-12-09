"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Star, Heart, Minus, Plus, Check, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function QuickViewModal() {
  const {
    isQuickViewOpen,
    quickViewProduct,
    closeQuickView,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!quickViewProduct) return null

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = () => {
    if (isInWishlist(quickViewProduct.id)) {
      removeFromWishlist(quickViewProduct.id)
    } else {
      addToWishlist(quickViewProduct)
    }
  }

  const stockStatus =
    quickViewProduct.stockQuantity !== undefined
      ? quickViewProduct.stockQuantity <= 0
        ? { text: "Out of Stock", color: "text-red-500" }
        : quickViewProduct.stockQuantity <= 10
          ? { text: `Only ${quickViewProduct.stockQuantity} left`, color: "text-amber-500" }
          : { text: "In Stock", color: "text-green-500" }
      : { text: "In Stock", color: "text-green-500" }

  return (
    <Dialog open={isQuickViewOpen} onOpenChange={closeQuickView}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
        <button
          onClick={closeQuickView}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-background/80 hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={quickViewProduct.image || "/placeholder.svg"}
              alt={quickViewProduct.name}
              fill
              className="object-cover"
            />
            {quickViewProduct.badge && (
              <span
                className={cn(
                  "absolute top-4 left-4 px-3 py-1.5 text-xs font-medium rounded-full",
                  quickViewProduct.badge === "NEW"
                    ? "bg-foreground text-background"
                    : quickViewProduct.badge === "LIMITED"
                      ? "bg-red-500 text-white"
                      : "bg-primary text-primary-foreground",
                )}
              >
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <span className="text-primary tracking-wider text-sm mb-1">{quickViewProduct.brand}</span>
            <h2 className="font-serif text-2xl text-foreground mb-2">{quickViewProduct.name}</h2>

            {quickViewProduct.sku && (
              <span className="text-xs text-muted-foreground mb-3">SKU: {quickViewProduct.sku}</span>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(quickViewProduct.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({quickViewProduct.reviews} reviews)</span>
              <span className={cn("text-sm font-medium", stockStatus.color)}>{stockStatus.text}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-medium text-foreground">${quickViewProduct.price.toFixed(2)}</span>
              {quickViewProduct.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${quickViewProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 transition-all",
                  addedToCart ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90",
                )}
                disabled={stockStatus.text === "Out of Stock"}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlist}
                className="border-border hover:border-primary bg-transparent"
              >
                <Heart
                  className={cn("h-5 w-5", isInWishlist(quickViewProduct.id) ? "fill-primary text-primary" : "")}
                />
              </Button>
            </div>

            <Link
              href={`/product/${quickViewProduct.id}`}
              onClick={closeQuickView}
              className="text-sm text-primary hover:underline mb-6"
            >
              View Full Details
            </Link>

            {/* Quick Info */}
            <div className="mt-auto pt-4 border-t border-border space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Origin:</span> {quickViewProduct.countryOfOrigin}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Category:</span> {quickViewProduct.category}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
