import type { Concern } from "../api/types"

export const mockConcerns: Concern[] = [
  {
    id: "concern_1",
    slug: "hyperpigmentation",
    name: "Hyperpigmentation",
    description:
      "Dark spots, uneven skin tone, and discoloration caused by sun damage, acne scars, or hormonal changes.",
    image: "/dark-spots-hyperpigmentation-skin-concern.jpg",
    productCount: 12,
  },
  {
    id: "concern_2",
    slug: "dry-skin",
    name: "Dry Skin",
    description: "Tight, flaky, or rough skin that lacks moisture and needs deep hydration.",
    image: "/dry-skin-dehydrated-skincare-concern.jpg",
    productCount: 18,
  },
  {
    id: "concern_3",
    slug: "acne",
    name: "Acne",
    description: "Breakouts, blemishes, and congested pores that need gentle yet effective treatment.",
    image: "/acne-prone-skin-skincare-concern.jpg",
    productCount: 8,
  },
  {
    id: "concern_4",
    slug: "aging",
    name: "Aging",
    description: "Fine lines, wrinkles, and loss of firmness that benefit from nourishing anti-aging ingredients.",
    image: "/anti-aging-mature-skin-skincare.jpg",
    productCount: 15,
  },
  {
    id: "concern_5",
    slug: "hair-growth",
    name: "Hair Growth",
    description: "Thinning hair, slow growth, and scalp health concerns that need targeted nourishment.",
    image: "/hair-growth-natural-hair-care.jpg",
    productCount: 10,
  },
  {
    id: "concern_6",
    slug: "damaged-hair",
    name: "Damaged Hair",
    description: "Breakage, dryness, and over-processed hair that needs repair and strengthening.",
    image: "/damaged-hair-repair-treatment.jpg",
    productCount: 9,
  },
  {
    id: "concern_7",
    slug: "eczema",
    name: "Eczema",
    description: "Irritated, inflamed skin that needs gentle, soothing ingredients to calm and heal.",
    image: "/eczema-sensitive-skin-soothing.jpg",
    productCount: 6,
  },
  {
    id: "concern_8",
    slug: "dullness",
    name: "Dullness",
    description: "Lackluster, tired-looking skin that needs brightening and radiance-boosting care.",
    image: "/dull-skin-brightening-glow.jpg",
    productCount: 14,
  },
]
