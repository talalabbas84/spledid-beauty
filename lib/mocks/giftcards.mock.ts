import type { GiftCard, RewardsProgram } from "../api/types"

export const mockGiftCards: GiftCard[] = [
  { id: "gc-25", amount: 25, image: "/gift-card-gold-25-dollars.jpg" },
  { id: "gc-50", amount: 50, image: "/gift-card-gold-50-dollars.jpg" },
  { id: "gc-100", amount: 100, image: "/gift-card-gold-100-dollars.jpg" },
  { id: "gc-200", amount: 200, image: "/gift-card-gold-200-dollars.jpg" },
]

export const mockRewardsProgram: RewardsProgram = {
  pointsPerDollar: 10,
  tiers: [
    {
      name: "Bronze",
      minPoints: 0,
      benefits: ["Earn 10 points per $1 spent", "Birthday bonus points", "Exclusive member sales"],
    },
    {
      name: "Gold",
      minPoints: 500,
      benefits: [
        "Earn 15 points per $1 spent",
        "Free shipping on orders $50+",
        "Early access to new products",
        "Gold-exclusive discounts",
      ],
    },
    {
      name: "Platinum",
      minPoints: 1500,
      benefits: [
        "Earn 20 points per $1 spent",
        "Free shipping on all orders",
        "Exclusive Platinum gifts",
        "Priority customer support",
        "Annual appreciation gift",
      ],
    },
  ],
  redemption: [
    { points: 100, value: 5 },
    { points: 250, value: 15 },
    { points: 500, value: 35 },
    { points: 1000, value: 75 },
  ],
}
