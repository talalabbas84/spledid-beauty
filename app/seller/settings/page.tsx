"use client"

import { useState } from "react"
import { Store, Bell, Shield, FileText, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useMarketplaceStore } from "@/lib/marketplace-store"

export default function SellerSettingsPage() {
  const { currentUser, vendors, updateVendor } = useMarketplaceStore()
  const vendor = vendors.find((v) => v.id === currentUser?.vendorId)

  const [businessName, setBusinessName] = useState(vendor?.businessName || "")
  const [description, setDescription] = useState(vendor?.description || "")
  const [email, setEmail] = useState(vendor?.email || "")
  const [phone, setPhone] = useState(vendor?.phone || "")
  const [website, setWebsite] = useState(vendor?.website || "")

  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    payouts: true,
    promotions: false,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your store settings and preferences</p>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="w-full overflow-x-auto flex justify-start">
          <TabsTrigger value="store" className="shrink-0">
            <Store className="h-4 w-4 mr-2" />
            Store
          </TabsTrigger>
          <TabsTrigger value="notifications" className="shrink-0">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="compliance" className="shrink-0">
            <Shield className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="space-y-6">
          {/* Business Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Business Information</CardTitle>
              <CardDescription>Update your store details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Certifications</CardTitle>
              <CardDescription>Your verified certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {vendor?.certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="outline"
                    className="border-green-500/50 text-green-600 dark:text-green-400"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="border-dashed bg-transparent">
                  + Add Certification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [key]: checked }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Compliance Documents</CardTitle>
              <CardDescription>Required documents for selling on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendor?.complianceDocs.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted border border-border"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">Uploaded</p>
                    </div>
                  </div>
                  {doc.verified ? (
                    <Badge variant="outline" className="border-green-500/50 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
