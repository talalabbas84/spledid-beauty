"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { SearchModal } from "@/components/search-modal"

const blogPosts: Record<
  string,
  {
    title: string
    excerpt: string
    content: string[]
    image: string
    category: string
    author: { name: string; image: string; bio: string }
    date: string
    readTime: string
  }
> = {
  "shea-butter-benefits": {
    title: "The Ancient Power of Shea Butter: 10 Benefits You Need to Know",
    excerpt: "Discover why African shea butter has been treasured for centuries.",
    content: [
      "Shea butter, known as 'women's gold' in Africa, has been used for centuries to nourish and protect the skin. Extracted from the nuts of the shea tree (Vitellaria paradoxa), this natural fat is rich in vitamins A, E, and F, making it an exceptional moisturizer for all skin types.",
      "The production of shea butter is traditionally done by women in West African communities, providing economic empowerment and preserving ancient knowledge. Each batch carries the wisdom of generations, making it not just a beauty product, but a connection to heritage.",
      "1. Deep Moisturization: Shea butter's high concentration of fatty acids and vitamins makes it incredibly nourishing for dry skin. It creates a protective barrier that locks in moisture without clogging pores.",
      "2. Anti-Inflammatory Properties: The cinnamic acid in shea butter provides natural anti-inflammatory benefits, making it excellent for conditions like eczema, psoriasis, and dermatitis.",
      "3. Anti-Aging Effects: Rich in vitamins A and E, shea butter helps boost collagen production and reduce the appearance of fine lines and wrinkles.",
      "4. Healing Properties: Shea butter promotes skin cell regeneration and helps heal minor wounds, burns, and scars more quickly.",
      "5. Sun Protection: While not a replacement for sunscreen, shea butter contains natural SPF properties that provide additional protection from UV rays.",
    ],
    image: "/shea-butter-skincare-african.jpg",
    category: "Skincare",
    author: {
      name: "Dr. Amara Okonkwo",
      image: "/african-woman-doctor.png",
      bio: "Dermatologist specializing in melanin-rich skincare with 15+ years of experience.",
    },
    date: "Dec 8, 2024",
    readTime: "7 min read",
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts[slug]

  if (!post) {
    return (
      <>
        <Header />
        <CartDrawer />
        <SearchModal />
        <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-foreground mb-4">Article Not Found</h1>
            <Link href="/blog">
              <Button className="bg-[#C9A227] text-[#1a1a1a] hover:bg-[#B8922A]">Back to Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <CartDrawer />
      <SearchModal />
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <article className="container mx-auto px-4 -mt-32 relative z-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Category & Meta */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-[#C9A227] text-[#1a1a1a] text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">{post.title}</h1>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <Image
                src={post.author.image || "/placeholder.svg"}
                alt={post.author.name}
                width={56}
                height={56}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-foreground/90 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">Share this article</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-[#C9A227] hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </motion.div>
        </article>

        <div className="h-24" />
      </div>
      <Footer />
    </>
  )
}
