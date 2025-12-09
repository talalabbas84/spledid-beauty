"use client"

import { motion } from "framer-motion"
import { DollarSign, Download, Calendar, TrendingUp, CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMarketplaceStore } from "@/lib/marketplace-store"

const payouts = [
  { id: "PAY-001", date: "Dec 1, 2024", amount: 1245.8, status: "completed", orders: 12 },
  { id: "PAY-002", date: "Nov 15, 2024", amount: 2156.4, status: "completed", orders: 18 },
  { id: "PAY-003", date: "Nov 1, 2024", amount: 1876.2, status: "completed", orders: 15 },
  { id: "PAY-004", date: "Oct 15, 2024", amount: 1432.6, status: "completed", orders: 11 },
]

export default function SellerPayoutsPage() {
  const { currentUser, vendors } = useMarketplaceStore()
  const vendor = vendors.find((v) => v.id === currentUser?.vendorId)

  const pendingPayout = 847.6
  const totalEarnings = payouts.reduce((sum, p) => sum + p.amount, 0) + pendingPayout

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Payouts</h1>
          <p className="text-muted-foreground mt-1">Track your earnings and payout history</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <Badge variant="outline" className="border-green-500/50 text-green-600 dark:text-green-400">
                  Available
                </Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">${pendingPayout.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">Pending Payout</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">${totalEarnings.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Earnings</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">Dec 15</p>
              <p className="text-sm text-muted-foreground mt-1">Next Payout Date</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payout Method */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Payout Method</CardTitle>
          <CardDescription>Where your earnings will be sent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted border border-border">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Bank Transfer</p>
              <p className="text-sm text-muted-foreground">****1234 • TD Canada Trust</p>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Payout History</CardTitle>
          <CardDescription>Your past payouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payouts.map((payout, index) => (
              <motion.div
                key={payout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{payout.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {payout.date} • {payout.orders} orders
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">${payout.amount.toFixed(2)}</p>
                  <Badge variant="outline" className="border-green-500/50 text-green-600 dark:text-green-400 text-xs">
                    {payout.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
