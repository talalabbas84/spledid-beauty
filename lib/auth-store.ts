// =============================================================================
// Unified Authentication Store
// Handles authentication for all user roles: buyer, vendor, admin
// =============================================================================

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UserRole } from "./api/types"

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  vendorId?: string
  avatar?: string
  createdAt: string
}

export interface VendorApplication {
  businessName: string
  email: string
  phone: string
  country: string
  city: string
  website?: string
  description: string
  certifications: string[]
}

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  register: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    role: UserRole
    vendorApplication?: VendorApplication
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: () => boolean
  isVendor: () => boolean
  isAdmin: () => boolean
  hasRole: (role: UserRole) => boolean
}

// Demo users - Replace with real API calls in production
const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  "vendor@demo.com": {
    password: "vendor123",
    user: {
      id: "vendor-1",
      email: "vendor@demo.com",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "vendor",
      vendorId: "v1",
      avatar: "/professional-black-woman-headshot.png",
      createdAt: "2023-06-15T00:00:00Z",
    },
  },
  "admin@demo.com": {
    password: "admin123",
    user: {
      id: "admin-1",
      email: "admin@demo.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      createdAt: "2023-01-01T00:00:00Z",
    },
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email, password, role) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 800))

        const demoUser = DEMO_USERS[email.toLowerCase()]
        if (demoUser && demoUser.password === password && demoUser.user.role === role) {
          set({ user: demoUser.user, isLoading: false })
          return { success: true }
        }

        // Allow any valid email/password for demo purposes
        if (email.includes("@") && password.length >= 6) {
          const newUser: AuthUser = {
            id: `user-${Date.now()}`,
            email: email.toLowerCase(),
            firstName: email.split("@")[0],
            lastName: "User",
            role,
            vendorId: role === "vendor" ? "v1" : undefined,
            createdAt: new Date().toISOString(),
          }
          set({ user: newUser, isLoading: false })
          return { success: true }
        }

        set({ isLoading: false })
        return { success: false, error: "Invalid email or password" }
      },

      register: async (data) => {
        set({ isLoading: true })
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (DEMO_USERS[data.email.toLowerCase()]) {
          set({ isLoading: false })
          return { success: false, error: "Email already registered" }
        }

        const newUser: AuthUser = {
          id: `user-${Date.now()}`,
          email: data.email.toLowerCase(),
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          vendorId: data.role === "vendor" ? `v-${Date.now()}` : undefined,
          createdAt: new Date().toISOString(),
        }

        set({ user: newUser, isLoading: false })
        return { success: true }
      },

      logout: () => set({ user: null }),
      isAuthenticated: () => get().user !== null,
      isVendor: () => get().user?.role === "vendor",
      isAdmin: () => get().user?.role === "admin",
      hasRole: (role) => get().user?.role === role,
    }),
    { name: "splendid-auth" },
  ),
)

// Re-export UserRole for convenience
export type { UserRole } from "./api/types"
