"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added any products yet. Explore our collection and find something you&apos;ll
              love.
            </p>
            <Link href="/shop">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-primary tracking-wider mb-1">{item.brand}</p>
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-foreground p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-2 hover:bg-muted rounded-l-full transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted rounded-r-full transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-xl border border-border p-6 sticky top-28">
              <h2 className="font-serif text-xl text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${cartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{cartTotal() >= 75 ? "Free" : "$8.99"}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax</span>
                  <span>${(cartTotal() * 0.13).toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between font-medium text-foreground">
                  <span>Total</span>
                  <span>${(cartTotal() + (cartTotal() >= 75 ? 0 : 8.99) + cartTotal() * 0.13).toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {cartTotal() < 75 && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Add ${(75 - cartTotal()).toFixed(2)} more for free shipping
                </p>
              )}

              <Link href="/shop" className="block text-center text-primary hover:underline mt-4 text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
