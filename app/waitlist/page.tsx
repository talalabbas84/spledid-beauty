import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { FormspreeEmailForm } from "@/components/formspree-email-form"
import {
  BadgePercent,
  Bell,
  Check,
  ChevronDown,
  Crown,
  Gift,
  Quote,
  Sparkles,
  Star,
} from "lucide-react"

const heroPerks = [
  "Early access privileges",
  "Exclusive launch discounts",
  "Limited edition gifts",
]

const joinReasons = [
  {
    title: "Early Access",
    description: "Be among the first to experience our curated collection before the official launch.",
    icon: Crown,
  },
  {
    title: "Exclusive Launch Gift",
    description: "Receive a luxurious welcome gift with your first order, featuring premium samples.",
    icon: Gift,
  },
  {
    title: "20% Launch Discount",
    description: "Enjoy exclusive pricing on our entire collection for being an early supporter.",
    icon: BadgePercent,
  },
  {
    title: "VIP Updates",
    description: "Get insider access to product stories, heritage insights, and beauty rituals.",
    icon: Bell,
  },
]

const heritagePillars = [
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

const testimonials = [
  {
    quote:
      "As a beta tester, I can't wait for everyone to experience these products. They're truly transformative and celebrate our heritage beautifully.",
    name: "Amara Johnson",
    location: "Atlanta, GA",
    role: "EARLY ACCESS MEMBER",
  },
  {
    quote:
      "I've been waiting for a brand like this! The attention to cultural authenticity while maintaining luxury quality is unprecedented.",
    name: "Kendra Baptiste",
    location: "Toronto, ON",
    role: "BEAUTY ENTHUSIAST",
  },
  {
    quote:
      "Finally, a brand that understands the intersection of heritage and modern beauty. Can't wait to see this launch!",
    name: "Nia Williams",
    location: "London, UK",
    role: "INDUSTRY INSIDER",
  },
]

const ctaPerks = ["First access to launches", "Exclusive discounts", "Special welcome gift"]

export const metadata: Metadata = {
  title: "Waitlist | Splendid Beauty",
  description:
    "Be first to experience the finest African and Caribbean beauty products. Authentic ingredients, luxurious results, cultural pride in every bottle.",
}

export default function WaitlistPage() {
  return (
    <div className="bg-[#f7f3ec] text-[#1d1610]">
      <section className="relative min-h-[95vh] overflow-hidden text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/african-woman-in-nature-golden-hour-beauty.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/80" />
        </div>

        <div className="relative z-10 flex min-h-[95vh] flex-col">
          <header className="flex items-center justify-between px-6 py-6 md:px-12">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              <span className="text-white">Splendid</span>{" "}
              <span className="text-[#caa227]">Beauty</span>
            </Link>
            <button className="group flex items-center gap-2 rounded-full bg-[#caa227] px-5 py-2 text-sm font-semibold text-[#1d1610] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#b68f1f]">
              <Bell className="h-4 w-4" />
              Join Waitlist
            </button>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-4 text-center md:px-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[#f1dfb5] ring-1 ring-white/20 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#caa227]" />
              Launching Spring 2026
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              Beauty Rooted in <span className="text-[#caa227]">Heritage</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/85">
              Be first to experience the finest African and Caribbean beauty products. Authentic ingredients,
              luxurious results, cultural pride in every bottle.
            </p>

            <FormspreeEmailForm
              formClassName="mt-10 flex w-full max-w-2xl flex-col gap-4 rounded-full bg-white/10 p-2 backdrop-blur sm:flex-row sm:rounded-full sm:bg-white/5 sm:p-2"
              inputClassName="w-full rounded-full border border-white/20 bg-white/95 px-6 py-4 text-base text-[#1d1610] placeholder:text-[#8a7d70] shadow-[0_10px_40px_rgba(0,0,0,0.12)] outline-none transition focus:border-[#caa227] focus:ring-2 focus:ring-[#caa227]/60"
              buttonClassName="w-full rounded-full bg-[#caa227] px-8 py-4 text-base font-semibold text-[#1d1610] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#b68f1f] sm:w-auto sm:min-w-[170px]"
              buttonText="Join Waitlist"
              placeholder="Enter your email"
              formId="mldqknea"
              successMessage="Thanks for joining! We'll be in touch soon."
              successClassName="text-white"
            />

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/85">
              {heroPerks.map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#caa227]" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center pb-10">
            <div className="flex h-12 w-8 items-center justify-center rounded-full border border-white/30 text-white/70">
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <h2 className="text-4xl font-semibold text-[#1c140f] sm:text-5xl">Why Join the Waitlist?</h2>
          <p className="mt-4 max-w-2xl text-lg text-[#5c5350]">
            Join thousands of beauty enthusiasts securing their place in our exclusive community
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {joinReasons.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex flex-col items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#caa227]/20 text-[#1d1610]">
                <Icon className="h-7 w-7 text-[#9d7821]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#1c140f]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#5c5350]">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl items-center gap-4 rounded-full bg-[#f3ede3] px-6 py-4 text-[#1d1610] shadow-inner">
          <div className="flex -space-x-3">
            {["#caa227", "#b48c22", "#9f7a1c", "#7b5c15"].map((color, index) => (
              <span
                key={color}
                className="h-8 w-8 rounded-full border-2 border-[#f3ede3]"
                style={{ background: color, zIndex: 4 - index }}
              />
            ))}
          </div>
          <span className="text-sm font-semibold">2,847 beauty lovers already joined</span>
        </div>
      </section>

      <section className="bg-[#fdfaf4] px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
            <Image
              src="/smiling-african-woman.png"
              alt="Confident woman representing Splendid Beauty"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#caa227]/15 px-4 py-2 text-sm font-semibold text-[#9d7821]">
              <Sparkles className="h-4 w-4" />
              Cultural Heritage
            </div>
            <h3 className="text-4xl font-semibold leading-tight text-[#1c140f] sm:text-5xl">
              Celebrating <span className="text-[#caa227]">Cultural Roots</span>
            </h3>
            <p className="text-lg text-[#514844]">
              At Splendid Beauty, we believe beauty is deeply connected to heritage. Our curated collection celebrates
              the rich traditions of African and Caribbean beauty, bringing you products that honor ancestral wisdom
              while delivering modern luxury.
            </p>

            <div className="space-y-5">
              {heritagePillars.map((pillar) => (
                <div key={pillar.title} className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#caa227]/20">
                    <span className="h-2 w-2 rounded-full bg-[#caa227]" />
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-[#1c140f]">{pillar.title}</h4>
                    <p className="text-sm leading-relaxed text-[#5c5350]">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="text-4xl font-semibold text-[#1c140f] sm:text-5xl">Early Access Community</h3>
          <p className="mt-4 text-lg text-[#5c5350]">
            Hear from those who&apos;ve had a sneak peek at what&apos;s coming
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          {testimonials.map(({ quote, name, location, role }) => (
            <div
              key={name}
              className="flex h-full flex-col gap-4 rounded-3xl bg-[#f8f4ec] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <Quote className="h-10 w-10 text-[#d5c39a]" />
              <div className="flex items-center gap-1 text-[#caa227]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-[#caa227]" />
                ))}
              </div>
              <p className="text-base leading-relaxed text-[#3d342f]">"{quote}"</p>
              <div className="mt-auto space-y-1">
                <p className="text-base font-semibold text-[#1c140f]">{name}</p>
                <p className="text-sm text-[#736b66]">{location}</p>
                <p className="text-xs font-semibold tracking-wide text-[#b58a1d]">{role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center text-sm text-[#4b403b]">
          Want to be part of the early access community?{" "}
          <span className="font-semibold text-[#caa227] underline decoration-[#caa227]/60">Join the waitlist today</span>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#caa227] via-[#9f7a1c] to-[#3a2516] px-6 py-24 text-white md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_40%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <h3 className="text-4xl font-semibold sm:text-5xl">Secure Your Spot</h3>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            Join our exclusive waitlist and be the first to experience beauty rooted in heritage
          </p>

          <FormspreeEmailForm
            formClassName="mt-10 flex w-full max-w-2xl flex-col gap-4 rounded-full bg-white/10 p-2 backdrop-blur-sm sm:flex-row"
            inputClassName="w-full rounded-full border border-white/30 bg-white/95 px-6 py-4 text-base text-[#1d1610] placeholder:text-[#8a7d70] shadow-[0_16px_40px_rgba(0,0,0,0.15)] outline-none transition focus:border-[#1c140f] focus:ring-2 focus:ring-[#1c140f]/60"
            buttonClassName="w-full rounded-full bg-[#1c140f] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:bg-black sm:w-auto sm:min-w-[170px]"
            buttonText="Join Now"
            placeholder="Enter your email"
            formId="mldqknea"
            successMessage="Thanks for joining! You'll be first to know."
            successClassName="text-white"
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-white/85">
            {ctaPerks.map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f9f5ee] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="text-3xl font-semibold text-[#1c140f] sm:text-4xl">Stay Updated on Our Launch</h3>
          <p className="mt-4 text-lg text-[#5c5350]">
            Get exclusive access to launch updates, special offers, and beauty tips rooted in heritage
          </p>

          <FormspreeEmailForm
            formClassName="mx-auto mt-10 flex max-w-2xl flex-col gap-4 rounded-full bg-white px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:px-5 sm:py-3"
            inputClassName="w-full rounded-full border border-transparent bg-transparent px-4 py-3 text-base text-[#1d1610] placeholder:text-[#8a7d70] outline-none focus:border-[#caa227] focus:ring-2 focus:ring-[#caa227]/40"
            buttonClassName="w-full rounded-full bg-[#caa227] px-6 py-3 text-base font-semibold text-[#1d1610] transition hover:-translate-y-0.5 hover:bg-[#b68f1f] sm:w-auto"
            buttonText="Subscribe"
            placeholder="Enter your email"
            successMessage="You're on the list!"
            formId="mwpgjbpk"
          />
        </div>
      </section>

      <footer className="border-t border-[#e8e0d5] bg-white px-6 pb-12 pt-10 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4">
            <Link href="/" className="text-2xl font-semibold tracking-tight text-[#1c140f]">
              Splendid <span className="text-[#caa227]">Beauty</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#5c5350]">
              Celebrating the beauty traditions of Africa and the Caribbean. Authentic products, modern luxury, cultural
              pride.
            </p>
            <div className="flex items-center gap-3">
              {["Instagram", "Facebook", "Twitter", "Email"].map((label) => (
                <span
                  key={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3ede3] text-[#1d1610] shadow-sm"
                >
                  {label === "Email" ? (
                    <MailIcon />
                  ) : label === "Facebook" ? (
                    <FacebookIcon />
                  ) : label === "Twitter" ? (
                    <TwitterIcon />
                  ) : (
                    <InstagramIcon />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#1c140f]">Support</h4>
              <div className="space-y-2 text-sm text-[#5c5350]">
                <p>Contact Us</p>
                <p>FAQ</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 text-sm text-[#5c5350] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Splendid Beauty Stores. All rights reserved.</p>
          <div className="flex gap-4">
            <p className="hover:text-[#caa227]">Privacy Policy</p>
            <p className="hover:text-[#caa227]">Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3.75h10A3.25 3.25 0 0 1 20.25 7v10A3.25 3.25 0 0 1 17 20.25H7A3.25 3.25 0 0 1 3.75 17V7A3.25 3.25 0 0 1 7 3.75Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.25 11.25a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13.5 10.5H15V8h-1.5C12.57 8 12 8.657 12 9.5V11H10v2h2v6h2v-6h1.5l.5-2H14v-1c0-.333.167-.5.5-.5Z" />
      <path
        fillRule="evenodd"
        d="M4 4.75A1.75 1.75 0 0 1 5.75 3h12.5A1.75 1.75 0 0 1 20 4.75v14.5A1.75 1.75 0 0 1 18.25 21H5.75A1.75 1.75 0 0 1 4 19.25V4.75ZM5.75 4.5a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V4.75a.25.25 0 0 0-.25-.25H5.75Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M19.633 7.997c.013.181.013.363.013.544 0 5.545-4.22 11.94-11.94 11.94v-.003A11.87 11.87 0 0 1 2 18.915c.308.036.619.054.93.055a8.412 8.412 0 0 0 5.21-1.793 4.2 4.2 0 0 1-3.918-2.912c.636.122 1.29.097 1.912-.073a4.19 4.19 0 0 1-3.366-4.115v-.053a4.16 4.16 0 0 0 1.903.526A4.2 4.2 0 0 1 3.43 5.295a11.91 11.91 0 0 0 8.646 4.385A4.197 4.197 0 0 1 15.5 4.3a4.152 4.152 0 0 1 2.978 1.285 8.366 8.366 0 0 0 2.664-1.02 4.206 4.206 0 0 1-1.84 2.319A8.39 8.39 0 0 0 22 6.133a8.533 8.533 0 0 1-2.367 2.353Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M4 6.75A1.75 1.75 0 0 1 5.75 5h12.5A1.75 1.75 0 0 1 20 6.75v10.5A1.75 1.75 0 0 1 18.25 19H5.75A1.75 1.75 0 0 1 4 17.25V6.75Zm1.75-.25a.25.25 0 0 0-.25.25v.334l6.033 4.024a.75.75 0 0 0 .934 0L18.5 7.084V6.75a.25.25 0 0 0-.25-.25H5.75Zm12.75 2.49-4.897 3.271a2.25 2.25 0 0 1-2.706 0L6.75 8.99v8.26c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V8.99Z" />
    </svg>
  )
}
