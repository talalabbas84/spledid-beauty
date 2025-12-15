# API Reference

Complete API documentation for the Melanin Luxe e-commerce platform.

---

## Product API (`lib/api/shopify.ts`)

### getProducts

Fetches products with optional filtering and sorting.

\`\`\`typescript
async function getProducts(options?: {
  category?: string
  brandSlug?: string
  concern?: string
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular'
  limit?: number
}): Promise<Product[]>
\`\`\`

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| category | string | Filter by product category |
| brandSlug | string | Filter by brand slug |
| concern | string | Filter by skin concern slug |
| sort | string | Sort order |
| limit | number | Maximum products to return |

**Example:**
\`\`\`typescript
import { getProducts } from '@/lib/api/shopify'

// Get all products
const products = await getProducts()

// Get products for dry skin
const dryProducts = await getProducts({ concern: 'dry-skin' })

// Get newest products, limit 8
const newProducts = await getProducts({ sort: 'newest', limit: 8 })
\`\`\`

---

### getProductById

Fetches a single product by ID.

\`\`\`typescript
async function getProductById(id: string): Promise<Product | null>
\`\`\`

**Example:**
\`\`\`typescript
const product = await getProductById('prod_1')
\`\`\`

---

### getProductByHandle

Fetches a single product by URL handle.

\`\`\`typescript
async function getProductByHandle(handle: string): Promise<Product | null>
\`\`\`

**Example:**
\`\`\`typescript
const product = await getProductByHandle('shea-butter-radiance-cream')
\`\`\`

---

### searchProducts

Search products by query string.

\`\`\`typescript
async function searchProducts(query: string): Promise<Product[]>
\`\`\`

**Example:**
\`\`\`typescript
const results = await searchProducts('shea butter')
\`\`\`

---

### getFeaturedProducts

Get featured/bestseller products for homepage.

\`\`\`typescript
async function getFeaturedProducts(): Promise<Product[]>
\`\`\`

---

## Cart API

### createCart

Creates a new shopping cart (Shopify integration).

\`\`\`typescript
async function createCart(): Promise<Cart>
\`\`\`

---

### addToCart

Adds a product variant to cart.

\`\`\`typescript
async function addToCart(
  cartId: string, 
  variantId: string, 
  quantity: number
): Promise<Cart>
\`\`\`

---

### updateCartItem

Updates quantity of a cart item.

\`\`\`typescript
async function updateCartItem(
  cartId: string, 
  lineId: string, 
  quantity: number
): Promise<Cart>
\`\`\`

---

### removeFromCart

Removes an item from cart.

\`\`\`typescript
async function removeFromCart(
  cartId: string, 
  lineId: string
): Promise<Cart>
\`\`\`

---

## Content API (`lib/api/strapi.ts`)

### getBrands

Fetches all brands.

\`\`\`typescript
async function getBrands(): Promise<Brand[]>
\`\`\`

---

### getBrandBySlug

Fetches a single brand by slug.

\`\`\`typescript
async function getBrandBySlug(slug: string): Promise<Brand | null>
\`\`\`

---

### getFeaturedBrands

Fetches featured brands for homepage.

\`\`\`typescript
async function getFeaturedBrands(): Promise<Brand[]>
\`\`\`

---

### getConcerns

Fetches all skin concerns.

\`\`\`typescript
async function getConcerns(): Promise<Concern[]>
\`\`\`

---

### getConcernBySlug

Fetches a single concern by slug.

\`\`\`typescript
async function getConcernBySlug(slug: string): Promise<Concern | null>
\`\`\`

---

### getGiftCards

Fetches available gift card options.

\`\`\`typescript
async function getGiftCards(): Promise<GiftCard[]>
\`\`\`

---

### getRewardsProgram

Fetches rewards program configuration.

\`\`\`typescript
async function getRewardsProgram(): Promise<RewardsProgram>
\`\`\`

---

## Seller API (`lib/api/strapi.ts`)

### getSellerProducts

Fetches products for a specific seller.

\`\`\`typescript
async function getSellerProducts(sellerId: string): Promise<SellerProduct[]>
\`\`\`

---

### getSellerOrders

Fetches orders for a specific seller.

\`\`\`typescript
async function getSellerOrders(sellerId: string): Promise<SellerOrder[]>
\`\`\`

---

### getSellerStats

Fetches dashboard statistics for a seller.

\`\`\`typescript
async function getSellerStats(sellerId: string): Promise<SellerStats>
\`\`\`

---

## Type Definitions

### Product

\`\`\`typescript
interface Product {
  id: string
  handle: string
  sku: string
  name: string
  brand: string
  brandSlug: string
  description: string
  descriptionHtml: string
  price: number
  compareAtPrice?: number
  currency: string
  images: string[]
  featuredImage: string
  category: string
  tags: string[]
  targetConcerns: string[]
  benefits: string[]
  keyIngredients: {
    name: string
    benefit: string
    origin?: string
  }[]
  inciIngredients: string
  plainIngredients: string[]
  usageInstructions: string
  heritage: {
    origin: string
    story: string
    culturalSignificance?: string
  }
  rating: number
  reviewCount: number
  stockQuantity: number
  inStock: boolean
  weight: number
  createdAt: string
  updatedAt: string
}
\`\`\`

---

### Brand

\`\`\`typescript
interface Brand {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  coverImage: string
  origin: string
  story: string
  values: string[]
  foundedYear: number
  productCount: number
}
\`\`\`

---

### Concern

\`\`\`typescript
interface Concern {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}
\`\`\`

---

### CartProduct

\`\`\`typescript
interface CartProduct {
  id: string
  name: string
  brand: string
  price: number
  compareAtPrice?: number
  image: string
  quantity: number
  variant?: string
}
\`\`\`

---

### SellerProduct

\`\`\`typescript
interface SellerProduct {
  id: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  inventory: number
  status: 'active' | 'draft' | 'archived'
  category: string
  image: string
  sales: number
  views: number
  createdAt: string
}
\`\`\`

---

### SellerOrder

\`\`\`typescript
interface SellerOrder {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  items: {
    productId: string
    name: string
    quantity: number
    price: number
  }[]
  total: number
  commission: number
  netAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
}
\`\`\`

---

### SellerStats

\`\`\`typescript
interface SellerStats {
  totalSales: number
  totalOrders: number
  totalProducts: number
  pendingOrders: number
  averageOrderValue: number
  conversionRate: number
  topProducts: {
    id: string
    name: string
    sales: number
    revenue: number
  }[]
  recentOrders: SellerOrder[]
  salesByMonth: {
    month: string
    sales: number
  }[]
}
\`\`\`

---

### User & Auth

\`\`\`typescript
type UserRole = 'buyer' | 'vendor' | 'admin'

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  vendorId?: string
  createdAt: string
}

interface RegisterData {
  email: string
  password: string
  name: string
  role?: UserRole
  businessName?: string
  businessType?: string
}
