"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/components/providers/i18n-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types"
import { ShoppingCart, Edit, Trash2, MapPin } from "lucide-react"

interface ProductCardProps {
  product: Product
  showActions?: boolean
}

export function ProductCard({ product, showActions = false }: ProductCardProps) {
  const { t, language } = useI18n()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const getLocalizedText = (text: any) => {
    if (typeof text === "string") return text
    return text?.[language] || text?.en || ""
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: t("error"),
        description: t("loginRequired"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      })

      if (response.ok) {
        toast({
          title: t("success"),
          description: t("addedToCart"),
        })
      } else {
        throw new Error("Failed to add to cart")
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("addToCartError"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square">
        <Image
          src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=fresh produce"}
          alt={getLocalizedText(product.name)}
          fill
          className="object-cover"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-green-600">
            {t("featured")}
          </Badge>
        )}
      </div>

      {/* Product Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {getLocalizedText(product.name)}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {getLocalizedText(product.description)}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {product.seller?.location}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500">/{product.unit}</span>
          </div>
          <Badge variant="outline">
            {product.quantity} {t("available")}
          </Badge>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-0">
        {showActions && user?.role === "farmer" ? (
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              {t("edit")}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Trash2 className="w-4 h-4 mr-2" />
              {t("delete")}
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={loading || product.quantity === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {loading ? t("adding") : t("addToCart")}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
