"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/components/providers/i18n-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { ProductCard } from "@/components/products/product-card"
import { ShoppingCart, Heart, Package, MessageCircle } from "lucide-react"
import type { Product, Order } from "@/types"

export function BuyerDashboard() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    favoriteProducts: 0,
    activeChats: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, statsRes] = await Promise.all([
        fetch("/api/products?limit=8"),
        fetch("/api/orders/buyer"),
        fetch("/api/dashboard/buyer-stats"),
      ])

      const [productsData, ordersData, statsData] = await Promise.all([
        productsRes.json(),
        ordersRes.json(),
        statsRes.json(),
      ])

      setRecentProducts(productsData.products || [])
      setOrders(ordersData.orders || [])
      setStats(statsData.stats || stats)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t("welcome")}, {user?.name}!
        </h1>
        <p className="text-gray-600">{t("buyerDashboardDesc")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalOrders")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalSpent")}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("favoriteProducts")}</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favoriteProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("activeChats")}</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeChats}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>{t("recentProducts")}</CardTitle>
          <CardDescription>{t("discoverFreshProducts")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{t("recentOrders")}</CardTitle>
          <CardDescription>{t("trackYourOrders")}</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-600">{order.seller.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{t("noOrdersYet")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
