"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Save,
  ImageIcon,
  Package,
  DollarSign,
  Tag,
  FileText,
  Leaf,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = ["Skincare", "Hair Care", "Body Care", "Makeup", "Fragrance", "Tools & Accessories"]
const concerns = [
  "Hyperpigmentation",
  "Acne",
  "Oily Skin",
  "Dry Skin",
  "Eczema",
  "Uneven Skin Tone",
  "Anti-Aging",
  "Sensitive Skin",
  "Hair Growth",
  "Dandruff",
]
const countries = ["Ghana", "Nigeria", "Kenya", "Jamaica", "Trinidad", "Ethiopia", "Morocco", "South Africa"]

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState("")
  const [benefits, setBenefits] = useState<string[]>([])
  const [newBenefit, setNewBenefit] = useState("")

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()])
      setNewIngredient("")
    }
  }

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient))
  }

  const handleAddBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const handleRemoveBenefit = (benefit: string) => {
    setBenefits(benefits.filter((b) => b !== benefit))
  }

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== concern))
    } else {
      setSelectedConcerns([...selectedConcerns, concern])
    }
  }

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    router.push("/seller/products")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/seller/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif text-foreground">Add New Product</h1>
            <p className="text-sm text-muted-foreground mt-1">Create a new product listing</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-12 sm:ml-0">
          <Button
            variant="outline"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting}
            size="sm"
            className="sm:size-default"
          >
            <Save className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Save as Draft</span>
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            {isSubmitting ? (
              "..."
            ) : (
              <>
                <span className="hidden sm:inline">Submit for Review</span>
                <span className="sm:hidden">Submit</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-muted w-full overflow-x-auto flex justify-start">
            <TabsTrigger value="basic" className="shrink-0">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="details" className="shrink-0">
              Details
            </TabsTrigger>
            <TabsTrigger value="media" className="shrink-0">
              Media
            </TabsTrigger>
            <TabsTrigger value="heritage" className="shrink-0">
              Heritage Story
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Package className="h-5 w-5 text-primary" />
                    Product Information
                  </CardTitle>
                  <CardDescription>Basic details about your product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input id="name" placeholder="e.g., African Black Soap Deep Cleanser" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU *</Label>
                      <Input id="sku" placeholder="e.g., HE-ABS-001" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your product (displayed in product cards)"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Full Description *</Label>
                    <Textarea
                      id="fullDescription"
                      placeholder="Detailed product description with benefits and features"
                      rows={6}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Inventory */}
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (CAD) *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comparePrice">Compare at Price (Optional)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="comparePrice"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Original price to show a discount</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Tag className="h-5 w-5 text-primary" />
                      Inventory
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input id="stock" type="number" min="0" placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" step="0.01" min="0" placeholder="0.00" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trackInventory">Track Inventory</Label>
                      <Switch id="trackInventory" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ingredients */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Leaf className="h-5 w-5 text-primary" />
                    Ingredients
                  </CardTitle>
                  <CardDescription>List all product ingredients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      placeholder="Add ingredient"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddIngredient())}
                    />
                    <Button type="button" variant="outline" onClick={handleAddIngredient}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ingredient) => (
                      <Badge key={ingredient} variant="secondary" className="gap-1">
                        {ingredient}
                        <button type="button" onClick={() => handleRemoveIngredient(ingredient)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inci">INCI Ingredients (Optional)</Label>
                    <Textarea id="inci" placeholder="Full INCI ingredient list for regulatory compliance" rows={4} />
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    Benefits & Usage
                  </CardTitle>
                  <CardDescription>Key benefits and how to use</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Add benefit"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddBenefit())}
                    />
                    <Button type="button" variant="outline" onClick={handleAddBenefit}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary" className="gap-1">
                        {benefit}
                        <button type="button" onClick={() => handleRemoveBenefit(benefit)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usage">Usage Instructions</Label>
                    <Textarea id="usage" placeholder="How to use this product for best results" rows={4} />
                  </div>
                </CardContent>
              </Card>

              {/* Skin Concerns */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Target Concerns</CardTitle>
                  <CardDescription>Select all skin/hair concerns this product addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {concerns.map((concern) => (
                      <Badge
                        key={concern}
                        variant={selectedConcerns.includes(concern) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          selectedConcerns.includes(concern) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        onClick={() => toggleConcern(concern)}
                      >
                        {concern}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Product Images
                </CardTitle>
                <CardDescription>Upload high-quality images of your product (minimum 3 recommended)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg border border-border overflow-hidden bg-muted"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">Main</Badge>
                      )}
                    </div>
                  ))}
                  <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors bg-muted/50">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const url = URL.createObjectURL(e.target.files[0])
                          setImages([...images, url])
                        }
                      }}
                    />
                  </label>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Recommended: 1000x1000px or larger, JPG or PNG format. First image will be the main product image.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Before & After Images (Optional)</CardTitle>
                <CardDescription>Show product results with before/after comparisons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors bg-muted/50">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload Before Image</span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                  <label className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-colors bg-muted/50">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload After Image</span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Heritage Tab */}
          <TabsContent value="heritage" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Globe className="h-5 w-5 text-primary" />
                  Heritage & Origin Story
                </CardTitle>
                <CardDescription>Share the cultural significance and origin of your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country of Origin *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country.toLowerCase()}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heritage">Heritage Story</Label>
                  <Textarea
                    id="heritage"
                    placeholder="Tell the story behind this product - its cultural roots, traditional uses, and the artisans or communities involved in creating it..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    This story helps customers connect with the cultural significance of your product
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourcing">Sourcing & Production</Label>
                  <Textarea
                    id="sourcing"
                    placeholder="Describe how ingredients are sourced and the production process..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Fair Trade Certified</p>
                      <p className="text-sm text-muted-foreground">Product meets fair trade standards</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Organic</p>
                      <p className="text-sm text-muted-foreground">Uses organic ingredients</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Cruelty-Free</p>
                      <p className="text-sm text-muted-foreground">Not tested on animals</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Vegan</p>
                      <p className="text-sm text-muted-foreground">Contains no animal products</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mobile Submit Buttons */}
        <div className="lg:hidden flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}
