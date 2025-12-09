"use client"

import Image from "next/image"
import Link from "next/link"
import { X, Star, Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function CompareDrawer() {
  const { compareProducts, removeFromCompare, clearCompare } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  if (compareProducts.length === 0) return null

  return (
    <>
      {/* Compare Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-foreground">Compare ({compareProducts.length}/4)</span>
            <div className="flex gap-2">
              {compareProducts.map((product) => (
                <div key={product.id} className="relative">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute -top-1 -right-1 bg-foreground text-background rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={clearCompare}>
              Clear All
            </Button>
            <Button size="sm" onClick={() => setIsOpen(true)} disabled={compareProducts.length < 2}>
              Compare Now
            </Button>
          </div>
        </div>
      </div>

      {/* Compare Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[90vh] overflow-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-serif text-2xl">Compare Products</SheetTitle>
          </SheetHeader>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border w-40"></th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="p-4 border-b border-border text-center">
                      <div className="relative w-32 h-32 mx-auto mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Link
                        href={`/product/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-foreground">Price</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4 border-b border-border text-center">
                      <span className="text-lg font-medium text-foreground">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-foreground">Rating</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4 border-b border-border text-center">
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                            )}
                          />
                        ))}
                        <span className="ml-1 text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-foreground">Origin</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4 border-b border-border text-center text-muted-foreground">
                      {product.countryOfOrigin}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-foreground">Category</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4 border-b border-border text-center text-muted-foreground">
                      {product.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-foreground align-top">Benefits</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4 border-b border-border text-left">
                      <ul className="space-y-1">
                        {product.benefits.slice(0, 4).map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-border font-medium text-foreground align-top">Good For</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4 border-b border-border">
                      <div className="flex flex-wrap gap-1">
                        {product.concerns.slice(0, 3).map((concern, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                            {concern}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground align-top">Key Ingredients</td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <ul className="space-y-1">
                        {product.ingredients.slice(0, 4).map((ingredient, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Minus className="h-3 w-3 text-primary" />
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
