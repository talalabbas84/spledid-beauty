"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ShoppingBag,
  Moon,
  Sun,
  Search,
  User,
  Menu,
  Heart,
  X,
  Award,
  Gift,
  BookOpen,
  Store,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/lib/store"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Best Sellers", href: "/shop?filter=best-sellers" },
  { name: "New Arrivals", href: "/shop?filter=new" },
  { name: "Brands", href: "/brands" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
]

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { toggleCart, toggleSearch, cartCount, wishlist, rewardsPoints } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-md"
      } border-b border-border/50`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl font-serif italic text-foreground">Splendid</span>
            <span className="text-xl sm:text-2xl font-serif italic text-primary">Beauty</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1">
                More
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/rewards" className="flex items-center gap-2 cursor-pointer">
                    <Award className="h-4 w-4 text-primary" />
                    Rewards
                    {rewardsPoints > 0 && (
                      <span className="ml-auto text-xs text-primary font-medium">{rewardsPoints} pts</span>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gift-cards" className="flex items-center gap-2 cursor-pointer">
                    <Gift className="h-4 w-4 text-primary" />
                    Gift Cards
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="cursor-pointer">
                    Contact
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help" className="cursor-pointer">
                    Help Center
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="hover:text-primary h-9 w-9 sm:h-10 sm:w-10"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex hover:text-primary h-10 w-10">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/order-tracking" className="cursor-pointer">
                    Track Order
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/rewards" className="flex items-center gap-2 cursor-pointer">
                    <Award className="h-4 w-4" />
                    Rewards
                    {rewardsPoints > 0 && (
                      <span className="ml-auto text-xs text-primary font-medium">{rewardsPoints} pts</span>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/seller" className="flex items-center gap-2 cursor-pointer">
                    <Store className="h-4 w-4 text-primary" />
                    Seller Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                    <Shield className="h-4 w-4 text-primary" />
                    Admin Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* End portal switcher */}
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    Sign In
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover:text-primary h-9 w-9 sm:h-10 sm:w-10">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="hover:text-primary h-9 w-9 sm:h-10 sm:w-10"
            >
              {isDark ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative hover:text-primary h-9 w-9 sm:h-10 sm:w-10"
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                {cartCount()}
              </span>
              <span className="sr-only">Cart</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-background p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="text-xl font-serif">
                      Splendid <span className="text-primary">Beauty</span>
                    </span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col p-4">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className="py-4 text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border/50 flex items-center gap-2"
                        >
                          {item.name === "Blog" && <BookOpen className="h-5 w-5 text-primary" />}
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link
                        href="/rewards"
                        className="py-4 text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border/50 flex items-center gap-2"
                      >
                        <Award className="h-5 w-5 text-primary" />
                        Rewards
                        {rewardsPoints > 0 && <span className="ml-auto text-sm text-primary">{rewardsPoints} pts</span>}
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/gift-cards"
                        className="py-4 text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border/50 flex items-center gap-2"
                      >
                        <Gift className="h-5 w-5 text-primary" />
                        Gift Cards
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="py-4 text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border/50"
                      >
                        Contact
                      </Link>
                    </SheetClose>
                  </nav>
                  <div className="mt-auto p-4 border-t border-border">
                    <SheetClose asChild>
                      <Link href="/account">
                        <Button variant="outline" className="w-full rounded-full mb-3 bg-transparent">
                          <User className="h-4 w-4 mr-2" />
                          My Account
                        </Button>
                      </Link>
                    </SheetClose>
                    <p className="text-xs text-muted-foreground text-center">Free shipping on orders over $75</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
