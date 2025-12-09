"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MoreVertical, Eye, Truck, Package, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useMarketplaceStore } from "@/lib/marketplace-store"

const statusColors = {
  delivered: "border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10",
  shipped: "border-purple-500/50 text-purple-600 dark:text-purple-400 bg-purple-500/10",
  processing: "border-blue-500/50 text-blue-600 dark:text-blue-400 bg-blue-500/10",
  pending: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10",
  returned: "border-red-500/50 text-red-600 dark:text-red-400 bg-red-500/10",
}

export default function SellerOrdersPage() {
  const { currentUser, getVendorOrders, updateOrderFulfillment } = useMarketplaceStore()
  const orders = currentUser?.vendorId ? getVendorOrders(currentUser.vendorId) : []

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [fulfillmentDialog, setFulfillmentDialog] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [carrier, setCarrier] = useState("")

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleUpdateFulfillment = () => {
    if (selectedOrder) {
      updateOrderFulfillment(selectedOrder.id, "shipped", { trackingNumber, carrier })
      setFulfillmentDialog(false)
      setTrackingNumber("")
      setCarrier("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and fulfill customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Pending",
            count: orders.filter((o) => o.status === "pending").length,
            color: "text-yellow-600 dark:text-yellow-400",
          },
          {
            label: "Processing",
            count: orders.filter((o) => o.status === "processing").length,
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Shipped",
            count: orders.filter((o) => o.status === "shipped").length,
            color: "text-purple-600 dark:text-purple-400",
          },
          {
            label: "Delivered",
            count: orders.filter((o) => o.status === "delivered").length,
            color: "text-green-600 dark:text-green-400",
          },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
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
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
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
                    <p className="text-sm text-muted-foreground mb-2">
                      {order.customerName} • {new Date(order.placedAt).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.productName}
                            className="h-8 w-8 rounded object-cover"
                          />
                          <span className="text-xs text-foreground">
                            {item.productName} x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="lg:w-48">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <div>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="lg:w-32 text-right">
                    <p className="text-lg font-bold text-foreground">${order.payout.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Your payout</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {order.status === "pending" && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => {
                          setSelectedOrder(order)
                          setFulfillmentDialog(true)
                        }}
                      >
                        <Truck className="h-4 w-4 mr-1" />
                        Ship Order
                      </Button>
                    )}
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
                          <Package className="mr-2 h-4 w-4" />
                          Print Packing Slip
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Tracking:</span>
                    <span className="font-mono text-foreground">{order.trackingNumber}</span>
                    <span className="text-muted-foreground">via {order.carrier}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No orders found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fulfillment Dialog */}
      <Dialog open={fulfillmentDialog} onOpenChange={setFulfillmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ship Order</DialogTitle>
            <DialogDescription>Enter tracking information for {selectedOrder?.orderId}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Carrier</Label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger>
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Canada Post">Canada Post</SelectItem>
                  <SelectItem value="UPS">UPS</SelectItem>
                  <SelectItem value="FedEx">FedEx</SelectItem>
                  <SelectItem value="DHL">DHL</SelectItem>
                  <SelectItem value="Purolator">Purolator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tracking Number</Label>
              <Input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFulfillmentDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateFulfillment}
              disabled={!carrier || !trackingNumber}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Mark as Shipped
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
