"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Amara Johnson",
    location: "Atlanta, GA",
    image: "/black-woman-professional-headshot-natural-hair.jpg",
    rating: 5,
    text: "Splendid Beauty has completely transformed my skincare routine. The African Black Soap cleanser is now a staple - it's gentle yet effective, and I love knowing the ingredients are authentically sourced.",
    product: "African Black Soap Deep Cleanser",
  },
  {
    id: 2,
    name: "Keisha Williams",
    location: "Brooklyn, NY",
    image: "/black-woman-smiling-headshot-locs-hairstyle.jpg",
    rating: 5,
    text: "Finally, a brand that understands our heritage and delivers luxury quality. The Shea Butter Radiance Cream has given my skin the most beautiful glow. Worth every penny!",
    product: "Shea Butter Radiance Cream",
  },
  {
    id: 3,
    name: "Jasmine Okafor",
    location: "London, UK",
    image: "/black-british-woman-professional-portrait-braids.jpg",
    rating: 5,
    text: "The Caribbean Oil Hair Treatment saved my hair! After years of damage, my curls are finally thriving. The packaging is beautiful too - it feels like a true luxury experience.",
    product: "Caribbean Oil Hair Treatment",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={ref} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-primary font-medium tracking-wider mb-3 sm:mb-4 text-sm">TESTIMONIALS</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            Loved by Our <span className="text-primary italic">Community</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-background rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm relative">
            <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 h-10 w-10 sm:h-16 sm:w-16 text-primary/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-6 md:gap-8"
              >
                {/* Author Info */}
                <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-48 flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 ring-primary/20 flex-shrink-0">
                    <Image
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-left md:text-left">
                    <h4 className="font-semibold text-base sm:text-lg">{currentTestimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{currentTestimonial.location}</p>
                    <div className="flex gap-0.5 mt-2">
                      {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90 mb-4 sm:mb-6">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Purchased: <span className="text-primary font-medium">{currentTestimonial.product}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent h-10 w-10"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent h-10 w-10"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
