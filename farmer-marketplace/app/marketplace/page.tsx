import { Header } from "@/components/layout/header"
import { MarketplaceContent } from "@/components/marketplace/marketplace-content"
import { Footer } from "@/components/layout/footer"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <MarketplaceContent />
      </main>
      <Footer />
    </div>
  )
}
