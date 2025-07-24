"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { FarmerDashboard } from "@/components/dashboard/farmer-dashboard"
import { BuyerDashboard } from "@/components/dashboard/buyer-dashboard"
import { Header } from "@/components/layout/header"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.role === "farmer" ? <FarmerDashboard /> : <BuyerDashboard />}
      </main>
    </div>
  )
}
