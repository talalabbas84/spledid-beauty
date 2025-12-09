"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MoreVertical, Eye, Package, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMarketplaceStore } from "@/lib/marketplace-store"

const statusColors = {
  delivered: "border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10",
  shipped: "border-purple-500/50 text-purple-600 dark:text-purple-400 bg-purple-500/10",
  processing: "border-blue-500/50 text-blue-600 dark:text-blue-400 bg-blue-500/10",
  pending: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10",
  returned: "border-red-500/50 text-red-600 dark:text-red-400 bg-red-500/10",
}

export default function AdminOrdersPage() {
  const { vendorOrders, vendors } = useMarketplaceStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = vendorOrders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = vendorOrders.reduce((sum, o) => sum + o.subtotal, 0)
  const totalCommission = vendorOrders.reduce((sum, o) => sum + o.commission, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Platform-wide order management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{vendorOrders.length}</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-primary">${totalCommission.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Platform Commission</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {vendorOrders.filter((o) => o.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending Fulfillment</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const vendor = vendors.find((v) => v.id === order.vendorId)
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-foreground">{order.orderId}</h3>
                        <Badge variant="outline" className={statusColors[order.status as keyof typeof statusColors]}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Customer: {order.customerName}</p>
                      <p className="text-sm text-muted-foreground">Vendor: {vendor?.businessName || "Unknown"}</p>
                    </div>

                    {/* Items */}
                    <div className="flex flex-wrap gap-2 lg:w-64">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                          <img src={item.image || "/placeholder.svg"} alt="" className="h-8 w-8 rounded object-cover" />
                          <span className="text-xs text-foreground line-clamp-1">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Financials */}
                    <div className="lg:w-40 text-right space-y-1">
                      <p className="text-lg font-bold text-foreground">${order.subtotal.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        Commission: <span className="text-primary">${order.commission.toFixed(2)}</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DollarSign className="mr-2 h-4 w-4" />
                          View Financials
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        {filteredOrders.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No orders found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
