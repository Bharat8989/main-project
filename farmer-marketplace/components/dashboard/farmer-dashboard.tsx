"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/components/providers/i18n-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { ProductCard } from "@/components/products/product-card"
import { AddProductDialog } from "@/components/products/add-product-dialog"
import { Plus, Package, ShoppingCart, MessageCircle, TrendingUp } from "lucide-react"
import type { Product, Order } from "@/types"

export function FarmerDashboard() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })
  const [showAddProduct, setShowAddProduct] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes, statsRes] = await Promise.all([
        fetch("/api/products/my-products"),
        fetch("/api/orders/seller"),
        fetch("/api/dashboard/farmer-stats"),
      ])

      const [productsData, ordersData, statsData] = await Promise.all([
        productsRes.json(),
        ordersRes.json(),
        statsRes.json(),
      ])

      setProducts(productsData.products || [])
      setOrders(ordersData.orders || [])
      setStats(statsData.stats || stats)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("welcome")}, {user?.name}!
          </h1>
          <p className="text-gray-600">{t("farmerDashboardDesc")}</p>
        </div>
        <Button onClick={() => setShowAddProduct(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t("addProduct")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalProducts")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalOrders")}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalRevenue")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("pendingOrders")}</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* My Products */}
      <Card>
        <CardHeader>
          <CardTitle>{t("myProducts")}</CardTitle>
          <CardDescription>{t("manageYourProducts")}</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} showActions />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">{t("noProductsYet")}</p>
              <Button onClick={() => setShowAddProduct(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t("addFirstProduct")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{t("recentOrders")}</CardTitle>
          <CardDescription>{t("manageYourOrders")}</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-600">{order.buyer.name}</p>
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

      <AddProductDialog open={showAddProduct} onOpenChange={setShowAddProduct} onProductAdded={fetchDashboardData} />
    </div>
  )
}
