"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"

const blogPosts = [
  {
    id: "shea-butter-benefits",
    title: "The Ancient Power of Shea Butter: 10 Benefits You Need to Know",
    excerpt:
      "Discover why African shea butter has been treasured for centuries and how it can transform your skincare routine.",
    image: "/shea-butter-skincare-natural.jpg",
    category: "Skincare",
    author: "Dr. Amara Okonkwo",
    date: "Dec 8, 2024",
    readTime: "7 min read",
    featured: true,
  },
  {
    id: "hair-growth-african-oils",
    title: "African Oils for Natural Hair Growth: A Complete Guide",
    excerpt: "Learn about the best African oils for promoting healthy hair growth, from baobab to marula oil.",
    image: "/african-hair-oils-natural.jpg",
    category: "Hair Care",
    author: "Zara Williams",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    featured: true,
  },
  {
    id: "caribbean-beauty-rituals",
    title: "Caribbean Beauty Rituals: Secrets from the Islands",
    excerpt: "Explore the traditional beauty practices passed down through generations in the Caribbean islands.",
    image: "/caribbean-beauty-tropical.jpg",
    category: "Heritage",
    author: "Keisha Thompson",
    date: "Dec 2, 2024",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: "hyperpigmentation-guide",
    title: "Treating Hyperpigmentation in Melanin-Rich Skin",
    excerpt: "Expert tips for safely addressing dark spots and uneven skin tone with natural ingredients.",
    image: "/melanin-skincare-beauty.jpg",
    category: "Skincare",
    author: "Dr. Amara Okonkwo",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: "african-black-soap-guide",
    title: "The Ultimate Guide to African Black Soap",
    excerpt: "Everything you need to know about this traditional West African cleanser and how to use it.",
    image: "/african-black-soap-natural.jpg",
    category: "Skincare",
    author: "Nia Johnson",
    date: "Nov 25, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "protective-styles-guide",
    title: "Protective Styling: Keep Your Hair Healthy and Beautiful",
    excerpt: "A comprehensive guide to protective hairstyles that promote hair health and growth.",
    image: "/protective-hairstyles-braids.jpg",
    category: "Hair Care",
    author: "Zara Williams",
    date: "Nov 20, 2024",
    readTime: "9 min read",
    featured: false,
  },
]

const categories = ["All", "Skincare", "Hair Care", "Heritage", "Wellness", "Beauty Tips"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <>
      <Header />
      <CartDrawer />
      <SearchModal />
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="bg-[#1a1a1a] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif mb-4"
            >
              The <span className="text-[#C9A227]">Beauty</span> Journal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/70 max-w-2xl mx-auto text-lg"
            >
              Expert tips, heritage stories, and beauty wisdom rooted in African and Caribbean traditions
            </motion.p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeCategory === category
                      ? "bg-[#C9A227] text-[#1a1a1a]"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {activeCategory === "All" && searchQuery === "" && (
            <section className="mb-16">
              <h2 className="text-2xl font-serif text-foreground mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`}>
                      <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-4">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 bg-[#C9A227] text-[#1a1a1a] text-xs font-medium rounded-full mb-2">
                            {post.category}
                          </span>
                          <h3 className="text-xl font-serif text-white">{post.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section>
            <h2 className="text-2xl font-serif text-foreground mb-8">
              {activeCategory === "All" ? "Latest Articles" : activeCategory}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#C9A227]/50 transition-colors"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-[#C9A227]" />
                        <span className="text-sm text-[#C9A227]">{post.category}</span>
                      </div>
                      <h3 className="text-lg font-serif text-foreground mb-2 group-hover:text-[#C9A227] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{post.date}</span>
                        <span className="text-[#C9A227] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="mt-16 bg-[#1a1a1a] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">Get Beauty Tips in Your Inbox</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive articles, product launches, and heritage stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-[#C9A227] text-[#1a1a1a] hover:bg-[#B8922A] whitespace-nowrap">Subscribe</Button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
