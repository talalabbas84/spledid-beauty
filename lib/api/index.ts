// =============================================================================
// Unified API Exports - Single import source for all API functions and types
// Usage: import { getProducts, getBrands, type Product } from "@/lib/api"
// =============================================================================

// Shopify API (Products, Cart)
export {
  getProducts,
  getProductByHandle,
  getProductById,
  getFeaturedProducts,
  getRelatedProducts,
  searchProducts,
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  type GetProductsParams,
} from "./shopify"

// Strapi API (Content, Brands, Sellers)
export {
  getBrands,
  getBrandBySlug,
  getFeaturedBrands,
  getConcerns,
  getConcernBySlug,
  getAboutContent,
  getHomepageContent,
  getGiftCards,
  getRewardsProgram,
  getSellerProducts,
  getSellerOrders,
  getSellerStats,
  createSellerProduct,
  updateSellerProduct,
  updateOrderStatus,
} from "./strapi"

// Configuration
export { API_CONFIG, shouldUseMockData } from "./config"

// All Types - Re-export from types.ts
export type {
  // User & Auth
  UserRole,
  // Products
  Product,
  ProductPrice,
  ProductReview,
  BeforeAfterImage,
  // Brands & Concerns
  Brand,
  Concern,
  BeforeAfterStory,
  // Cart
  CartItem,
  Cart,
  WishlistItem,
  // Gift Cards & Rewards
  GiftCard,
  RewardsTier,
  RewardsRedemption,
  RewardsProgram,
  // Seller
  SellerProduct,
  SellerProductStatus,
  SellerOrder,
  SellerOrderStatus,
  SellerStats,
  // Content
  AboutContent,
  HomepageContent,
  // Marketplace
  VendorStatus,
  Vendor,
  DisputeStatus,
  Dispute,
} from "./types"
