// Strapi CMS API Layer
// When USE_MOCK_DATA is false and Strapi credentials are set, this will use real Strapi API
// Currently uses mock data for development

import { API_CONFIG, shouldUseMockData } from "./config"
import { mockBrands } from "../mocks/brands.mock"
import { mockConcerns } from "../mocks/concerns.mock"
import { mockAboutContent, mockHomepageContent } from "../mocks/content.mock"
import { mockSellerProducts, mockSellerOrders, mockSellerStats } from "../mocks/seller.mock"
import { mockGiftCards, mockRewardsProgram } from "../mocks/giftcards.mock"
import type {
  Brand,
  Concern,
  AboutContent,
  HomepageContent,
  SellerProduct,
  SellerOrder,
  SellerStats,
  GiftCard,
  RewardsProgram,
} from "./types"

const simulateDelay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms))

// Generic Strapi fetch helper for future integration
async function strapiRequest<T>(endpoint: string): Promise<T> {
  if (!shouldUseMockData() && API_CONFIG.strapi.baseUrl) {
    const response = await fetch(`${API_CONFIG.strapi.baseUrl}/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${API_CONFIG.strapi.apiToken}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) throw new Error(`Strapi API error: ${response.statusText}`)
    return response.json()
  }
  throw new Error("Mock data mode - use specific mock functions")
}

// Brand API
export async function getBrands(): Promise<Brand[]> {
  if (!shouldUseMockData()) {
    // TODO: return strapiRequest<Brand[]>("brands")
  }
  await simulateDelay()
  return mockBrands
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  await simulateDelay()
  return mockBrands.find((b) => b.slug === slug) ?? null
}

export async function getFeaturedBrands(limit = 6): Promise<Brand[]> {
  await simulateDelay()
  return mockBrands.slice(0, limit)
}

// Concern API
export async function getConcerns(): Promise<Concern[]> {
  await simulateDelay()
  return mockConcerns
}

export async function getConcernBySlug(slug: string): Promise<Concern | null> {
  await simulateDelay()
  return mockConcerns.find((c) => c.slug === slug) ?? null
}

// Content API
export async function getAboutContent(): Promise<AboutContent> {
  await simulateDelay()
  return mockAboutContent
}

export async function getHomepageContent(): Promise<HomepageContent> {
  await simulateDelay()
  return mockHomepageContent
}

export async function getGiftCards(): Promise<GiftCard[]> {
  await simulateDelay()
  return mockGiftCards
}

export async function getRewardsProgram(): Promise<RewardsProgram> {
  await simulateDelay()
  return mockRewardsProgram
}

// Seller/Vendor API
export async function getSellerProducts(): Promise<SellerProduct[]> {
  await simulateDelay()
  return mockSellerProducts
}

export async function getSellerOrders(): Promise<SellerOrder[]> {
  await simulateDelay()
  return mockSellerOrders
}

export async function getSellerStats(): Promise<SellerStats> {
  await simulateDelay()
  return mockSellerStats
}

export async function createSellerProduct(product: Partial<SellerProduct>): Promise<SellerProduct> {
  await simulateDelay(200)
  const newProduct: SellerProduct = {
    id: `sp_${Date.now()}`,
    handle: product.title?.toLowerCase().replace(/\s+/g, "-") ?? "",
    title: product.title ?? "",
    price: product.price ?? 0,
    status: "pending",
    stockQuantity: product.stockQuantity ?? 0,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    image: product.image ?? "/new-product-launch.png",
  }
  mockSellerProducts.push(newProduct)
  return newProduct
}

export async function updateSellerProduct(id: string, updates: Partial<SellerProduct>): Promise<SellerProduct | null> {
  await simulateDelay(200)
  const index = mockSellerProducts.findIndex((p) => p.id === id)
  if (index === -1) return null

  mockSellerProducts[index] = {
    ...mockSellerProducts[index],
    ...updates,
    updatedAt: new Date().toISOString().split("T")[0],
  }
  return mockSellerProducts[index]
}

export async function updateOrderStatus(
  orderId: string,
  status: SellerOrder["status"],
  trackingNumber?: string,
): Promise<SellerOrder | null> {
  await simulateDelay(200)
  const order = mockSellerOrders.find((o) => o.id === orderId)
  if (!order) return null

  order.status = status
  if (trackingNumber) {
    order.trackingNumber = trackingNumber
  }
  return order
}
