"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useStore } from "@/lib/store"

export function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useStore()

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent side="right" className="w-full sm:w-[450px] bg-background flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-2xl">
            <ShoppingBag className="h-6 w-6" />
            Your Cart ({cart.length})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">Discover our curated collection of heritage beauty products</p>
            </div>
            <Button onClick={toggleCart} className="bg-primary text-primary-foreground rounded-full px-8">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-accent/30 rounded-lg border border-border/50">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground tracking-wider">{item.brand}</p>
                      <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                      <p className="text-primary font-semibold mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 pb-2 px-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-lg">${cartTotal().toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Shipping and taxes calculated at checkout</p>
              <Link href="/checkout" onClick={toggleCart}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base font-medium">
                  Proceed to Checkout
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={toggleCart}
                className="w-full rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
