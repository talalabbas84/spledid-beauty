"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"
import { useStore } from "@/lib/store"
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore()

  const handleMoveToCart = (product: (typeof wishlist)[0]) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <CartDrawer />
      <SearchModal />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">My Wishlist</h1>
          {wishlist.length > 0 && <span className="text-muted-foreground">({wishlist.length} items)</span>}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-foreground mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save your favorite products here to purchase later</p>
            <Link href="/shop">
              <Button className="bg-primary text-primary-foreground">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  {product.badge && (
                    <span
                      className={cn(
                        "absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full",
                        product.badge === "NEW"
                          ? "bg-foreground text-background"
                          : "bg-primary text-primary-foreground",
                      )}
                    >
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div>
                  <p className="text-xs text-primary tracking-wider mb-1">{product.brand}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                        )}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">${product.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      onClick={() => handleMoveToCart(product)}
                      className="bg-primary text-primary-foreground"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
