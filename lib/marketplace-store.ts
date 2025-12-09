// =============================================================================
// Marketplace Store - Vendor and Admin functionality
// =============================================================================

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserRole, VendorStatus, Vendor, Dispute, SellerProductStatus, SellerOrderStatus } from "./api/types"
import type { CartProduct } from "./store"

export interface VendorProduct extends CartProduct {
  vendorId: string
  status: SellerProductStatus
  submittedAt: string
  approvedAt?: string
  rejectionReason?: string
  margin: number
}

export interface VendorOrder {
  id: string
  orderId: string
  vendorId: string
  items: { productId: string; productName: string; quantity: number; price: number; image: string }[]
  subtotal: number
  commission: number
  payout: number
  status: SellerOrderStatus
  customerName: string
  shippingAddress: { address: string; city: string; state: string; zip: string; country: string }
  placedAt: string
  shippedAt?: string
  deliveredAt?: string
  trackingNumber?: string
  carrier?: string
}

export interface PlatformUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  vendorId?: string
  createdAt: string
}

interface MarketplaceState {
  currentUser: PlatformUser | null
  vendors: Vendor[]
  vendorProducts: VendorProduct[]
  vendorOrders: VendorOrder[]
  disputes: Dispute[]

  // Auth
  loginAs: (role: UserRole, vendorId?: string) => void
  logoutMarketplace: () => void

  // Vendor Management
  registerVendor: (
    vendor: Omit<Vendor, "id" | "status" | "joinedDate" | "totalSales" | "totalOrders" | "rating" | "reviewCount">,
  ) => void
  updateVendor: (vendorId: string, updates: Partial<Vendor>) => void
  approveVendor: (vendorId: string) => void
  rejectVendor: (vendorId: string, reason: string) => void
  suspendVendor: (vendorId: string) => void

  // Product Management
  addVendorProduct: (product: Omit<VendorProduct, "id" | "status" | "submittedAt">) => void
  updateVendorProduct: (productId: string, updates: Partial<VendorProduct>) => void
  deleteVendorProduct: (productId: string) => void
  submitProductForApproval: (productId: string) => void
  approveProduct: (productId: string) => void
  rejectProduct: (productId: string, reason: string) => void

  // Order Management
  updateOrderFulfillment: (
    orderId: string,
    status: SellerOrderStatus,
    trackingInfo?: { trackingNumber: string; carrier: string },
  ) => void

  // Disputes
  createDispute: (dispute: Omit<Dispute, "id" | "status" | "createdAt">) => void
  updateDispute: (disputeId: string, updates: Partial<Dispute>) => void

  // Getters
  getVendorById: (vendorId: string) => Vendor | undefined
  getVendorProducts: (vendorId: string) => VendorProduct[]
  getVendorOrders: (vendorId: string) => VendorOrder[]
  getPendingVendors: () => Vendor[]
  getPendingProducts: () => VendorProduct[]
  getOpenDisputes: () => Dispute[]
}

// Mock data
const mockVendors: Vendor[] = [
  {
    id: "v1",
    businessName: "Heritage Essentials Co.",
    email: "contact@heritageessentials.com",
    phone: "+1 416 555 0123",
    status: "approved",
    logo: "/heritage-essentials-logo-gold.jpg",
    description: "Premium African beauty products sourced directly from artisan communities.",
    country: "Canada",
    city: "Toronto",
    website: "https://heritageessentials.com",
    foundedYear: 2019,
    artisansEmployed: 45,
    certifications: ["Fair Trade Certified", "USDA Organic", "Cruelty-Free"],
    joinedDate: "2023-06-15",
    totalSales: 145680,
    totalOrders: 1234,
    rating: 4.8,
    reviewCount: 892,
    commissionRate: 15,
  },
  {
    id: "v2",
    businessName: "Savanna Glow Beauty",
    email: "hello@savannaglow.com",
    phone: "+1 647 555 0456",
    status: "approved",
    logo: "/savanna-glow-beauty-logo.jpg",
    description: "Authentic shea butter products handcrafted by women's cooperatives.",
    country: "Canada",
    city: "Vancouver",
    foundedYear: 2020,
    artisansEmployed: 28,
    certifications: ["Fair Trade Certified", "Organic"],
    joinedDate: "2023-09-20",
    totalSales: 89450,
    totalOrders: 756,
    rating: 4.6,
    reviewCount: 445,
    commissionRate: 12,
  },
]

