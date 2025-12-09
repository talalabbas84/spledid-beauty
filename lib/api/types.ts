// =============================================================================
// Core API Types - Single source of truth for all data types
// =============================================================================

// User & Auth Types
export type UserRole = "buyer" | "vendor" | "admin"

// Price Types
export interface ProductPrice {
  amount: number
  currencyCode: string
}

// Product Types
export interface ProductReview {
  id: string
  name: string
  rating: number
  date: string
  title: string
  review: string
  verified: boolean
  helpful: number
  avatar?: string
}

export interface BeforeAfterImage {
  before: string
  after: string
}

export interface Product {
  id: string
  handle: string
  sku: string
  title: string
  brandSlug: string
  brandName: string
  price: ProductPrice
  compareAtPrice?: ProductPrice
  featuredImage: string
  images: string[]
  descriptionHtml: string
  ingredients: string[]
  inciIngredients: string
  plainIngredients: string
  benefits: string[]
  targetConcerns: string[]
  countryOfOrigin: string
  usageInstructions: string
  heritage: string
  category: string
  beforeAfterImages?: BeforeAfterImage[]
  averageRating: number
  reviewCount: number
  reviews?: ProductReview[]
  stockQuantity: number
  inStock: boolean
  weight: number
  badge?: string
}

// Brand Types
export interface Brand {
  id: string
  slug: string
  name: string
  origin: string
  shortDescription: string
  story: string
  culturalSignificance: string
  manufacturingRoots: string
  certifications: string[]
  logoUrl: string
  heroImageUrl?: string
  foundedYear: number
  artisansEmployed: number
  organicCommitment: string
}

// Concern Types
export interface Concern {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount: number
}

export interface BeforeAfterStory {
  id: string
  productId: string
  customerName: string
  beforeImage: string
  afterImage: string
  duration: string
  testimonial: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  variantId?: string
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  currency: string
}

export interface WishlistItem {
  productId: string
  addedAt: Date
}

// Gift Card Types
export interface GiftCard {
  id: string
  amount: number
  image: string
}

// Rewards Types
export interface RewardsTier {
  name: string
  minPoints: number
  benefits: string[]
}

export interface RewardsRedemption {
  points: number
  value: number
}

export interface RewardsProgram {
  pointsPerDollar: number
  tiers: RewardsTier[]
  redemption: RewardsRedemption[]
}

// Seller Types
export type SellerProductStatus = "approved" | "pending" | "rejected" | "draft"
export type SellerOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "returned"

export interface SellerProduct {
  id: string
  handle: string
  title: string
  price: number
  status: SellerProductStatus
  stockQuantity: number
  createdAt: string
  updatedAt: string
  image: string
}

export interface SellerOrder {
  id: string
  orderNumber: string
  date: string
  customerName: string
  customerEmail: string
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  total: number
  status: SellerOrderStatus
  shippingAddress: {
    line1: string
    line2?: string
    city: string
    province: string
    postalCode: string
    country: string
  }
  trackingNumber?: string
}

export interface SellerStats {
  totalProducts: number
  totalOrders: number
  pendingApprovals: number
  totalRevenue: number
  pendingPayout: number
}

// Content Types
export interface AboutContent {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  story: {
    title: string
    content: string
    image: string
  }
  values: {
    title: string
    description: string
    icon: string
  }[]
  commitment: {
    title: string
    content: string
  }
}

export interface HomepageContent {
  hero: {
    title: string
    subtitle: string
    description: string
    primaryCta: { text: string; href: string }
    secondaryCta: { text: string; href: string }
    backgroundImage: string
  }
  featuredCollections: {
    title: string
    subtitle: string
    collections: {
      name: string
      description: string
      image: string
      href: string
    }[]
  }
}

// Vendor Types (for marketplace)
export type VendorStatus = "pending" | "approved" | "suspended" | "rejected"

export interface Vendor {
  id: string
  businessName: string
  email: string
  phone: string
  status: VendorStatus
  logo?: string
  description: string
  country: string
  city: string
  website?: string
  foundedYear?: number
  artisansEmployed?: number
  certifications: string[]
  joinedDate: string
  totalSales: number
  totalOrders: number
  rating: number
  reviewCount: number
  commissionRate: number
}

// Dispute Types
export type DisputeStatus = "open" | "investigating" | "resolved" | "escalated"

export interface Dispute {
  id: string
  orderId: string
  vendorId: string
  customerId: string
  reason: string
  description: string
  status: DisputeStatus
  createdAt: string
  resolvedAt?: string
  resolution?: string
}
