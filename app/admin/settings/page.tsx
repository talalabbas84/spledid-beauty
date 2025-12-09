"use client"

import { useState } from "react"
import { Save, Globe, CreditCard, Truck, Bell, Shield, Percent, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Splendid Beauty",
    siteDescription: "Premium African and Caribbean beauty products",
    supportEmail: "support@splendidbeauty.com",
    currency: "USD",
    timezone: "America/Toronto",
    commissionRate: 15,
    minPayout: 50,
    payoutSchedule: "weekly",
    freeShippingThreshold: 75,
    enableReviews: true,
    enableWishlist: true,
    enableRewards: true,
    requireApproval: true,
    enableDisputes: true,
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground">Configure your marketplace settings</p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card border border-border w-full overflow-x-auto flex justify-start">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary shrink-0"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary shrink-0"
          >
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary shrink-0"
          >
            Shipping
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary shrink-0"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary shrink-0"
          >
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Globe className="h-5 w-5 text-primary" />
                  Site Information
                </CardTitle>
                <CardDescription>Basic information about your marketplace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="siteName" className="text-foreground">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="siteDescription" className="text-foreground">
                    Site Description
                  </Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="supportEmail" className="text-foreground">
                    Support Email
                  </Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currency" className="text-foreground">
                      Currency
                    </Label>
                    <Select value={settings.currency} onValueChange={(v) => setSettings({ ...settings, currency: v })}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone" className="text-foreground">
                      Timezone
                    </Label>
                    <Select value={settings.timezone} onValueChange={(v) => setSettings({ ...settings, timezone: v })}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Toronto">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5 text-primary" />
                  Features
                </CardTitle>
                <CardDescription>Enable or disable marketplace features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Customer Reviews</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to leave product reviews</p>
                  </div>
                  <Switch
                    checked={settings.enableReviews}
                    onCheckedChange={(v) => setSettings({ ...settings, enableReviews: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Wishlist</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to save products to wishlist</p>
                  </div>
                  <Switch
                    checked={settings.enableWishlist}
                    onCheckedChange={(v) => setSettings({ ...settings, enableWishlist: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Rewards Program</Label>
                    <p className="text-sm text-muted-foreground">Enable customer loyalty rewards</p>
                  </div>
                  <Switch
                    checked={settings.enableRewards}
                    onCheckedChange={(v) => setSettings({ ...settings, enableRewards: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Take site offline for maintenance</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(v) => setSettings({ ...settings, maintenanceMode: v })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Settings
              </CardTitle>
              <CardDescription>Configure payment processing and vendor payouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="commissionRate" className="text-foreground">
                  Commission Rate (%)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="commissionRate"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.commissionRate}
                    onChange={(e) => setSettings({ ...settings, commissionRate: Number(e.target.value) })}
                    className="bg-background border-border w-24"
                  />
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Platform fee taken from each sale</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minPayout" className="text-foreground">
                  Minimum Payout Amount ($)
                </Label>
                <Input
                  id="minPayout"
                  type="number"
                  min="0"
                  value={settings.minPayout}
                  onChange={(e) => setSettings({ ...settings, minPayout: Number(e.target.value) })}
                  className="bg-background border-border w-32"
                />
                <p className="text-sm text-muted-foreground">Vendors must reach this amount before payout</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payoutSchedule" className="text-foreground">
                  Payout Schedule
                </Label>
                <Select
                  value={settings.payoutSchedule}
                  onValueChange={(v) => setSettings({ ...settings, payoutSchedule: v })}
                >
                  <SelectTrigger className="bg-background border-border w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <Label className="text-foreground">Require Product Approval</Label>
                  <p className="text-sm text-muted-foreground">Review products before they go live</p>
                </div>
                <Switch
                  checked={settings.requireApproval}
                  onCheckedChange={(v) => setSettings({ ...settings, requireApproval: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Enable Dispute System</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to file disputes</p>
                </div>
                <Switch
                  checked={settings.enableDisputes}
                  onCheckedChange={(v) => setSettings({ ...settings, enableDisputes: v })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Truck className="h-5 w-5 text-primary" />
                Shipping Settings
              </CardTitle>
              <CardDescription>Configure shipping options and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="freeShippingThreshold" className="text-foreground">
                  Free Shipping Threshold ($)
                </Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  min="0"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                  className="bg-background border-border w-32"
                />
                <p className="text-sm text-muted-foreground">Orders above this amount qualify for free shipping</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bell className="h-5 w-5 text-primary" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(v) => setSettings({ ...settings, smsNotifications: v })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage platform security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to admin accounts</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
                  Enable 2FA
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-medium text-foreground mb-2">API Keys</h4>
                <p className="text-sm text-muted-foreground mb-4">Manage API keys for third-party integrations</p>
                <Button variant="outline" className="border-border bg-transparent">
                  Manage API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
