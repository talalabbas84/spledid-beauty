"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"

const features = [
  {
    title: "Sourced Authentically",
    description:
      "We work directly with artisans and producers across Africa and the Caribbean to bring you genuine, traditional beauty secrets.",
  },
  {
    title: "Heritage Formulas",
    description:
      "Every product honors centuries-old beauty rituals, blending traditional wisdom with modern science for exceptional results.",
  },
  {
    title: "Community Impact",
    description:
      "Your purchase supports local communities, fair trade practices, and the preservation of cultural beauty traditions.",
  },
]

export function CulturalRoots() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] relative rounded-lg overflow-hidden">
              <Image
                src="/elegant-black-woman-profile-gold-earrings-black-ou.jpg"
                alt="Beautiful woman showcasing natural beauty"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-48 bg-primary/10 rounded-full -z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden sm:block absolute -top-8 -left-8 w-32 h-32 bg-primary/5 rounded-full -z-10"
            />
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4 sm:mb-6 leading-tight"
            >
              Celebrating{" "}
              <span className="italic text-primary">
                Cultural
                <br className="hidden sm:block" /> Roots
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 sm:mb-10"
            >
              At Splendid Beauty, we believe beauty is deeply connected to heritage. Our curated collection celebrates
              the rich traditions of African and Caribbean beauty, bringing you products that honor ancestral wisdom
              while delivering modern luxury.
            </motion.p>

            {/* Features */}
            <div className="space-y-6 sm:space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4 sm:gap-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