const mockVendorOrders: VendorOrder[] = [
  {
    id: "vo1",
    orderId: "ORD-2024-001",
    vendorId: "v1",
    items: [
      {
        productId: "1",
        productName: "African Black Soap Deep Cleanser",
        quantity: 2,
        price: 28,
        image: "/african-black-soap-luxury-skincare.jpg",
      },
    ],
    subtotal: 56,
    commission: 8.4,
    payout: 47.6,
    status: "delivered",
    customerName: "Sarah M.",
    shippingAddress: { address: "123 Main St", city: "Toronto", state: "ON", zip: "M5V 2T6", country: "Canada" },
    placedAt: "2024-12-01T10:30:00Z",
    shippedAt: "2024-12-02T14:00:00Z",
    deliveredAt: "2024-12-05T11:00:00Z",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
  },
  {
    id: "vo2",
    orderId: "ORD-2024-002",
    vendorId: "v1",
    items: [
      {
        productId: "5",
        productName: "Honey & Banana Hair Mask",
        quantity: 1,
        price: 38,
        image: "/honey-hair-mask-luxury-packaging-gold.jpg",
      },
    ],
    subtotal: 38,
    commission: 5.7,
    payout: 32.3,
    status: "shipped",
    customerName: "Michael K.",
    shippingAddress: { address: "456 Oak Ave", city: "Vancouver", state: "BC", zip: "V6B 2W2", country: "Canada" },
    placedAt: "2024-12-06T09:15:00Z",
    shippedAt: "2024-12-07T16:00:00Z",
    trackingNumber: "CP123456789CA",
    carrier: "Canada Post",
  },
]

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      vendors: mockVendors,
      vendorProducts: [],
      vendorOrders: mockVendorOrders,
      disputes: [],

      loginAs: (role, vendorId) => {
        set({
          currentUser: {
            id: `user-${Date.now()}`,
            email:
              role === "admin"
                ? "admin@splendidbeauty.com"
                : role === "vendor"
                  ? "vendor@example.com"
                  : "buyer@example.com",
            firstName: role === "admin" ? "Admin" : role === "vendor" ? "Vendor" : "Buyer",
            lastName: "User",
            role,
            vendorId: role === "vendor" ? vendorId || "v1" : undefined,
            createdAt: new Date().toISOString(),
          },
        })
      },

      logoutMarketplace: () => set({ currentUser: null }),

      registerVendor: (vendor) => {
        const newVendor: Vendor = {
          ...vendor,
          id: `v${Date.now()}`,
          status: "pending",
          joinedDate: new Date().toISOString().split("T")[0],
          totalSales: 0,
          totalOrders: 0,
          rating: 0,
          reviewCount: 0,
        }
        set((state) => ({ vendors: [...state.vendors, newVendor] }))
      },

      updateVendor: (vendorId, updates) => {
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === vendorId ? { ...v, ...updates } : v)),
        }))
      },

      approveVendor: (vendorId) => {
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === vendorId ? { ...v, status: "approved" as VendorStatus } : v)),
        }))
      },

      rejectVendor: (vendorId, _reason) => {
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === vendorId ? { ...v, status: "rejected" as VendorStatus } : v)),
        }))
      },

      suspendVendor: (vendorId) => {
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === vendorId ? { ...v, status: "suspended" as VendorStatus } : v)),
        }))
      },

      addVendorProduct: (product) => {
        const newProduct: VendorProduct = {
          ...product,
          id: `vp${Date.now()}`,
          status: "draft",
          submittedAt: new Date().toISOString(),
        }
        set((state) => ({ vendorProducts: [...state.vendorProducts, newProduct] }))
      },

      updateVendorProduct: (productId, updates) => {
        set((state) => ({
          vendorProducts: state.vendorProducts.map((p) => (p.id === productId ? { ...p, ...updates } : p)),
        }))
      },

      deleteVendorProduct: (productId) => {
        set((state) => ({ vendorProducts: state.vendorProducts.filter((p) => p.id !== productId) }))
      },

      submitProductForApproval: (productId) => {
        set((state) => ({
          vendorProducts: state.vendorProducts.map((p) =>
            p.id === productId
              ? { ...p, status: "pending" as SellerProductStatus, submittedAt: new Date().toISOString() }
              : p,
          ),
        }))
      },

      approveProduct: (productId) => {
        set((state) => ({
          vendorProducts: state.vendorProducts.map((p) =>
            p.id === productId
              ? { ...p, status: "approved" as SellerProductStatus, approvedAt: new Date().toISOString() }
              : p,
          ),
        }))
      },

      rejectProduct: (productId, reason) => {
        set((state) => ({
          vendorProducts: state.vendorProducts.map((p) =>
            p.id === productId ? { ...p, status: "rejected" as SellerProductStatus, rejectionReason: reason } : p,
          ),
        }))
      },

      updateOrderFulfillment: (orderId, status, trackingInfo) => {
        set((state) => ({
          vendorOrders: state.vendorOrders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status,
                  ...(trackingInfo && { trackingNumber: trackingInfo.trackingNumber, carrier: trackingInfo.carrier }),
                  ...(status === "shipped" && { shippedAt: new Date().toISOString() }),
                  ...(status === "delivered" && { deliveredAt: new Date().toISOString() }),
                }
              : o,
          ),
        }))
      },

      createDispute: (dispute) => {
        const newDispute: Dispute = {
          ...dispute,
          id: `d${Date.now()}`,
          status: "open",
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ disputes: [...state.disputes, newDispute] }))
      },

      updateDispute: (disputeId, updates) => {
        set((state) => ({
          disputes: state.disputes.map((d) => (d.id === disputeId ? { ...d, ...updates } : d)),
        }))
      },

      getVendorById: (vendorId) => get().vendors.find((v) => v.id === vendorId),
      getVendorProducts: (vendorId) => get().vendorProducts.filter((p) => p.vendorId === vendorId),
      getVendorOrders: (vendorId) => get().vendorOrders.filter((o) => o.vendorId === vendorId),
      getPendingVendors: () => get().vendors.filter((v) => v.status === "pending"),
      getPendingProducts: () => get().vendorProducts.filter((p) => p.status === "pending"),
      getOpenDisputes: () => get().disputes.filter((d) => d.status === "open" || d.status === "investigating"),
    }),
    { name: "splendid-marketplace" },
  ),
)
