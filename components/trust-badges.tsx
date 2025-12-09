"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Truck, RotateCcw, Lock, Leaf, Award } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "256-bit SSL encryption",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $75",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "Ethically sourced",
  },
  {
    icon: Award,
    title: "Certified Organic",
    description: "USDA approved",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Your data is safe",
  },
]

interface TrustBadgesProps {
  variant?: "horizontal" | "grid"
  showAll?: boolean
}

export function TrustBadges({ variant = "horizontal", showAll = false }: TrustBadgesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const displayBadges = showAll ? badges : badges.slice(0, 4)

  if (variant === "grid") {
    return (
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayBadges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="flex items-center gap-3 p-4 border border-border rounded-lg"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <badge.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6 border-b border-border bg-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {displayBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <badge.icon className="w-5 h-5 text-primary" />
              <span className="text-sm">{badge.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
