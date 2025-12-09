"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Ban, Eye, MoreHorizontal, Download, UserCheck, ShoppingBag } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const customers = [
  {
    id: "cust_001",
    name: "Amara Johnson",
    email: "amara.johnson@email.com",
    avatar: "/professional-black-woman-headshot.png",
    totalOrders: 12,
    totalSpent: 847.5,
    status: "active",
    joinDate: "2024-03-15",
    lastOrder: "2025-01-05",
    rewardsPoints: 2450,
  },
  {
    id: "cust_002",
    name: "Chioma Okafor",
    email: "chioma.o@email.com",
    avatar: "/smiling-african-woman.png",
    totalOrders: 8,
    totalSpent: 523.0,
    status: "active",
    joinDate: "2024-05-22",
    lastOrder: "2024-12-28",
    rewardsPoints: 1560,
  },
  {
    id: "cust_003",
    name: "Maya Williams",
    email: "maya.williams@email.com",
    avatar: "/caribbean-woman-natural-hair-portrait.jpg",
    totalOrders: 23,
    totalSpent: 1842.75,
    status: "vip",
    joinDate: "2023-11-08",
    lastOrder: "2025-01-08",
    rewardsPoints: 5230,
  },
  {
    id: "cust_004",
    name: "Fatou Diallo",
    email: "fatou.d@email.com",
    avatar: "/west-african-woman-headwrap-portrait.jpg",
    totalOrders: 3,
    totalSpent: 156.0,
    status: "active",
    joinDate: "2024-11-30",
    lastOrder: "2024-12-15",
    rewardsPoints: 420,
  },
  {
    id: "cust_005",
    name: "Keisha Brown",
    email: "keisha.brown@email.com",
    avatar: "/black-british-woman-professional.jpg",
    totalOrders: 0,
    totalSpent: 0,
    status: "inactive",
    joinDate: "2024-08-12",
    lastOrder: null,
    rewardsPoints: 100,
  },
  {
    id: "cust_006",
    name: "Nia Thompson",
    email: "nia.t@email.com",
    avatar: "/young-black-woman-curly-hair.jpg",
    totalOrders: 15,
    totalSpent: 1124.5,
    status: "active",
    joinDate: "2024-01-20",
    lastOrder: "2025-01-02",
    rewardsPoints: 3180,
  },
]

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const vipCustomers = customers.filter((c) => c.status === "vip").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage and view customer information</p>
        </div>
        <Button variant="outline" className="border-border bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{totalCustomers}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{activeCustomers}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VIP Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{vipCustomers}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Orders</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                  Total Spent
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden xl:table-cell">
                  Rewards
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Last Order
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{customer.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="text-foreground">{customer.totalOrders}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-foreground">${customer.totalSpent.toFixed(2)}</span>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <span className="text-primary font-medium">{customer.rewardsPoints.toLocaleString()} pts</span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        customer.status === "vip" ? "default" : customer.status === "active" ? "secondary" : "outline"
                      }
                      className={
                        customer.status === "vip"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : customer.status === "active"
                            ? "bg-green-500/20 text-green-600 border-green-500/30"
                            : "text-muted-foreground"
                      }
                    >
                      {customer.status === "vip" ? "VIP" : customer.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-muted-foreground text-sm">
                      {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : "Never"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          View Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        {customer.status !== "vip" && (
                          <DropdownMenuItem>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Upgrade to VIP
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
