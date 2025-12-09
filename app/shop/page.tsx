"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"
import { getProducts } from "@/lib/api/shopify"
import { getBrands, getConcerns } from "@/lib/api/strapi"
import type { Product } from "@/lib/api/types"
import { useStore } from "@/lib/store"
import { Star, Heart, ShoppingBag, SlidersHorizontal, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "All Products" },
  { id: "skincare", name: "Skincare" },
  { id: "haircare", name: "Hair Care" },
  { id: "body", name: "Body Care" },
  { id: "oils", name: "Oils & Serums" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()

  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<{ id: string; name: string; slug: string }[]>([])
  const [concerns, setConcerns] = useState<{ slug: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [productsData, brandsData, concernsData] = await Promise.all([getProducts(), getBrands(), getConcerns()])
      setProducts(productsData)
      setBrands(brandsData.map((b) => ({ id: b.id, name: b.name, slug: b.slug })))
      setConcerns(concernsData.map((c) => ({ slug: c.slug, name: c.name })))
      setLoading(false)
    }
    fetchData()
  }, [])

  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category.toLowerCase() !== selectedCategory) {
        return false
      }
      // Concerns filter
      if (selectedConcerns.length > 0) {
        const productConcerns = product.targetConcerns.map((c) => c.toLowerCase())
        if (!selectedConcerns.some((c) => productConcerns.includes(c.toLowerCase()))) {
          return false
        }
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brandName.toUpperCase())) {
        return false
      }
      // Price filter
      if (product.price.amount < priceRange[0] || product.price.amount > priceRange[1]) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price.amount - b.price.amount
        case "price-high":
          return b.price.amount - a.price.amount
        case "rating":
          return b.averageRating - a.averageRating
        case "newest":
          return a.badge === "NEW" ? -1 : b.badge === "NEW" ? 1 : 0
        default:
          return a.badge === "BEST SELLER" ? -1 : b.badge === "BEST SELLER" ? 1 : 0
      }
    })

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) => (prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]))
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedConcerns([])
    setSelectedBrands([])
    setPriceRange([0, 200])
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
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <CartDrawer />
      <SearchModal />

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/luxury-african-beauty-products-gold-dark.jpg')] bg-cover bg-center opacity-40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl text-background mb-4">Shop Collection</h1>
          <p className="text-background/80 text-lg max-w-2xl mx-auto">
            Discover luxurious beauty products rooted in African and Caribbean heritage
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{filteredProducts.length} products</span>
            {(selectedConcerns.length > 0 || selectedBrands.length > 0 || selectedCategory !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary/80">
                Clear all filters
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              className="md:hidden flex items-center gap-2 border-border bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            <div className="relative flex-1 md:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-48 appearance-none bg-background border border-border rounded-md px-4 py-2 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              "lg:w-64 flex-shrink-0",
              showFilters ? "block" : "hidden lg:block",
              "fixed lg:static inset-0 z-50 lg:z-auto bg-background lg:bg-transparent p-6 lg:p-0 overflow-y-auto",
            )}
          >
            <div className="flex justify-between items-center lg:hidden mb-6">
              <h2 className="font-serif text-xl">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-medium text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded-md transition-colors",
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Concerns */}
            <div className="mb-8">
              <h3 className="font-medium text-foreground mb-4">Skin Concerns</h3>
              <div className="flex flex-wrap gap-2">
                {concerns.map((concern) => (
                  <button
                    key={concern.slug}
                    onClick={() => toggleConcern(concern.name)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm border transition-colors",
                      selectedConcerns.includes(concern.name)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                    )}
                  >
                    {concern.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <h3 className="font-medium text-foreground mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name.toUpperCase())}
                      onChange={() => toggleBrand(brand.name.toUpperCase())}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium text-foreground mb-4">Price Range</h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-20 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-20 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Max"
                />
              </div>
            </div>

            <Button
              className="w-full lg:hidden bg-primary text-primary-foreground"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg mb-4" />
                    <div className="h-4 bg-muted rounded w-1/4 mb-2" />
                    <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria</p>
                <Button onClick={clearFilters} className="bg-primary text-primary-foreground">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
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
                              : product.badge === "LIMITED"
                                ? "bg-red-500 text-white"
                                : "bg-primary text-primary-foreground",
                          )}
                        >
                          {product.badge}
                        </span>
                      )}
                      <button
                        onClick={() => handleWishlist(product)}
                        className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                              i < Math.floor(product.averageRating)
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted",
                            )}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">${product.price.amount.toFixed(2)}</span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.compareAtPrice.amount.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
