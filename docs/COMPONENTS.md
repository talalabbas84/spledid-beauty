# Component Reference

Documentation for all custom components in the Melanin Luxe platform.

---

## Layout Components

### Header

Main navigation header with search, cart, and account.

**File:** `components/header.tsx`

**Features:**
- Logo and brand name
- Main navigation links (Shop, Brands, Concerns, etc.)
- Search trigger
- Wishlist link with count badge
- Cart trigger with count badge
- User account dropdown
- Dark/light mode toggle
- Mobile responsive hamburger menu

**Usage:**
\`\`\`tsx
import Header from '@/components/header'

export default function Page() {
  return (
    <>
      <Header />
      {/* page content */}
    </>
  )
}
\`\`\`

---

### Footer

Site footer with navigation links, newsletter signup, and social links.

**File:** `components/footer.tsx`

**Features:**
- Brand information
- Navigation link columns
- Newsletter signup form
- Social media links
- Copyright and legal links
- Payment method icons

---

### CartDrawer

Slide-out shopping cart panel.

**File:** `components/cart-drawer.tsx`

**Features:**
- Product list with images
- Quantity adjustment
- Remove items
- Subtotal calculation
- Checkout and continue shopping buttons
- Empty cart state

**Usage:**
\`\`\`tsx
import CartDrawer from '@/components/cart-drawer'

// Included in layout, controlled by store
<CartDrawer />
\`\`\`

**Store Integration:**
\`\`\`tsx
import { useStore } from '@/lib/store'

const { isCartOpen, setCartOpen, cart, removeFromCart } = useStore()
\`\`\`

---

### SearchModal

Full-screen search overlay with suggestions.

**File:** `components/search-modal.tsx`

**Features:**
- Full-screen overlay
- Search input with auto-focus
- Real-time search results
- Product suggestions with images
- Recent searches
- Keyboard navigation (Escape to close)

---

### CompareDrawer

Product comparison slide-out panel.

**File:** `components/compare-drawer.tsx`

**Features:**
- Side-by-side product comparison
- Up to 4 products
- Compare prices, ratings, ingredients
- Remove from compare list
- Clear all

---

## Product Components

### ProductCard

Reusable product display card.

**File:** `components/product-card.tsx`

**Props:**
\`\`\`typescript
interface ProductCardProps {
  product: CartProduct
  showQuickView?: boolean
  showCompare?: boolean
}
\`\`\`

**Features:**
- Product image with hover effect
- Brand and name
- Price with sale indicator
- Rating stars
- Add to cart button
- Wishlist toggle
- Quick view trigger
- Compare toggle

---

### QuickViewModal

Product quick view popup.

**File:** `components/quick-view-modal.tsx`

**Features:**
- Product images gallery
- Product details
- Variant selection
- Add to cart
- View full details link

---

### BestSellers

Best selling products carousel.

**File:** `components/best-sellers.tsx`

**Features:**
- Horizontal scrolling carousel
- Featured product cards
- "View All" link

---

### NewArrivals

New products section.

**File:** `components/new-arrivals.tsx`

**Features:**
- Grid of newest products
- Sorted by creation date

---

### BrandLogos

Featured brands logo carousel.

**File:** `components/brand-logos.tsx`

**Features:**
- Horizontal scrolling brand logos
- Links to brand pages

---

## Auth Components

### AuthGuard

Protected route wrapper component.

**File:** `components/auth-guard.tsx`

**Props:**
\`\`\`typescript
interface AuthGuardProps {
  children: React.ReactNode
  requiredRole: UserRole
  redirectTo: string
}
\`\`\`

**Usage:**
\`\`\`tsx
import AuthGuard from '@/components/auth-guard'

export default function SellerLayout({ children }) {
  return (
    <AuthGuard requiredRole="vendor" redirectTo="/seller/login">
      {children}
    </AuthGuard>
  )
}
\`\`\`

---

## UI Components (shadcn/ui)

All base UI components from shadcn/ui are available in `components/ui/`:

| Component | Description |
|-----------|-------------|
| `accordion` | Collapsible content sections |
| `alert` | Alert messages |
| `avatar` | User avatars |
| `badge` | Status badges |
| `button` | Buttons with variants |
| `card` | Card containers |
| `checkbox` | Checkbox inputs |
| `dialog` | Modal dialogs |
| `dropdown-menu` | Dropdown menus |
| `input` | Text inputs |
| `label` | Form labels |
| `select` | Select dropdowns |
| `separator` | Visual separators |
| `sheet` | Slide-out panels |
| `skeleton` | Loading skeletons |
| `slider` | Range sliders |
| `switch` | Toggle switches |
| `table` | Data tables |
| `tabs` | Tab navigation |
| `textarea` | Text areas |
| `toast` | Toast notifications |
| `tooltip` | Tooltips |

**Usage:**
\`\`\`tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
