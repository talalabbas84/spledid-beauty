"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, type UserRole } from "@/lib/auth-store"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole: UserRole
  redirectTo: string
}

export function AuthGuard({ children, requiredRole, redirectTo }: AuthGuardProps) {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Small delay to allow hydration
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isChecking && !isLoading) {
      if (!user || user.role !== requiredRole) {
        router.push(redirectTo)
      }
    }
  }, [user, isChecking, isLoading, requiredRole, redirectTo, router])

  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
