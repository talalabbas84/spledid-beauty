# Melanin Luxe - E-commerce Platform Documentation

A full-featured multi-vendor e-commerce marketplace for luxury African and Caribbean beauty products built with Next.js 15, TypeScript, and Tailwind CSS.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Architecture](#architecture)
5. [Features](#features)
6. [API Abstraction Layer](#api-abstraction-layer)
7. [Authentication System](#authentication-system)
8. [State Management](#state-management)
9. [Portals](#portals)
10. [Backend Integration Guide](#backend-integration-guide)
11. [Environment Variables](#environment-variables)

---

## Project Overview

Melanin Luxe is a multi-vendor marketplace connecting customers with luxury beauty products from African and Caribbean heritage brands. The platform supports three user roles:

- **Buyers** - Browse, purchase products, manage wishlists, earn rewards
- **Vendors** - Manage products, orders, payouts, and store settings
- **Admins** - Platform-wide management of vendors, orders, disputes, and settings

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| State Management | Zustand |
| Icons | Lucide React |
| Fonts | Playfair Display, Inter |

---

## Folder Structure

\`\`\`
├── app/                          # Next.js App Router pages
│   ├── (buyer pages)             # Public buyer-facing pages
│   │   ├── page.tsx              # Homepage
│   │   ├── shop/                 # Product listing
│   │   ├── product/[id]/         # Product detail
│   │   ├── brands/               # Brand listing & detail
│   │   ├── concerns/[slug]/      # Products by skin concern
│   │   ├── cart/                 # Shopping cart
│   │   ├── checkout/             # Checkout flow
│   │   ├── account/              # User account
│   │   ├── wishlist/             # Saved items
│   │   ├── rewards/              # Loyalty program
│   │   ├── gift-cards/           # Gift cards
│   │   ├── blog/                 # Blog listing & posts
│   │   └── ...                   # Other pages
│   │
│   ├── seller/                   # Vendor portal (protected)
│   │   ├── layout.tsx            # Vendor dashboard layout
│   │   ├── page.tsx              # Vendor dashboard
│   │   ├── login/                # Vendor login
│   │   ├── register/             # Vendor registration
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   ├── payouts/              # Payout history
│   │   ├── settings/             # Store settings
│   │   └── help/                 # Vendor support
│   │
│   ├── admin/                    # Admin portal (protected)
│   │   ├── layout.tsx            # Admin dashboard layout
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── login/                # Admin login
│   │   ├── vendors/              # Vendor management
│   │   ├── products/             # Product moderation
│   │   ├── orders/               # All orders
│   │   ├── customers/            # Customer management
│   │   ├── disputes/             # Dispute resolution
│   │   └── settings/             # Platform settings
│   │
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles & theme tokens
│
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui base components
│   ├── header.tsx                # Main navigation header
│   ├── footer.tsx                # Site footer
│   ├── cart-drawer.tsx           # Slide-out cart
│   ├── search-modal.tsx          # Search overlay
│   ├── product-card.tsx          # Product card component
│   ├── auth-guard.tsx            # Route protection wrapper
│   └── ...                       # Other components
│
├── lib/                          # Core library code
│   ├── api/                      # API abstraction layer
│   │   ├── types.ts              # TypeScript type definitions
│   │   ├── config.ts             # API configuration
│   │   ├── shopify.ts            # Product/cart API (Shopify-ready)
│   │   ├── strapi.ts             # Content API (Strapi-ready)
│   │   └── index.ts              # Unified exports
│   │
│   ├── mocks/                    # Mock data (dev only)
│   │   ├── products.mock.ts      # Product data
│   │   ├── brands.mock.ts        # Brand data
│   │   ├── concerns.mock.ts      # Skin concern data
│   │   ├── giftcards.mock.ts     # Gift card data
│   │   ├── seller.mock.ts        # Seller dashboard data
│   │   └── content.mock.ts       # CMS content data
│   │
│   ├── store.ts                  # Buyer store (cart, wishlist, UI)
│   ├── auth-store.ts             # Authentication store
│   ├── marketplace-store.ts      # Vendor/admin store
│   └── utils.ts                  # Utility functions
│
├── hooks/                        # Custom React hooks
│   └── use-mobile.tsx            # Mobile detection hook
│
├── public/                       # Static assets
│   └── (images)                  # Product & brand images
│
└── docs/                         # Documentation
    └── README.md                 # This file
\`\`\`

---

## Architecture

### Data Flow

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│  Pages/Components                                            │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │   Zustand       │    │   API Layer     │                 │
│  │   Stores        │    │   (lib/api/)    │                 │
│  │                 │    │                 │                 │
│  │ - store.ts      │    │ - shopify.ts    │                 │
│  │ - auth-store.ts │    │ - strapi.ts     │                 │
│  │ - marketplace   │    │                 │                 │
│  └─────────────────┘    └────────┬────────┘                 │
│                                  │                           │
├──────────────────────────────────┼───────────────────────────┤
│                                  │                           │
│              ┌───────────────────┴───────────────────┐       │
│              │         MOCK DATA (Dev)               │       │
│              │         lib/mocks/*.ts                │       │
│              └───────────────────┬───────────────────┘       │
│                                  │                           │
│              ┌───────────────────┴───────────────────┐       │
│              │         BACKEND (Production)          │       │
│              │                                       │       │
│              │  ┌─────────────┐  ┌─────────────┐    │       │
│              │  │  Shopify    │  │   Strapi    │    │       │
│              │  │  Storefront │  │   CMS       │    │       │
│              │  └─────────────┘  └─────────────┘    │       │
│              └───────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Features

### Buyer Features

| Feature | Description | Location |
|---------|-------------|----------|
| Product Browsing | Grid/list view with filtering & sorting | `/shop` |
| Product Search | Full-text search with suggestions | `SearchModal` component |
| Product Detail | Images, variants, reviews, related products | `/product/[id]` |
| Shopping Cart | Add/remove items, quantity adjustment | `CartDrawer` component |
| Wishlist | Save products for later | `/wishlist` |
| Product Compare | Compare up to 4 products side-by-side | `CompareDrawer` component |
| Checkout | Multi-step checkout flow | `/checkout` |
| User Account | Profile, orders, addresses, settings | `/account` |
| Brand Pages | Browse by brand with heritage stories | `/brands`, `/brands/[slug]` |
| Skin Concerns | Filter products by skin concern | `/concerns/[slug]` |
| Rewards Program | Loyalty points and tiers | `/rewards` |
| Gift Cards | Purchase and redeem gift cards | `/gift-cards` |
| Blog | Beauty tips and tutorials | `/blog` |

### Vendor Features

| Feature | Description | Location |
|---------|-------------|----------|
| Dashboard | Sales overview, recent orders, stats | `/seller` |
| Product Management | Add, edit, delete products | `/seller/products` |
| Order Management | View and fulfill orders | `/seller/orders` |
| Payout Tracking | View earnings and payout history | `/seller/payouts` |
| Store Settings | Business info, shipping, policies | `/seller/settings` |
| Analytics | Sales performance metrics | `/seller` (dashboard) |

### Admin Features

| Feature | Description | Location |
|---------|-------------|----------|
| Dashboard | Platform-wide metrics and alerts | `/admin` |
| Vendor Management | Approve, suspend, manage vendors | `/admin/vendors` |
| Product Moderation | Review and approve products | `/admin/products` |
| Order Overview | All marketplace orders | `/admin/orders` |
| Customer Management | View and manage customers | `/admin/customers` |
| Dispute Resolution | Handle customer disputes | `/admin/disputes` |
| Platform Settings | Commission, shipping, notifications | `/admin/settings` |

---

## API Abstraction Layer

The API layer (`lib/api/`) provides a clean abstraction for data fetching, making it easy to switch between mock data and real backends.

### Configuration (`lib/api/config.ts`)

\`\`\`typescript
export const config = {
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  shopify: {
    storeUrl: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || '',
    storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN || '',
  },
  strapi: {
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL || '',
    apiToken: process.env.STRAPI_API_TOKEN || '',
  },
}
\`\`\`

### Product API (`lib/api/shopify.ts`)

\`\`\`typescript
// Get all products with optional filtering
getProducts(options?: {
  category?: string
  brandSlug?: string
  concern?: string
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular'
  limit?: number
}): Promise<Product[]>

// Get single product
getProductById(id: string): Promise<Product | null>
getProductByHandle(handle: string): Promise<Product | null>

// Search products
searchProducts(query: string): Promise<Product[]>

// Featured products
getFeaturedProducts(): Promise<Product[]>

// Cart operations (for Shopify integration)
createCart(): Promise<Cart>
addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart>
updateCartItem(cartId: string, lineId: string, quantity: number): Promise<Cart>
removeFromCart(cartId: string, lineId: string): Promise<Cart>
\`\`\`

### Content API (`lib/api/strapi.ts`)

\`\`\`typescript
// Brands
getBrands(): Promise<Brand[]>
getBrandBySlug(slug: string): Promise<Brand | null>
getFeaturedBrands(): Promise<Brand[]>

// Concerns
getConcerns(): Promise<Concern[]>
getConcernBySlug(slug: string): Promise<Concern | null>

// Gift Cards & Rewards
getGiftCards(): Promise<GiftCard[]>
getRewardsProgram(): Promise<RewardsProgram>

// Seller Data
getSellerProducts(sellerId: string): Promise<SellerProduct[]>
getSellerOrders(sellerId: string): Promise<SellerOrder[]>
getSellerStats(sellerId: string): Promise<SellerStats>

// Content
getAboutContent(): Promise<AboutContent>
getHomepageContent(): Promise<HomepageContent>
\`\`\`

---

## Authentication System

### Auth Store (`lib/auth-store.ts`)

The authentication system supports three user roles with Zustand state management:

\`\`\`typescript
type UserRole = 'buyer' | 'vendor' | 'admin'

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  vendorId?: string  // For vendors
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login(email: string, password: string, role?: UserRole): Promise<boolean>
  register(data: RegisterData): Promise<boolean>
  logout(): void
  
  // Role checks
  isVendor(): boolean
  isAdmin(): boolean
  isBuyer(): boolean
}
\`\`\`

### Route Protection (`components/auth-guard.tsx`)

\`\`\`typescript
<AuthGuard 
  requiredRole="vendor" 
  redirectTo="/seller/login"
>
  {children}
</AuthGuard>
\`\`\`

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Vendor | vendor@demo.com | vendor123 |
| Admin | admin@demo.com | admin123 |

---

## State Management

### Buyer Store (`lib/store.ts`)

Manages cart, wishlist, compare, and UI state:

\`\`\`typescript
interface BuyerStore {
  // Cart
  cart: CartProduct[]
  addToCart(product: CartProduct): void
  removeFromCart(id: string): void
  updateQuantity(id: string, quantity: number): void
  clearCart(): void
  cartTotal: number
  cartCount: number
  
  // Wishlist
  wishlist: CartProduct[]
  addToWishlist(product: CartProduct): void
  removeFromWishlist(id: string): void
  isInWishlist(id: string): boolean
  
  // Compare
  compareList: CartProduct[]
  addToCompare(product: CartProduct): void
  removeFromCompare(id: string): void
  
  // UI State
  isCartOpen: boolean
  isSearchOpen: boolean
  isCompareOpen: boolean
  setCartOpen(open: boolean): void
  setSearchOpen(open: boolean): void
  setCompareOpen(open: boolean): void
}
\`\`\`

### Marketplace Store (`lib/marketplace-store.ts`)

Manages vendor and admin-specific state:

\`\`\`typescript
interface MarketplaceStore {
  // Vendor
  vendorProfile: VendorProfile | null
  vendorProducts: SellerProduct[]
  vendorOrders: SellerOrder[]
  vendorStats: SellerStats | null
  
  // Admin
  allVendors: VendorProfile[]
  allOrders: SellerOrder[]
  platformStats: PlatformStats | null
}
\`\`\`

---

## Portals

### Buyer Portal (Default)
- Public-facing storefront
- No authentication required for browsing
- Account features require login

### Vendor Portal (`/seller/*`)
- Protected routes requiring vendor role
- Custom layout with sidebar navigation
- Dashboard, products, orders, payouts, settings

### Admin Portal (`/admin/*`)
- Protected routes requiring admin role
- Custom layout with sidebar navigation
- Platform-wide management capabilities

---

## Backend Integration Guide

### Step 1: Set Environment Variables

\`\`\`env
# Disable mock data
NEXT_PUBLIC_USE_MOCK_DATA=false

# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token

# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your-strapi-api-token
\`\`\`

### Step 2: Implement API Functions

In `lib/api/shopify.ts`, replace mock implementations:

\`\`\`typescript
export async function getProducts(options?: ProductFilters): Promise<Product[]> {
  if (shouldUseMockData()) {
    // Current mock implementation
    return mockProducts
  }
  
  // Real Shopify implementation
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            priceRange { ... }
            images(first: 5) { ... }
          }
        }
      }
    }
  `
  
  const response = await fetch(
    `https://${config.shopify.storeUrl}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.shopify.storefrontToken,
      },
      body: JSON.stringify({ query, variables: { first: 50 } }),
    }
  )
  
  const { data } = await response.json()
  return transformShopifyProducts(data.products.edges)
}
\`\`\`

### Step 3: Authentication Integration

Replace mock auth in `lib/auth-store.ts` with your auth provider:

\`\`\`typescript
// Example with Supabase
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)

async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) return false
  
  // Fetch user profile with role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()
  
  set({ user: profile, isAuthenticated: true })
  return true
}
\`\`\`

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_USE_MOCK_DATA` | Use mock data instead of real API | Yes (set to `true` for dev) |
| `NEXT_PUBLIC_SHOPIFY_STORE_URL` | Shopify store URL | For Shopify integration |
| `SHOPIFY_STOREFRONT_TOKEN` | Shopify Storefront API token | For Shopify integration |
| `NEXT_PUBLIC_STRAPI_URL` | Strapi CMS URL | For Strapi integration |
| `STRAPI_API_TOKEN` | Strapi API token | For Strapi integration |

---

## Type Definitions

All types are defined in `lib/api/types.ts`:

\`\`\`typescript
// Core Types
interface Product { ... }
interface Brand { ... }
interface Concern { ... }
interface CartProduct { ... }
interface Cart { ... }

// User Types
type UserRole = 'buyer' | 'vendor' | 'admin'
interface User { ... }

// Seller Types
interface SellerProduct { ... }
interface SellerOrder { ... }
interface SellerStats { ... }
interface VendorProfile { ... }

// Content Types
interface GiftCard { ... }
interface RewardsProgram { ... }
interface AboutContent { ... }
interface HomepageContent { ... }
\`\`\`

---

## UI Components

### shadcn/ui Components Used

- Accordion, Alert, Avatar, Badge, Button
- Card, Checkbox, Dialog, Dropdown Menu
- Input, Label, Select, Separator
- Sheet, Skeleton, Slider, Switch
- Table, Tabs, Textarea, Toast, Tooltip

### Custom Components

| Component | Description |
|-----------|-------------|
| `Header` | Main navigation with search, cart, account |
| `Footer` | Site footer with links and newsletter |
| `CartDrawer` | Slide-out cart panel |
| `SearchModal` | Full-screen search overlay |
| `ProductCard` | Product display card |
| `AuthGuard` | Route protection wrapper |
| `CompareDrawer` | Product comparison panel |
| `QuickViewModal` | Product quick view popup |

---

## Mobile Responsiveness

All pages are fully responsive with:

- Mobile-first design approach
- Collapsible sidebar navigation for portals
- Card-based layouts for tables on mobile
- Touch-friendly buttons and interactions
- Horizontal scrolling for tabs when needed

---

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set environment variables (copy `.env.example` to `.env.local`)
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

---

## License

Proprietary - All rights reserved
