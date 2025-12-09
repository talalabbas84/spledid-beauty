// =============================================================================
// Main Store - Cart, Wishlist, UI State for Buyers
// =============================================================================

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product as APIProduct } from "./api/types"

// Cart product type - simplified from API Product for store efficiency
export interface CartProduct {
  id: string
  sku?: string
  stockQuantity?: number
  weight?: number
  brand: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  badge?: string
  image: string
  images?: string[]
  description: string
  ingredients: string[]
  benefits: string[]
  concerns: string[]
  countryOfOrigin: string
  usage: string
  heritage: string
  category: string
  inStock: boolean
}

interface CartItem extends CartProduct {
  quantity: number
}

export interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
  carrier?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  orders: Order[]
  rewardsPoints: number
  rewardsTier: "Bronze" | "Gold" | "Platinum"
}

interface StoreState {
  // Cart
  cart: CartItem[]
  addToCart: (product: CartProduct, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: () => number
  cartCount: () => number
  cartWeight: () => number

  // Wishlist
  wishlist: CartProduct[]
  addToWishlist: (product: CartProduct) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean

  // Recently Viewed
  recentlyViewed: CartProduct[]
  addToRecentlyViewed: (product: CartProduct) => void

  // Compare
  compareProducts: CartProduct[]
  addToCompare: (product: CartProduct) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void

  // UI State
  isCartOpen: boolean
  isSearchOpen: boolean
  isQuickViewOpen: boolean
  quickViewProduct: CartProduct | null
  isLiveChatOpen: boolean
  toggleCart: () => void
  toggleSearch: () => void
  openQuickView: (product: CartProduct) => void
  closeQuickView: () => void
  openLiveChat: () => void
  closeLiveChat: () => void

  // User & Orders
  user: User | null
  orders: Order[]
  rewardsPoints: number
  login: (user: User) => void
  logout: () => void
  addOrder: (order: Order) => void
  getOrderById: (orderId: string) => Order | undefined
  addRewardsPoints: (points: number) => void
  redeemRewardsPoints: (points: number) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }
          return { cart: [...state.cart, { ...product, quantity }] }
        })
      },
      removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((item) => item.id !== productId) })),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        set((state) => ({ cart: state.cart.map((item) => (item.id === productId ? { ...item, quantity } : item)) }))
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
      cartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),
      cartWeight: () => get().cart.reduce((weight, item) => weight + (item.weight || 0.25) * item.quantity, 0),

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        set((state) => {
          if (state.wishlist.find((item) => item.id === product.id)) return state
          return { wishlist: [...state.wishlist, product] }
        })
      },
      removeFromWishlist: (productId) =>
        set((state) => ({ wishlist: state.wishlist.filter((item) => item.id !== productId) })),
      isInWishlist: (productId) => get().wishlist.some((item) => item.id === productId),

      // Recently Viewed
      recentlyViewed: [],
      addToRecentlyViewed: (product) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter((item) => item.id !== product.id)
          return { recentlyViewed: [product, ...filtered].slice(0, 10) }
        })
      },

      // Compare
      compareProducts: [],
      addToCompare: (product) => {
        set((state) => {
          if (state.compareProducts.length >= 4) return state
          if (state.compareProducts.find((item) => item.id === product.id)) return state
          return { compareProducts: [...state.compareProducts, product] }
        })
      },
      removeFromCompare: (productId) =>
        set((state) => ({ compareProducts: state.compareProducts.filter((item) => item.id !== productId) })),
      clearCompare: () => set({ compareProducts: [] }),

      // UI State
      isCartOpen: false,
      isSearchOpen: false,
      isQuickViewOpen: false,
      quickViewProduct: null,
      isLiveChatOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      openQuickView: (product) => set({ isQuickViewOpen: true, quickViewProduct: product }),
      closeQuickView: () => set({ isQuickViewOpen: false, quickViewProduct: null }),
      openLiveChat: () => set({ isLiveChatOpen: true }),
      closeLiveChat: () => set({ isLiveChatOpen: false }),

      // User & Orders
      user: null,
      orders: [],
      rewardsPoints: 0,
      login: (user) => set({ user, rewardsPoints: user.rewardsPoints }),
      logout: () => set({ user: null }),
      addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
      getOrderById: (orderId) => get().orders.find((order) => order.id === orderId),
      addRewardsPoints: (points) => set((state) => ({ rewardsPoints: state.rewardsPoints + points })),
      redeemRewardsPoints: (points) => set((state) => ({ rewardsPoints: Math.max(0, state.rewardsPoints - points) })),
    }),
    { name: "splendid-beauty-store" },
  ),
)

// Helper to convert API Product to CartProduct
export function apiProductToCartProduct(product: APIProduct): CartProduct {
  return {
    id: product.id,
    sku: product.sku,
    stockQuantity: product.stockQuantity,
    weight: product.weight,
    brand: product.brandName,
    name: product.title,
    price: product.price.amount,
    originalPrice: product.compareAtPrice?.amount,
    rating: product.averageRating,
    reviews: product.reviewCount,
    badge: product.badge,
    image: product.featuredImage,
    images: product.images,
    description: product.descriptionHtml.replace(/<[^>]*>/g, ""),
    ingredients: product.ingredients,
    benefits: product.benefits,
    concerns: product.targetConcerns,
    countryOfOrigin: product.countryOfOrigin,
    usage: product.usageInstructions,
    heritage: product.heritage,
    category: product.category,
    inStock: product.inStock,
  }
}

// Type alias for backward compatibility
export type Product = CartProduct
