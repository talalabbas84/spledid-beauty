"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, X, ArrowRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useStore } from "@/lib/store"
import { searchProducts } from "@/lib/api/shopify"
import type { Product } from "@/lib/api/types"

export function SearchModal() {
  const { isSearchOpen, toggleSearch } = useStore()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length >= 2) {
      setLoading(true)
      searchProducts(query).then((data) => {
        setResults(data)
        setLoading(false)
      })
    } else {
      setResults([])
    }
  }, [query])

  const handleClose = () => {
    setQuery("")
    setResults([])
    toggleSearch()
  }

  return (
    <Dialog open={isSearchOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-background">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, ingredients, or concerns..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">{results.length} results found</p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={handleClose}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground tracking-wider">{product.brandName}</p>
                    <h4 className="font-medium text-foreground truncate">{product.title}</h4>
                    <p className="text-primary font-semibold">${product.price.amount.toFixed(2)}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No products found for "{query}"</p>
            </div>
          ) : (
            <div className="p-8">
              <p className="text-sm text-muted-foreground mb-4">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Shea Butter", "Black Soap", "Hair Growth", "Anti-Aging", "Moisturizer"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full bg-muted text-foreground text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
