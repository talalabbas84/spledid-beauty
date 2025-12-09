import type { AboutContent, HomepageContent } from "../api/types"

export const mockAboutContent: AboutContent = {
  heroTitle: "Beauty Rooted in Heritage",
  heroSubtitle: "Celebrating African & Caribbean Beauty Traditions",
  heroImage: "/luxury-african-beauty-products-gold-dark.jpg",
  story: {
    title: "Our Story",
    content: `Splendid Beauty was born from a simple truth: for too long, the beauty industry overlooked the rich traditions and powerful ingredients that have kept African and Caribbean women radiant for generations.

Our founder grew up watching her grandmother create natural beauty remedies using shea butter, black soap, and tropical botanicals. These weren't just products—they were rituals of self-love passed down through generations.

Today, Splendid Beauty bridges the gap between ancestral wisdom and modern skincare science. We partner directly with women-led cooperatives across Africa and the Caribbean, ensuring that the communities who have preserved these traditions for centuries benefit from sharing their knowledge with the world.

Every product we create honors its cultural origins while meeting the highest standards of efficacy and safety. Because your beauty routine should be a celebration of heritage, not an erasure of it.`,
    image: "/elegant-black-woman-profile-gold-earrings-black-ou.jpg",
  },
  values: [
    {
      title: "Authenticity",
      description:
        "We source ingredients directly from their regions of origin, working with artisans who use traditional methods.",
      icon: "leaf",
    },
    {
      title: "Community",
      description:
        "Every purchase supports the women and families who harvest, process, and preserve these beauty traditions.",
      icon: "users",
    },
    {
      title: "Transparency",
      description:
        "We share the full story of every ingredient—where it comes from, who made it, and how it benefits your skin.",
      icon: "eye",
    },
    {
      title: "Sustainability",
      description:
        "Our commitment to the planet means sustainable sourcing, minimal packaging, and carbon-neutral shipping.",
      icon: "globe",
    },
  ],
  commitment: {
    title: "Our Commitment",
    content:
      "We believe that beauty is a birthright, not a privilege. Our mission is to create a space where every person can find products that celebrate their unique beauty while honoring the traditions of their ancestors.",
  },
}

export const mockHomepageContent: HomepageContent = {
  hero: {
    title: "Beauty Rooted in",
    subtitle: "Heritage",
    description:
      "Discover the finest African and Caribbean beauty products. Authentic ingredients, luxurious results, cultural pride in every bottle.",
    primaryCta: { text: "Shop Now", href: "/shop" },
    secondaryCta: { text: "Our Story", href: "/about" },
    backgroundImage: "/images/hero-bg.jpg",
  },
  featuredCollections: {
    title: "Featured Collections",
    subtitle: "Curated selections celebrating the richness of African and Caribbean beauty traditions",
    collections: [
      {
        name: "Glow from the Islands",
        description: "Caribbean-inspired skincare with tropical botanicals and natural radiance boosters",
        image: "/tropical-caribbean-plants-colorful-flowers.jpg",
        href: "/shop?collection=caribbean",
      },
      {
        name: "African Botanicals",
        description: "Pure ingredients sourced from the heart of Africa for authentic beauty rituals",
        image: "/african-woman-traditional-colorful-clothing-smilin.jpg",
        href: "/shop?collection=african",
      },
      {
        name: "Diaspora Beauty Icons",
        description: "Heritage-inspired favorites that have defined beauty across generations",
        image: "/luxury-beauty-products-gold-packaging-elegant.jpg",
        href: "/shop?collection=icons",
      },
    ],
  },
}
