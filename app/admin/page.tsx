"use client"

import { motion } from "framer-motion"
import {
  DollarSign,
  ShoppingCart,
  Store,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useMarketplaceStore } from "@/lib/marketplace-store"

const stats = [
  {
    label: "Total Revenue",
    value: "$145,680",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    description: "This month",
  },
  {
    label: "Orders",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    description: "This month",
  },
  {
    label: "Active Vendors",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Store,
    description: "Total",
  },
  {
    label: "Customers",
    value: "8,456",
    change: "+5.8%",
    trend: "up",
    icon: Users,
    description: "Total",
  },
]

export default function AdminDashboardPage() {
  const { vendors, vendorOrders, getPendingVendors, getPendingProducts, getOpenDisputes } = useMarketplaceStore()

  const pendingVendors = getPendingVendors()
  const pendingProducts = getPendingProducts()
  const openDisputes = getOpenDisputes()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your marketplace</p>
      </div>

      {/* Alerts */}
      {(pendingVendors.length > 0 || pendingProducts.length > 0 || openDisputes.length > 0) && (
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div className="flex-1">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  You have{" "}
                  {[
                    pendingVendors.length > 0 && `${pendingVendors.length} pending vendor(s)`,
                    pendingProducts.length > 0 && `${pendingProducts.length} product(s) awaiting approval`,
                    openDisputes.length > 0 && `${openDisputes.length} open dispute(s)`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-yellow-950">
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Vendors */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Pending Vendors</CardTitle>
              <CardDescription>Vendors awaiting approval</CardDescription>
            </div>
            <Button asChild variant="link" className="text-primary">
              <Link href="/admin/vendors">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVendors.slice(0, 3).map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <Store className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{vendor.businessName}</p>
                      <p className="text-xs text-muted-foreground">
                        {vendor.city}, {vendor.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
              {pendingVendors.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No pending vendors</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Orders</CardTitle>
              <CardDescription>Latest platform orders</CardDescription>
            </div>
            <Button asChild variant="link" className="text-primary">
              <Link href="/admin/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendorOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-foreground">{order.orderId}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
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
                            : "border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Vendors */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Top Performing Vendors</CardTitle>
          <CardDescription>Vendors with highest sales this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Vendor</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Orders</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Revenue</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Rating</th>
                </tr>
              </thead>
              <tbody>
                {vendors
                  .filter((v) => v.status === "approved")
                  .sort((a, b) => b.totalSales - a.totalSales)
                  .slice(0, 5)
                  .map((vendor, index) => (
                    <motion.tr
                      key={vendor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border hover:bg-muted"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{vendor.businessName}</p>
                            <p className="text-xs text-muted-foreground">{vendor.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="border-green-500/50 text-green-600 dark:text-green-400">
                          Active
                        </Badge>
                      </td>
                      <td className="p-3 text-right text-foreground">{vendor.totalOrders}</td>
                      <td className="p-3 text-right text-foreground">${vendor.totalSales.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <span className="text-primary">{vendor.rating}</span>
                        <span className="text-muted-foreground">/5</span>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
