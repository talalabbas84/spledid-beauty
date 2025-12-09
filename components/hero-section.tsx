"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/images/hero-bg.jpg"
          alt="Splendid Beauty Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif leading-tight mb-6"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">Beauty Rooted in</span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#C9A227] italic mt-2"
              >
                Heritage
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-xl"
            >
              Discover the finest African and Caribbean beauty products. Authentic ingredients, luxurious results,
              cultural pride in every bottle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-[#C9A227] text-black hover:bg-[#B8922A] px-8 py-6 text-base font-medium rounded-full transition-transform hover:scale-105"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-base font-medium rounded-full bg-transparent transition-transform hover:scale-105"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center animate-bounce">
          <ChevronDown className="w-5 h-5 text-white/70" />
        </div>
      </motion.div>
    </section>
  )
}
