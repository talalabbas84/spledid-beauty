// Shopify API Layer
// When USE_MOCK_DATA is false and Shopify credentials are set, this will use real Shopify Storefront API
// Currently uses mock data for development

import { API_CONFIG, shouldUseMockData } from "./config"
import { mockProducts } from "../mocks/products.mock"
import type { Product, Cart, CartItem } from "./types"

export interface GetProductsParams {
  concern?: string
  brandSlug?: string
  search?: string
  sort?: "featured" | "price-asc" | "price-desc" | "newest" | "rating"
  category?: string
  limit?: number
}

// Simulated API delay for realistic UX during development
const simulateDelay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  if (!shouldUseMockData() && API_CONFIG.shopify.storeUrl) {
    // TODO: Implement real Shopify Storefront API call
    // const response = await fetch(`${API_CONFIG.shopify.storeUrl}/api/...`)
    // return transformShopifyProducts(await response.json())
  }

  await simulateDelay()
  let products = [...mockProducts]

  if (params?.concern) {
    products = products.filter((p) =>
      p.targetConcerns.map((c) => c.toLowerCase().replace(/\s+/g, "-")).includes(params.concern!.toLowerCase()),
    )
  }

  if (params?.brandSlug) {
    products = products.filter((p) => p.brandSlug === params.brandSlug)
  }

  if (params?.category) {
    products = products.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase())
  }

  if (params?.search) {
    const searchLower = params.search.toLowerCase()
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.brandName.toLowerCase().includes(searchLower) ||
        p.descriptionHtml.toLowerCase().includes(searchLower),
    )
  }

  if (params?.sort === "price-asc") {
    products.sort((a, b) => a.price.amount - b.price.amount)
  } else if (params?.sort === "price-desc") {
    products.sort((a, b) => b.price.amount - a.price.amount)
  } else if (params?.sort === "rating") {
    products.sort((a, b) => b.averageRating - a.averageRating)
  } else if (params?.sort === "newest") {
    products.reverse()
  }

  if (params?.limit) {
    products = products.slice(0, params.limit)
  }

  return products
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (!shouldUseMockData() && API_CONFIG.shopify.storeUrl) {
    // TODO: Implement real Shopify API call
  }

  await simulateDelay()
  return mockProducts.find((p) => p.handle === handle) ?? null
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!shouldUseMockData() && API_CONFIG.shopify.storeUrl) {
    // TODO: Implement real Shopify API call
  }

  await simulateDelay()
  return mockProducts.find((p) => p.id === id) ?? null
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  await simulateDelay()
  return mockProducts.filter((p) => p.badge || p.averageRating >= 4.7).slice(0, limit)
}

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  await simulateDelay()
  const product = mockProducts.find((p) => p.id === productId)
  if (!product) return []

  return mockProducts
    .filter((p) => p.id !== productId)
    .filter((p) => p.targetConcerns.some((c) => product.targetConcerns.includes(c)))
    .slice(0, limit)
}

export async function searchProducts(query: string): Promise<Product[]> {
  return getProducts({ search: query })
}

// Cart operations - will integrate with Shopify Cart API
const mockCart: Cart = {
  id: "cart_1",
  items: [],
  subtotal: 0,
  currency: "CAD",
}

export async function getCart(): Promise<Cart> {
  await simulateDelay(50)
  return mockCart
}

export async function addToCart(productId: string, quantity = 1): Promise<Cart> {
  await simulateDelay()
  const product = mockProducts.find((p) => p.id === productId)
  if (!product) throw new Error("Product not found")

  const existingItem = mockCart.items.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    const newItem: CartItem = {
      id: `cart_item_${Date.now()}`,
      productId,
      product,
      quantity,
    }
    mockCart.items.push(newItem)
  }

  mockCart.subtotal = mockCart.items.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0)
  return mockCart
}

export async function updateCartItemQuantity(itemId: string, quantity: number): Promise<Cart> {
  await simulateDelay()
  const item = mockCart.items.find((i) => i.id === itemId)
  if (item) {
    if (quantity <= 0) {
      mockCart.items = mockCart.items.filter((i) => i.id !== itemId)
    } else {
      item.quantity = quantity
    }
  }
  mockCart.subtotal = mockCart.items.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0)
  return mockCart
}

export async function removeFromCart(itemId: string): Promise<Cart> {
  return updateCartItemQuantity(itemId, 0)
}
