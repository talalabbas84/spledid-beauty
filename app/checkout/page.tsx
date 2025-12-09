"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { ChevronRight, CreditCard, Lock, Truck, ArrowLeft, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, addOrder, user } = useStore()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "apple" | "google">("card")
  const [checkoutMode, setCheckoutMode] = useState<"guest" | "login">("guest")
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveInfo: false,
    createAccount: false,
    password: "",
  })

  const subtotal = cartTotal()
  const shipping = subtotal > 75 ? 0 : 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Create order
      const newOrderId = `SB-${Date.now().toString(36).toUpperCase()}`
      const newOrder = {
        id: newOrderId,
        date: new Date().toISOString(),
        status: "processing" as const,
        items: cart,
        total: total,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }
      addOrder(newOrder)
      setOrderId(newOrderId)
      setOrderPlaced(true)
      clearCart()
    }
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart to checkout</p>
          <Link href="/shop">
            <Button className="bg-primary text-primary-foreground">Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          <p className="text-muted-foreground mb-4">
            Order ID: <span className="font-medium text-foreground">{orderId}</span>
          </p>
          <p className="text-muted-foreground mb-8">A confirmation email has been sent to {formData.email}.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/order-tracking?id=${orderId}`}>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                Track Order
              </Button>
            </Link>
            <Link href="/shop">
              <Button className="bg-primary text-primary-foreground w-full sm:w-auto">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4 border-b border-border">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li className="text-foreground">Checkout</li>
        </ol>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: "Information" },
            { num: 2, label: "Shipping" },
            { num: 3, label: "Payment" },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {step > s.num ? <Check className="h-4 w-4" /> : s.num}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm hidden sm:block",
                  step >= s.num ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
              {idx < 2 && <div className="w-12 md:w-24 h-px bg-border mx-4" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("guest")}
                      className={cn(
                        "flex-1 p-4 border rounded-lg text-center transition-colors",
                        checkoutMode === "guest"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <p className="font-medium text-foreground">Guest Checkout</p>
                      <p className="text-sm text-muted-foreground">No account needed</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutMode("login")}
                      className={cn(
                        "flex-1 p-4 border rounded-lg text-center transition-colors",
                        checkoutMode === "login"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <p className="font-medium text-foreground">Sign In</p>
                      <p className="text-sm text-muted-foreground">Faster checkout</p>
                    </button>
                  </div>

                  <h2 className="font-serif text-2xl text-foreground mb-6">Contact Information</h2>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="your@email.com"
                    />
                  </div>

                  {checkoutMode === "guest" && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="createAccount"
                        name="createAccount"
                        checked={formData.createAccount}
                        onChange={handleInputChange}
                        className="rounded border-border"
                      />
                      <Label htmlFor="createAccount" className="text-sm text-muted-foreground cursor-pointer">
                        Create an account for faster checkout next time
                      </Label>
                    </div>
                  )}

                  {formData.createAccount && (
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Create a password"
                      />
                    </div>
                  )}

                  <h3 className="font-serif text-xl text-foreground pt-4">Shipping Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (for delivery updates)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to information
                  </button>
                  <h2 className="font-serif text-2xl text-foreground mb-6">Shipping Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-primary rounded-lg cursor-pointer bg-primary/5">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" defaultChecked className="text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">5-7 business days</p>
                        </div>
                      </div>
                      <span className="font-medium text-foreground">{subtotal > 75 ? "FREE" : "$8.99"}</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" className="text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">2-3 business days</p>
                        </div>
                      </div>
                      <span className="font-medium text-foreground">$14.99</span>
                    </label>
                  </div>
                  {subtotal < 75 && (
                    <p className="text-sm text-muted-foreground">
                      Add ${(75 - subtotal).toFixed(2)} more to qualify for free shipping!
                    </p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to shipping
                  </button>
                  <h2 className="font-serif text-2xl text-foreground mb-6">Payment</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={cn(
                        "p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors",
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <CreditCard className="h-6 w-6" />
                      <span className="text-sm">Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={cn(
                        "p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors",
                        paymentMethod === "paypal"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.472a.642.642 0 0 1 .633-.539h7.846c2.597 0 4.413.512 5.395 1.524.917.942 1.205 2.306.856 4.06-.005.027-.011.054-.017.08l.003-.021c-.628 3.965-2.775 5.967-6.382 5.967h-1.63a.642.642 0 0 0-.633.539l-.956 6.049a.642.642 0 0 1-.633.539H7.076z" />
                      </svg>
                      <span className="text-sm">PayPal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("apple")}
                      className={cn(
                        "p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors",
                        paymentMethod === "apple"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
                      </svg>
                      <span className="text-sm">Apple Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("google")}
                      className={cn(
                        "p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors",
                        paymentMethod === "google"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="text-sm">Google Pay</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm">Secure payment - Your data is protected with SSL encryption</span>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative mt-1">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            required
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          required
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            required
                            value={formData.expiry}
                            onChange={handleInputChange}
                            className="mt-1"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            required
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="mt-1"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="p-6 bg-muted/50 rounded-lg text-center">
                      <p className="text-muted-foreground mb-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "apple" && (
                    <div className="p-6 bg-muted/50 rounded-lg text-center">
                      <p className="text-muted-foreground mb-4">Click the button below to pay with Apple Pay.</p>
                    </div>
                  )}

                  {paymentMethod === "google" && (
                    <div className="p-6 bg-muted/50 rounded-lg text-center">
                      <p className="text-muted-foreground mb-4">Click the button below to pay with Google Pay.</p>
                    </div>
                  )}

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm">SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="h-5 w-5 text-green-600" />
                      <span className="text-sm">256-bit Encryption</span>
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full mt-8 py-6 text-lg bg-primary text-primary-foreground">
                {step === 3 ? `Pay $${total.toFixed(2)}` : "Continue"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8 lg:border-l border-border">
            <h2 className="font-serif text-2xl text-foreground mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-primary tracking-wider">{item.brand}</p>
                    <p className="font-medium text-foreground text-sm">{item.name}</p>
                    <p className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 py-6 border-t border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  Shipping
                </span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-medium text-foreground pt-4 border-t border-border">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
