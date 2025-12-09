"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"
import { ShippingCalculator } from "@/components/shipping-calculator"
import { ProductCard } from "@/components/product-card"
import { RecentlyViewed } from "@/components/recently-viewed"
import { getProductById, getRelatedProducts } from "@/lib/api/shopify"
import type { Product } from "@/lib/api/types"
import { useStore } from "@/lib/store"
import {
  Star,
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  Leaf,
  ChevronRight,
  Check,
  AlertTriangle,
  Share2,
  GitCompare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

function toCartProduct(product: Product) {
  return {
    id: product.id,
    name: product.title,
    brand: product.brandName,
    price: product.price.amount,
    originalPrice: product.compareAtPrice?.amount,
    image: product.featuredImage,
    images: product.images,
    category: product.category,
    description: product.descriptionHtml,
    ingredients: product.ingredients,
    benefits: product.benefits,
    rating: product.averageRating,
    reviews: product.reviewCount,
    sku: product.sku,
    stockQuantity: product.stockQuantity,
    inStock: product.inStock,
    origin: product.countryOfOrigin,
    usage: product.usageInstructions,
    concerns: product.targetConcerns,
    badge: product.badge,
    heritage: product.heritage,
    beforeAfter: product.beforeAfterImages,
  }
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50)
  const [shared, setShared] = useState(false)
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToRecentlyViewed,
    addToCompare,
    compareProducts,
  } = useStore()

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const productData = await getProductById(id)
      setProduct(productData)

      if (productData) {
        addToRecentlyViewed(toCartProduct(productData))
        const related = await getRelatedProducts(id, 4)
        setRelatedProducts(related)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id, addToRecentlyViewed])

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button className="bg-primary text-primary-foreground">Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  const cartProduct = toCartProduct(product)

  const handleAddToCart = () => {
    addToCart(cartProduct, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(cartProduct)
    }
  }

  const handleAddToCompare = () => {
    addToCompare(cartProduct)
  }

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} by ${product.brandName}`,
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch (error) {
      // User cancelled or error - try clipboard fallback
      try {
        await navigator.clipboard.writeText(window.location.href)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch {
        console.error("Failed to share")
      }
    }
  }

  const isComparing = compareProducts.some((p) => p.id === product.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <SearchModal />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 pt-24">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={product.images[selectedImage] || product.featuredImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {product.badge}
                </span>
              )}
              {product.stockQuantity <= 10 && product.stockQuantity > 0 && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Only {product.stockQuantity} left
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                    selectedImage === idx ? "border-primary" : "border-transparent hover:border-primary/50",
                  )}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-primary font-medium mb-2">{product.brandName}</p>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{product.title}</h1>

              {/* SKU & Stock */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>SKU: {product.sku}</span>
                <span>|</span>
                {product.inStock ? (
                  <span className={product.stockQuantity <= 10 ? "text-amber-600" : "text-green-600"}>
                    {product.stockQuantity <= 10 ? `Only ${product.stockQuantity} in stock` : "In Stock"}
                  </span>
                ) : (
                  <span className="text-destructive">Out of Stock</span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.averageRating) ? "fill-primary text-primary" : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.averageRating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price.amount.toFixed(2)} {product.price.currencyCode}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.compareAtPrice.amount.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  disabled={!product.inStock}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={cn(
                  "flex-1 py-6 text-lg transition-all",
                  addedToCart ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90",
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added to Cart!
                  </>
                ) : !product.inStock ? (
                  "Out of Stock"
                ) : (
                  "Add to Cart"
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleWishlist}
                className={cn("h-14 w-14", isInWishlist(product.id) && "text-red-500 border-red-500")}
              >
                <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
              </Button>
            </div>

            {/* Compare & Share */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddToCompare}
                disabled={isComparing}
                className="flex items-center gap-2 bg-transparent"
              >
                <GitCompare className="h-4 w-4" />
                {isComparing ? "In Compare" : "Compare"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className={cn("flex items-center gap-2 bg-transparent", shared && "text-green-600 border-green-600")}
              >
                {shared ? (
                  <>
                    <Check className="h-4 w-4" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share
                  </>
                )}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free Shipping $75+</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Clean Beauty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-8">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="ingredients"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger
              value="heritage"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Heritage
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Shipping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-4">Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-4">How to Use</h3>
                <p className="text-muted-foreground">{product.usageInstructions}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="space-y-6">
            <div>
              <h3 className="font-serif text-xl text-foreground mb-4">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm text-foreground">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-4">Full Ingredient List (INCI)</h3>
              <p className="text-muted-foreground text-sm">{product.inciIngredients}</p>
            </div>
          </TabsContent>

          <TabsContent value="heritage" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-4">Cultural Heritage</h3>
                <p className="text-muted-foreground">{product.heritage}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-4">Origin</h3>
                <p className="text-muted-foreground">
                  Sourced from {product.countryOfOrigin}, crafted with traditional methods passed down through
                  generations.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <ShippingCalculator productWeight={product.weight} />
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12 border-t border-border">
          <h2 className="font-serif text-2xl text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={toCartProduct(p)} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed currentProductId={product.id} />

      <Footer />
    </div>
  )
}
