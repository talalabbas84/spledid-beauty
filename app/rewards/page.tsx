"use client"

import { useState, useEffect } from "react"
import { Award, Star, Gift, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { getRewardsProgram } from "@/lib/api/strapi"
import type { RewardsProgram } from "@/lib/api/types"
import { cn } from "@/lib/utils"

export default function RewardsPage() {
  const { rewardsPoints } = useStore()
  const [rewardsProgram, setRewardsProgram] = useState<RewardsProgram | null>(null)
  const [selectedRedemption, setSelectedRedemption] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRewards() {
      const program = await getRewardsProgram()
      setRewardsProgram(program)
      setLoading(false)
    }
    fetchRewards()
  }, [])

  if (loading || !rewardsProgram) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const currentTier =
    rewardsProgram.tiers.find((tier, idx) => {
      const nextTier = rewardsProgram.tiers[idx + 1]
      if (!nextTier) return true
      return rewardsPoints < nextTier.minPoints
    }) || rewardsProgram.tiers[0]

  const nextTier = rewardsProgram.tiers[rewardsProgram.tiers.indexOf(currentTier) + 1]
  const progressToNext = nextTier
    ? ((rewardsPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Splendid Rewards</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Earn points on every purchase and unlock exclusive benefits as you shop our heritage beauty collection.
          </p>
        </div>
      </section>

      {/* Points Summary */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-muted/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="text-center md:text-left">
                <p className="text-muted-foreground mb-1">Your Points Balance</p>
                <p className="font-serif text-5xl text-primary">{rewardsPoints.toLocaleString()}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-muted-foreground mb-1">Current Tier</p>
                <p className="font-serif text-3xl text-foreground">{currentTier.name}</p>
              </div>
            </div>
            {nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{currentTier.name}</span>
                  <span className="text-muted-foreground">{nextTier.name}</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {nextTier.minPoints - rewardsPoints} points to {nextTier.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">Membership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rewardsProgram.tiers.map((tier, idx) => (
              <div
                key={tier.name}
                className={cn(
                  "rounded-2xl p-6 border-2 transition-all",
                  currentTier.name === tier.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30",
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      idx === 0
                        ? "bg-amber-700/20 text-amber-700"
                        : idx === 1
                          ? "bg-yellow-500/20 text-yellow-600"
                          : "bg-slate-300/30 text-slate-500",
                    )}
                  >
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.minPoints}+ points</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redeem Points */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-foreground text-center mb-4">Redeem Your Points</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Turn your points into rewards. The more you save, the more you get!
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {rewardsProgram.redemption.map((option) => (
              <button
                key={option.points}
                onClick={() => setSelectedRedemption(option.points)}
                disabled={rewardsPoints < option.points}
                className={cn(
                  "p-6 rounded-xl border-2 text-center transition-all",
                  selectedRedemption === option.points
                    ? "border-primary bg-primary/5"
                    : rewardsPoints >= option.points
                      ? "border-border hover:border-primary/50 bg-background"
                      : "border-border bg-muted/50 opacity-60 cursor-not-allowed",
                )}
              >
                <p className="font-serif text-3xl text-primary mb-2">${option.value}</p>
                <p className="text-muted-foreground">{option.points.toLocaleString()} points</p>
              </button>
            ))}
          </div>
          {selectedRedemption && (
            <div className="text-center mt-8">
              <Button className="bg-primary hover:bg-primary/90">
                Redeem {selectedRedemption.toLocaleString()} Points
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How to Earn */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">Ways to Earn</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Shop & Earn</h3>
              <p className="text-muted-foreground">Earn {rewardsProgram.pointsPerDollar} points for every $1 spent</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Birthday Bonus</h3>
              <p className="text-muted-foreground">Get 200 bonus points on your birthday</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Write Reviews</h3>
              <p className="text-muted-foreground">Earn 50 points per product review</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-background mb-4">Ready to Start Earning?</h2>
          <p className="text-background/70 mb-8 max-w-xl mx-auto">
            Join Splendid Rewards today and start earning points on every purchase.
          </p>
          <Button variant="outline" className="border-primary bg-primary text-primary-foreground hover:bg-primary/90">
            Create Free Account
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
