"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { User, Package, Heart, MapPin, Gift, Settings, LogOut, ChevronRight, Edit2, Plus, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useStore } from "@/lib/store"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"

const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "Dec 5, 2024",
    status: "delivered",
    total: 127.0,
    items: 3,
    image: "/beauty-products-box.jpg",
  },
  {
    id: "ORD-2024-002",
    date: "Nov 28, 2024",
    status: "shipped",
    total: 89.0,
    items: 2,
    image: "/skincare-products-display.png",
  },
  {
    id: "ORD-2024-003",
    date: "Nov 15, 2024",
    status: "processing",
    total: 156.0,
    items: 4,
    image: "/hair-care-products.png",
  },
]

const savedAddresses = [
  {
    id: 1,
    name: "Home",
    address: "123 Main Street, Apt 4B",
    city: "Toronto",
    state: "ON",
    zip: "M5V 2T6",
    country: "Canada",
    isDefault: true,
  },
  {
    id: 2,
    name: "Office",
    address: "456 Business Ave, Suite 200",
    city: "Toronto",
    state: "ON",
    zip: "M5H 2N2",
    country: "Canada",
    isDefault: false,
  },
]

const statusColors = {
  delivered: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
}

export default function AccountPage() {
  const { user, wishlist, rewardsPoints, logout } = useStore()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Simulated login state
  const [activeTab, setActiveTab] = useState("overview")
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    backInStock: true,
  })

  // Show login/register if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <CartDrawer />
        <SearchModal />
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to access your account and orders</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setIsLoggedIn(true)
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">First Name</label>
                    <Input placeholder="Amara" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Last Name</label>
                    <Input placeholder="Johnson" required />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Password</label>
                  <Input type="password" placeholder="••••••••" required />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Phone (Optional)</label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#C9A227]/5 rounded-lg border border-[#C9A227]/20">
                  <input type="checkbox" className="mt-1 accent-[#C9A227]" />
                  <label className="text-sm text-foreground">
                    <span className="font-medium">Get exclusive SMS offers</span>
                    <br />
                    <span className="text-muted-foreground">
                      Receive 15% off your first order and early access to sales. Msg & data rates may apply.
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#C9A227]" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button type="button" className="text-[#C9A227] hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full bg-[#C9A227] text-[#1a1a1a] hover:bg-[#B8922A] h-12">
                  Sign In
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 bg-transparent">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(true)}
                  className="text-[#C9A227] hover:underline font-medium"
                >
                  Create one
                </button>
              </p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <CartDrawer />
      <SearchModal />
      <div className="min-h-screen bg-background pt-20">
        {/* Header Banner */}
        <div className="bg-[#1a1a1a] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E5C158] flex items-center justify-center text-3xl font-serif text-[#1a1a1a]">
                A
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-serif">Welcome back, Amara</h1>
                <p className="text-white/70 mt-1">Gold Member since November 2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
              {[
                { value: "overview", label: "Overview", icon: User },
                { value: "orders", label: "Orders", icon: Package },
                { value: "wishlist", label: "Wishlist", icon: Heart },
                { value: "addresses", label: "Addresses", icon: MapPin },
                { value: "rewards", label: "Rewards", icon: Gift },
                { value: "settings", label: "Settings", icon: Settings },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border data-[state=active]:bg-[#C9A227] data-[state=active]:text-[#1a1a1a] data-[state=active]:border-[#C9A227]"
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center">
                      <Gift className="w-6 h-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rewards Points</p>
                      <p className="text-2xl font-bold text-foreground">{rewardsPoints || 2450}</p>
                    </div>
                  </div>
                  <Link href="/rewards" className="text-sm text-[#C9A227] hover:underline mt-4 inline-block">
                    View Rewards Program →
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-sm text-[#C9A227] hover:underline mt-4 inline-block"
                  >
                    View Order History →
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Wishlist Items</p>
                      <p className="text-2xl font-bold text-foreground">{wishlist.length || 8}</p>
                    </div>
                  </div>
                  <Link href="/wishlist" className="text-sm text-[#C9A227] hover:underline mt-4 inline-block">
                    View Wishlist →
                  </Link>
                </motion.div>
              </div>

              {/* Recent Orders */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif text-foreground">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-sm text-[#C9A227] hover:underline flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {mockOrders.slice(0, 2).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-[#C9A227]/50 transition-colors"
                    >
                      <Image
                        src={order.image || "/placeholder.svg"}
                        alt="Order"
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{order.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.items} items • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
                        <Link
                          href={`/order-tracking?id=${order.id}`}
                          className="text-sm text-[#C9A227] hover:underline"
                        >
                          Track Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <h2 className="text-xl font-serif text-foreground">Order History</h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt="Order"
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{order.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium text-foreground">${order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/order-tracking?id=${order.id}`}>
                            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                              <Truck className="w-4 h-4" />
                              Track
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-foreground">My Wishlist</h2>
                <Link href="/wishlist">
                  <Button variant="outline">View Full Wishlist</Button>
                </Link>
              </div>
              <p className="text-muted-foreground">
                You have {wishlist.length || 0} items in your wishlist.{" "}
                <Link href="/wishlist" className="text-[#C9A227] hover:underline">
                  View all →
                </Link>
              </p>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif text-foreground">Saved Addresses</h2>
                <Button className="bg-[#C9A227] text-[#1a1a1a] hover:bg-[#B8922A] gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Address
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {savedAddresses.map((address) => (
                  <div key={address.id} className="bg-card border border-border rounded-xl p-6 relative">
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 text-xs bg-[#C9A227] text-[#1a1a1a] px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    <h3 className="font-medium text-foreground mb-2">{address.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {address.address}
                      <br />
                      {address.city}, {address.state} {address.zip}
                      <br />
                      {address.country}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Button>
                      {!address.isDefault && (
                        <Button variant="ghost" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="text-center py-8">
                <h2 className="text-xl font-serif text-foreground mb-4">Rewards Program</h2>
                <p className="text-muted-foreground mb-6">
                  You have <span className="text-[#C9A227] font-bold">{rewardsPoints || 2450}</span> points
                </p>
                <Link href="/rewards">
                  <Button className="bg-[#C9A227] text-[#1a1a1a] hover:bg-[#B8922A]">View Full Rewards Program</Button>
                </Link>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-serif text-foreground mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">First Name</label>
                      <Input defaultValue="Amara" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Last Name</label>
                      <Input defaultValue="Johnson" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                    <Input defaultValue="amara@example.com" type="email" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Phone</label>
                    <Input defaultValue="+1 (416) 555-0123" type="tel" />
                  </div>
                  <Button className="bg-[#C9A227] text-[#1a1a1a] hover:bg-[#B8922A]">Save Changes</Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-serif text-foreground mb-6">Notification Preferences</h2>

                <div className="space-y-4">
                  {[
                    { key: "orderUpdates", label: "Order Updates", desc: "Get notified about your order status" },
                    { key: "promotions", label: "Promotions & Sales", desc: "Receive exclusive offers and discounts" },
                    { key: "newArrivals", label: "New Arrivals", desc: "Be the first to know about new products" },
                    {
                      key: "backInStock",
                      label: "Back in Stock Alerts",
                      desc: "Get notified when wishlist items are back",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-serif text-foreground mb-4">Danger Zone</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  )
}
