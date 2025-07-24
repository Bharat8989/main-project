import { Header } from "@/components/layout/header"
import { Hero } from "@/components/home/hero"
import { FeaturedProducts } from "@/components/home/featured-products"
import { HowItWorks } from "@/components/home/how-it-works"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
