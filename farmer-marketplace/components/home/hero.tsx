"use client"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/providers/i18n-provider"
import Link from "next/link"
import { ArrowRight, Users, Leaf, ShoppingBag } from "lucide-react"

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t("heroTitle")}</h1>
            <p className="text-xl text-gray-600 mb-8">{t("heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/signup?role=farmer">
                  {t("startSelling")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/marketplace">{t("startBuying")}</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Users className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{t("directConnection")}</h3>
                <p className="text-sm text-gray-600">{t("directConnectionDesc")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                <Leaf className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{t("freshProduce")}</h3>
                <p className="text-sm text-gray-600">{t("freshProduceDesc")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg -mt-4">
                <ShoppingBag className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{t("easyOrdering")}</h3>
                <p className="text-sm text-gray-600">{t("easyOrderingDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
