"use client"
import Image from "next/image"

const BannerImage = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://media.geeksforgeeks.org/auth-dashboard-uploads/gate_promo_image.jpg"
              alt="Promotional Banner"
              width={1200}
              height={400}
              className="w-full h-auto transition-transform duration-300 hover:scale-105"
              priority
            />
            {/* Optional overlay for better text visibility if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerImage

