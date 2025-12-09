"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"
import { getProducts } from "@/lib/api/shopify"
import { getConcernBySlug } from "@/lib/api/strapi"
import type { Product } from "@/lib/api/types"
import { useStore } from "@/lib/store"
import { Star, Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ConcernPage() {
  const params = useParams()
  const slug = params.slug as string
  const [sortBy, setSortBy] = useState("featured")
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()

  const [products, setProducts] = useState<Product[]>([])
  const [concernInfo, setConcernInfo] = useState<{ name: string; description: string; image: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [productsData, concernData] = await Promise.all([getProducts({ concern: slug }), getConcernBySlug(slug)])
      setProducts(productsData)
      if (concernData) {
        setConcernInfo({
          name: concernData.name,
          description: concernData.description,
          image: concernData.image,
        })
      } else {
        const name = slug.replace(/-/g, " ")
        setConcernInfo({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          description: `Products formulated to address ${name} concerns.`,
          image: "/luxury-african-beauty-products-gold-dark.jpg",
        })
      }
      setLoading(false)
    }
    fetchData()
  }, [slug])

  const sortedProducts = useMemo(() => {
    const result = [...products]
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price.amount - b.price.amount)
        break
      case "price-high":
        result.sort((a, b) => b.price.amount - a.price.amount)
        break
      case "rating":
        result.sort((a, b) => b.averageRating - a.averageRating)
        break
      default:
        // featured - no additional sorting
        break
    }
    return result
  }, [products, sortBy])

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
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <CartDrawer />
      <SearchModal />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={concernInfo?.image || "/placeholder.svg"}
            alt={concernInfo?.name || ""}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl text-background mb-4">{concernInfo?.name}</h1>
          <p className="text-background/90 text-lg leading-relaxed">{concernInfo?.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-muted-foreground">{sortedProducts.length} products</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-background border border-border rounded-md px-4 py-2 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-xl mb-4" />
                <div className="h-4 bg-muted rounded w-1/4 mb-2" />
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square bg-muted rounded-xl overflow-hidden mb-4">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => handleWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isInWishlist(product.id) ? "fill-primary text-primary" : "text-foreground",
                      )}
                    />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span className="text-sm font-medium">Add to Cart</span>
                  </button>
                </div>
                <div>
                  <p className="text-xs text-primary tracking-wider mb-1">{product.brandName}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < Math.floor(product.averageRating) ? "fill-primary text-primary" : "fill-muted text-muted",
                        )}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                  </div>
                  <span className="font-medium text-foreground">${product.price.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No products found for this concern</p>
            <Link href="/shop">
              <Button className="bg-primary text-primary-foreground">Browse All Products</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
