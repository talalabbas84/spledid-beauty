"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MoreVertical, Eye, CheckCircle, XCircle, Ban, Store, Mail, ExternalLink } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useMarketplaceStore } from "@/lib/marketplace-store"

const statusColors = {
  approved: "border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10",
  pending: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10",
  rejected: "border-red-500/50 text-red-600 dark:text-red-400 bg-red-500/10",
  suspended: "border-orange-500/50 text-orange-600 dark:text-orange-400 bg-orange-500/10",
}

export default function AdminVendorsPage() {
  const { vendors, approveVendor, rejectVendor, suspendVendor } = useMarketplaceStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVendor, setSelectedVendor] = useState<(typeof vendors)[0] | null>(null)
  const [rejectDialog, setRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch = v.businessName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || v.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (vendorId: string) => {
    approveVendor(vendorId)
  }

  const handleReject = () => {
    if (selectedVendor) {
      rejectVendor(selectedVendor.id, rejectReason)
      setRejectDialog(false)
      setRejectReason("")
      setSelectedVendor(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-foreground">Vendors</h1>
        <p className="text-muted-foreground mt-1">Manage marketplace vendors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", count: vendors.length, color: "text-foreground" },
          {
            label: "Active",
            count: vendors.filter((v) => v.status === "approved").length,
            color: "text-green-600 dark:text-green-400",
          },
          {
            label: "Pending",
            count: vendors.filter((v) => v.status === "pending").length,
            color: "text-yellow-600 dark:text-yellow-400",
          },
          {
            label: "Suspended",
            count: vendors.filter((v) => v.status === "suspended").length,
            color: "text-orange-600 dark:text-orange-400",
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
                placeholder="Search vendors..."
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors List */}
      <div className="space-y-4">
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Vendor Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      {vendor.logo ? (
                        <img src={vendor.logo || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <Store className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{vendor.businessName}</h3>
                        <Badge variant="outline" className={statusColors[vendor.status as keyof typeof statusColors]}>
                          {vendor.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {vendor.city}, {vendor.country} • Joined {vendor.joinedDate}
                      </p>
                      <p className="text-sm text-muted-foreground">{vendor.email}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 lg:gap-8">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{vendor.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">${(vendor.totalSales / 1000).toFixed(1)}k</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{vendor.rating || "-"}</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {vendor.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-500/10 bg-transparent"
                          onClick={() => {
                            setSelectedVendor(vendor)
                            setRejectDialog(true)
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(vendor.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </>
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
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        {vendor.website && (
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </DropdownMenuItem>
                        )}
                        {vendor.status === "approved" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => suspendVendor(vendor.id)}
                              className="text-orange-600 dark:text-orange-400"
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Vendor
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Certifications */}
                {vendor.certifications.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                    {vendor.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-muted-foreground">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredVendors.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No vendors found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Vendor</DialogTitle>
            <DialogDescription>Provide a reason for rejecting {selectedVendor?.businessName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reason</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={!rejectReason}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Reject Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
