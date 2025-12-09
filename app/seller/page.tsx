"use client"

import { motion } from "framer-motion"
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Truck,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useMarketplaceStore } from "@/lib/marketplace-store"

const stats = [
  {
    label: "Total Revenue",
    value: "$12,458",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "This month",
  },
  {
    label: "Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "This month",
  },
  {
    label: "Products",
    value: "24",
    change: "+2",
    trend: "up",
    icon: Package,
    description: "Active listings",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "-0.3%",
    trend: "down",
    icon: TrendingUp,
    description: "This month",
  },
]

export default function SellerDashboardPage() {
  const { currentUser, vendors, vendorOrders, getVendorOrders } = useMarketplaceStore()
  const vendor = vendors.find((v) => v.id === currentUser?.vendorId)
  const orders = currentUser?.vendorId ? getVendorOrders(currentUser.vendorId) : []

  const pendingOrders = orders.filter((o) => o.status === "pending")
  const processingOrders = orders.filter((o) => o.status === "processing")
  const shippedOrders = orders.filter((o) => o.status === "shipped")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Welcome back, {vendor?.businessName || "Vendor"}</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/seller/products/new">Add New Product</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div
                    className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Orders Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Order Status</CardTitle>
            <CardDescription>Orders requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm text-foreground">Pending</span>
              </div>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                {pendingOrders.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-foreground">Processing</span>
              </div>
              <Badge variant="outline" className="border-blue-500/50 text-blue-600 dark:text-blue-400">
                {processingOrders.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-foreground">Shipped</span>
              </div>
              <Badge variant="outline" className="border-purple-500/50 text-purple-600 dark:text-purple-400">
                {shippedOrders.length}
              </Badge>
            </div>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/seller/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Orders</CardTitle>
              <CardDescription>Latest orders from customers</CardDescription>
            </div>
            <Button asChild variant="link" className="text-primary">
              <Link href="/seller/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                      <img
                        src={order.items[0]?.image || "/placeholder.svg"}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.orderId}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customerName} • {order.items.length} item(s)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">${order.subtotal.toFixed(2)}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        order.status === "delivered"
                          ? "border-green-500/50 text-green-600 dark:text-green-400"
                          : order.status === "shipped"
                            ? "border-purple-500/50 text-purple-600 dark:text-purple-400"
                            : order.status === "pending"
                              ? "border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                              : "border-blue-500/50 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No orders yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:border-primary bg-transparent"
            >
              <Link href="/seller/products/new">
                <Package className="h-6 w-6" />
                <span>Add Product</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:border-primary bg-transparent"
            >
              <Link href="/seller/orders">
                <ShoppingCart className="h-6 w-6" />
                <span>Manage Orders</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:border-primary bg-transparent"
            >
              <Link href="/seller/payouts">
                <DollarSign className="h-6 w-6" />
                <span>View Payouts</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 flex-col gap-2 hover:border-primary bg-transparent"
            >
              <Link href="/seller/help">
                <AlertCircle className="h-6 w-6" />
                <span>Get Help</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
