"use client"

import { useI18n } from "@/components/providers/i18n-provider"
import { UserPlus, Upload, ShoppingCart, MessageCircle } from "lucide-react"

export function HowItWorks() {
  const { t } = useI18n()

  const steps = [
    {
      icon: UserPlus,
      title: t("step1Title"),
      description: t("step1Desc"),
    },
    {
      icon: Upload,
      title: t("step2Title"),
      description: t("step2Desc"),
    },
    {
      icon: ShoppingCart,
      title: t("step3Title"),
      description: t("step3Desc"),
    },
    {
      icon: MessageCircle,
      title: t("step4Title"),
      description: t("step4Desc"),
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("howItWorksTitle")}</h2>
          <p className="text-xl text-gray-600">{t("howItWorksSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
