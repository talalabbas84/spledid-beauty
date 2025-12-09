"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, AlertTriangle, MessageSquare, CheckCircle, XCircle, Clock, MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const disputes = [
  {
    id: "disp_001",
    orderId: "ORD-2025-001",
    customer: "Amara Johnson",
    vendor: "Heritage Essentials",
    type: "Product Quality",
    description: "Product arrived damaged, bottle was leaking",
    status: "open",
    priority: "high",
    amount: 45.0,
    createdAt: "2025-01-08",
    lastUpdate: "2025-01-09",
  },
  {
    id: "disp_002",
    orderId: "ORD-2024-892",
    customer: "Maya Williams",
    vendor: "Savanna Glow",
    type: "Shipping Issue",
    description: "Order never arrived, tracking shows delivered",
    status: "investigating",
    priority: "high",
    amount: 89.5,
    createdAt: "2025-01-05",
    lastUpdate: "2025-01-08",
  },
  {
    id: "disp_003",
    orderId: "ORD-2024-845",
    customer: "Fatou Diallo",
    vendor: "Island Beauty",
    type: "Wrong Item",
    description: "Received different product than ordered",
    status: "open",
    priority: "medium",
    amount: 32.0,
    createdAt: "2025-01-07",
    lastUpdate: "2025-01-07",
  },
  {
    id: "disp_004",
    orderId: "ORD-2024-756",
    customer: "Nia Thompson",
    vendor: "Tropical Essence",
    type: "Refund Request",
    description: "Customer allergic reaction, requesting full refund",
    status: "resolved",
    priority: "high",
    amount: 52.0,
    resolution: "Full refund issued",
    createdAt: "2024-12-28",
    lastUpdate: "2025-01-02",
  },
  {
    id: "disp_005",
    orderId: "ORD-2024-701",
    customer: "Chioma Okafor",
    vendor: "Heritage Essentials",
    type: "Product Quality",
    description: "Product expired before use-by date",
    status: "closed",
    priority: "low",
    amount: 28.0,
    resolution: "Replacement sent",
    createdAt: "2024-12-20",
    lastUpdate: "2024-12-25",
  },
]

export default function AdminDisputesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || dispute.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openDisputes = disputes.filter((d) => d.status === "open").length
  const investigatingDisputes = disputes.filter((d) => d.status === "investigating").length
  const resolvedDisputes = disputes.filter((d) => d.status === "resolved" || d.status === "closed").length
  const totalAmount = disputes
    .filter((d) => d.status === "open" || d.status === "investigating")
    .reduce((sum, d) => sum + d.amount, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4" />
      case "investigating":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "investigating":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/20 text-green-600 border-green-500/30"
      case "closed":
        return "bg-muted text-muted-foreground border-border"
      default:
        return ""
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-muted-foreground"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-foreground">Disputes</h1>
        <p className="text-muted-foreground">Manage customer and vendor disputes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{openDisputes}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Investigating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{investigatingDisputes}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{resolvedDisputes}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Amount at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search disputes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-card border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.map((dispute, index) => (
          <motion.div
            key={dispute.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarFallback className={`${getPriorityColor(dispute.priority)} bg-muted`}>
                        <AlertTriangle className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">{dispute.orderId}</span>
                        <Badge variant="outline" className={getStatusColor(dispute.status)}>
                          {getStatusIcon(dispute.status)}
                          <span className="ml-1 capitalize">{dispute.status}</span>
                        </Badge>
                        <Badge variant="outline" className="border-border text-muted-foreground">
                          {dispute.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{dispute.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>
                          Customer: <span className="text-foreground">{dispute.customer}</span>
                        </span>
                        <span>
                          Vendor: <span className="text-foreground">{dispute.vendor}</span>
                        </span>
                        <span>
                          Amount: <span className="text-primary font-medium">${dispute.amount.toFixed(2)}</span>
                        </span>
                      </div>
                      {dispute.resolution && (
                        <p className="text-sm text-green-600 mt-2">Resolution: {dispute.resolution}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(dispute.lastUpdate).toLocaleDateString()}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {dispute.status === "open" && (
                          <DropdownMenuItem>
                            <Clock className="h-4 w-4 mr-2" />
                            Mark as Investigating
                          </DropdownMenuItem>
                        )}
                        {(dispute.status === "open" || dispute.status === "investigating") && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Resolve Dispute
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="h-4 w-4 mr-2" />
                              Close Dispute
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
