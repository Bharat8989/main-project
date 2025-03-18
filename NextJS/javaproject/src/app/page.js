"use client"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Cards from "../components/Cards"
import BannerImage from "../components/Image"
import Explore from "../components/Explore"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Home />
        <Cards />
        <BannerImage />
        <Explore />
      </main>
      <Footer />
    </div>
  )
}

