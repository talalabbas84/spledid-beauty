"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { getFeaturedBrands } from "@/lib/api/strapi"
import type { Brand } from "@/lib/api/types"

export function BrandLogos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    async function fetchBrands() {
      const data = await getFeaturedBrands(6)
      setBrands(data)
    }
    fetchBrands()
  }, [])

  return (
    <section ref={ref} className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mb-8 tracking-widest uppercase"
        >
          Our Partner Brands
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/brands/${brand.slug}`}
                className="block grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={100}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
