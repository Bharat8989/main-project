"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/components/providers/i18n-provider"
import { useToast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProductAdded: () => void
}

export function AddProductDialog({ open, onOpenChange, onProductAdded }: AddProductDialogProps) {
  const { t } = useI18n()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: { en: "", hi: "", mr: "" },
    description: { en: "", hi: "", mr: "" },
    price: "",
    unit: "",
    quantity: "",
    category: "",
  })

  const categories = ["vegetables", "fruits", "grains", "dairy", "herbs", "spices", "other"]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files].slice(0, 5)) // Max 5 images
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()

      // Add product data
      formDataToSend.append("productData", JSON.stringify(formData))

      // Add images
      images.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image)
      })

      const response = await fetch("/api/products", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        toast({
          title: t("success"),
          description: t("productAdded"),
        })
        onProductAdded()
        onOpenChange(false)
        // Reset form
        setFormData({
          name: { en: "", hi: "", mr: "" },
          description: { en: "", hi: "", mr: "" },
          price: "",
          unit: "",
          quantity: "",
          category: "",
        })
        setImages([])
      } else {
        throw new Error("Failed to add product")
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("addProductError"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("addProduct")}</DialogTitle>
          <DialogDescription>{t("addProductDescription")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name in Multiple Languages */}
          <div className="space-y-4">
            <Label>{t("productName")}</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="name-en" className="text-sm">
                  English
                </Label>
                <Input
                  id="name-en"
                  value={formData.name.en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: { ...formData.name, en: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="name-hi" className="text-sm">
                  हिंदी
                </Label>
                <Input
                  id="name-hi"
                  value={formData.name.hi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: { ...formData.name, hi: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="name-mr" className="text-sm">
                  मराठी
                </Label>
                <Input
                  id="name-mr"
                  value={formData.name.mr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: { ...formData.name, mr: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Product Description in Multiple Languages */}
          <div className="space-y-4">
            <Label>{t("productDescription")}</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="desc-en" className="text-sm">
                  English
                </Label>
                <Textarea
                  id="desc-en"
                  value={formData.description.en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: { ...formData.description, en: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="desc-hi" className="text-sm">
                  हिंदी
                </Label>
                <Textarea
                  id="desc-hi"
                  value={formData.description.hi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: { ...formData.description, hi: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="desc-mr" className="text-sm">
                  मराठी
                </Label>
                <Textarea
                  id="desc-mr"
                  value={formData.description.mr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: { ...formData.description, mr: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Price and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">{t("price")} (₹)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">{t("unit")}</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="kg, piece, dozen, etc."
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">{t("quantity")}</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">{t("category")}</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {t(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div>
            <Label>{t("productImages")} (Max 5)</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{t("uploadImages")}</p>
                </div>
              </Label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("adding") : t("addProduct")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
