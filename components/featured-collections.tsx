"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const collections = [
  {
    id: 1,
    title: "Glow from the Islands",
    description: "Caribbean-inspired skincare with tropical botanicals and natural radiance boosters",
    image: "/tropical-caribbean-plants-colorful-flowers.jpg",
    href: "/concerns/dry-skin",
  },
  {
    id: 2,
    title: "African Botanicals",
    description: "Pure ingredients sourced from the heart of Africa for authentic beauty rituals",
    image: "/african-woman-traditional-colorful-clothing-smilin.jpg",
    href: "/concerns/hyperpigmentation",
  },
  {
    id: 3,
    title: "Diaspora Beauty Icons",
    description: "Heritage-inspired favorites that have defined beauty across generations",
    image: "/luxury-beauty-products-gold-packaging-elegant.jpg",
    href: "/concerns/hair-growth",
  },
]

export function FeaturedCollections() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-3 sm:mb-4">
            <span className="italic">Featured</span> Collections
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Curated selections celebrating the richness of African and Caribbean beauty traditions
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={collection.href}
                className="group relative cursor-pointer block"
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredId === collection.id ? "opacity-100" : "opacity-0 md:opacity-0"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 border border-white rounded-full hover:bg-white hover:text-foreground transition-colors text-sm sm:text-base">
                      Explore Collection
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-xl font-serif text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{collection.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
