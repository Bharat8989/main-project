"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/components/providers/i18n-provider"

interface MarketplaceFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function MarketplaceFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: MarketplaceFiltersProps) {
  const { t } = useI18n()

  const categories = [
    { value: "all", label: t("allCategories") },
    { value: "vegetables", label: t("vegetables") },
    { value: "fruits", label: t("fruits") },
    { value: "grains", label: t("grains") },
    { value: "dairy", label: t("dairy") },
    { value: "herbs", label: t("herbs") },
    { value: "spices", label: t("spices") },
    { value: "other", label: t("other") },
  ]

  const sortOptions = [
    { value: "newest", label: t("newest") },
    { value: "oldest", label: t("oldest") },
    { value: "price-low", label: t("priceLowToHigh") },
    { value: "price-high", label: t("priceHighToLow") },
    { value: "name", label: t("alphabetical") },
  ]

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("categories")}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <RadioGroupItem value={category.value} id={category.value} />
                <Label htmlFor={category.value} className="text-sm font-normal cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Sort By */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("sortBy")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range - Future Enhancement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("priceRange")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{t("comingSoon")}</p>
        </CardContent>
      </Card>
    </div>
  )
}
