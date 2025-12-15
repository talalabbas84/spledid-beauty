# State Management Reference

Documentation for Zustand stores used in the Melanin Luxe platform.

---

## Buyer Store (`lib/store.ts`)

Main store for buyer-facing features.

### Usage

\`\`\`typescript
import { useStore } from '@/lib/store'

function Component() {
  const { cart, addToCart, wishlist, isCartOpen } = useStore()
  // ...
}
\`\`\`

### State

\`\`\`typescript
interface BuyerStore {
  // Cart
  cart: CartProduct[]
  
  // Wishlist
  wishlist: CartProduct[]
  
  // Compare
  compareList: CartProduct[]
  
  // UI State
  isCartOpen: boolean
  isSearchOpen: boolean
  isCompareOpen: boolean
  
  // User (legacy, prefer auth-store)
  user: User | null
}
\`\`\`

### Actions

#### Cart Actions

\`\`\`typescript
// Add product to cart
addToCart(product: CartProduct): void

// Remove product from cart
removeFromCart(id: string): void

// Update product quantity
updateQuantity(id: string, quantity: number): void

// Clear entire cart
clearCart(): void
\`\`\`

#### Wishlist Actions

\`\`\`typescript
// Add to wishlist
addToWishlist(product: CartProduct): void

// Remove from wishlist
removeFromWishlist(id: string): void

// Check if product is in wishlist
isInWishlist(id: string): boolean
\`\`\`

#### Compare Actions

\`\`\`typescript
// Add to compare (max 4)
addToCompare(product: CartProduct): void

// Remove from compare
removeFromCompare(id: string): void

// Clear compare list
clearCompare(): void
\`\`\`

#### UI Actions

\`\`\`typescript
// Toggle cart drawer
setCartOpen(open: boolean): void

// Toggle search modal
setSearchOpen(open: boolean): void

// Toggle compare drawer
setCompareOpen(open: boolean): void
\`\`\`

### Computed Values

\`\`\`typescript
// Get cart total price
cartTotal: number

// Get cart item count
cartCount: number

// Get wishlist count
wishlistCount: number
\`\`\`

---

## Auth Store (`lib/auth-store.ts`)

Authentication and user session management.

### Usage

\`\`\`typescript
import { useAuthStore } from '@/lib/auth-store'

function Component() {
  const { user, isAuthenticated, login, logout } = useAuthStore()
  // ...
}
\`\`\`

### State

\`\`\`typescript
interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
\`\`\`

### Actions

\`\`\`typescript
// Login user
login(
  email: string, 
  password: string, 
  role?: UserRole
): Promise<boolean>

// Register new user
register(data: {
  email: string
  password: string
  name: string
  role?: UserRole
  businessName?: string
  businessType?: string
}): Promise<boolean>

// Logout user
logout(): void

// Check user role
isVendor(): boolean
isAdmin(): boolean
isBuyer(): boolean
\`\`\`

### Example: Protected Route

\`\`\`typescript
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function ProtectedPage() {
  const { isAuthenticated, isVendor } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!isAuthenticated || !isVendor()) {
      router.push('/seller/login')
    }
  }, [isAuthenticated])
  
  // ...
}
\`\`\`

---

## Marketplace Store (`lib/marketplace-store.ts`)

Vendor and admin marketplace data.

### Usage

\`\`\`typescript
import { useMarketplaceStore } from '@/lib/marketplace-store'

function VendorDashboard() {
  const { vendorStats, vendorOrders } = useMarketplaceStore()
  // ...
}
\`\`\`

### State

\`\`\`typescript
interface MarketplaceStore {
  // Vendor Data
  vendorProfile: VendorProfile | null
  vendorProducts: SellerProduct[]
  vendorOrders: SellerOrder[]
  vendorStats: SellerStats | null
  
  // Admin Data
  allVendors: VendorProfile[]
  pendingVendors: VendorProfile[]
  allOrders: SellerOrder[]
  platformStats: PlatformStats | null
  disputes: Dispute[]
}
\`\`\`

### Actions

\`\`\`typescript
// Vendor Actions
loadVendorData(vendorId: string): Promise<void>
updateVendorProfile(data: Partial<VendorProfile>): Promise<void>
addProduct(product: SellerProduct): Promise<void>
updateProduct(id: string, data: Partial<SellerProduct>): Promise<void>
deleteProduct(id: string): Promise<void>
updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>

// Admin Actions
loadAdminData(): Promise<void>
approveVendor(vendorId: string): Promise<void>
suspendVendor(vendorId: string): Promise<void>
resolveDispute(disputeId: string, resolution: string): Promise<void>
\`\`\`

---

## Helper: API Product to Cart Product

Convert API Product type to CartProduct for store operations.

\`\`\`typescript
import { apiProductToCartProduct } from '@/lib/store'
import { getProductById } from '@/lib/api/shopify'

async function handleAddToCart(productId: string) {
  const product = await getProductById(productId)
  if (product) {
    const cartProduct = apiProductToCartProduct(product)
    addToCart(cartProduct)
  }
}
\`\`\`

---

## Persistence

All stores use Zustand's persist middleware to save state to localStorage:

\`\`\`typescript
// Stores automatically persist:
// - Cart items
// - Wishlist items
// - Compare list
// - User session (auth)
// - UI preferences
\`\`\`

To clear persisted state:

\`\`\`typescript
// Clear specific store
localStorage.removeItem('buyer-store')
localStorage.removeItem('auth-store')
localStorage.removeItem('marketplace-store')

// Or programmatically
useStore.persist.clearStorage()
