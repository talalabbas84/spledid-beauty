"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

const concerns = [
  {
    id: "hyperpigmentation",
    title: "Hyperpigmentation",
    image: "/skin-brightening-treatment-luxury.jpg",
  },
  {
    id: "hair-growth",
    title: "Hair Growth",
    image: "/hair-oil-serum-bottles-luxury-skincare.jpg",
  },
  {
    id: "dry-skin",
    title: "Dry Skin",
    image: "/shea-butter-cream-luxury-gold-packaging.jpg",
  },
  {
    id: "acne",
    title: "Acne & Blemishes",
    image: "/african-black-soap-luxury-skincare.jpg",
  },
  {
    id: "anti-aging",
    title: "Anti-Aging",
    image: "/marula-oil-serum-dropper-bottle-luxury.jpg",
  },
  {
    id: "hair-care",
    title: "Hair Care",
    image: "/honey-hair-mask-luxury-packaging-gold.jpg",
  },
]

export function ConcernsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">
            Shop by <span className="text-primary italic">Concern</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find targeted solutions for your unique beauty needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {concerns.map((concern, index) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={`/concerns/${concern.id}`} className="group block">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <Image
                    src={concern.image || "/placeholder.svg"}
                    alt={concern.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <h3 className="text-white text-sm font-medium text-center">{concern.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
