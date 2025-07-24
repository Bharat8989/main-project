import { type NextRequest, NextResponse } from "next/server"

// Mock database - In production, use MongoDB
const products: any[] = [
  {
    _id: "1",
    name: { en: "Fresh Tomatoes", hi: "ताज़े टमाटर", mr: "ताजे टोमॅटो" },
    description: { en: "Organic red tomatoes", hi: "जैविक लाल टमाटर", mr: "सेंद्रिय लाल टोमॅटो" },
    price: 40,
    unit: "kg",
    quantity: 100,
    category: "vegetables",
    images: ["/placeholder.svg?height=300&width=300"],
    seller: {
      _id: "seller1",
      name: "Ramesh Kumar",
      location: "Pune, Maharashtra",
    },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: { en: "Organic Spinach", hi: "जैविक पालक", mr: "सेंद्रिय पालक" },
    description: { en: "Fresh green spinach leaves", hi: "ताज़ी हरी पालक की पत्तियां", mr: "ताजी हिरवी पालकाची पाने" },
    price: 25,
    unit: "bunch",
    quantity: 50,
    category: "vegetables",
    images: ["/placeholder.svg?height=300&width=300"],
    seller: {
      _id: "seller2",
      name: "Sunita Devi",
      location: "Nashik, Maharashtra",
    },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: { en: "Sweet Mangoes", hi: "मीठे आम", mr: "गोड आंबे" },
    description: { en: "Juicy Alphonso mangoes", hi: "रसीले अल्फांसो आम", mr: "रसाळ आल्फान्सो आंबे" },
    price: 120,
    unit: "dozen",
    quantity: 30,
    category: "fruits",
    images: ["/placeholder.svg?height=300&width=300"],
    seller: {
      _id: "seller3",
      name: "Prakash Patil",
      location: "Ratnagiri, Maharashtra",
    },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: { en: "Fresh Carrots", hi: "ताज़ी गाजर", mr: "ताजे गाजर" },
    description: { en: "Crunchy orange carrots", hi: "कुरकुरी नारंगी गाजर", mr: "कुरकुरीत नारिंगी गाजर" },
    price: 35,
    unit: "kg",
    quantity: 80,
    category: "vegetables",
    images: ["/placeholder.svg?height=300&width=300"],
    seller: {
      _id: "seller1",
      name: "Ramesh Kumar",
      location: "Pune, Maharashtra",
    },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: { en: "Basmati Rice", hi: "बासमती चावल", mr: "बासमती तांदूळ" },
    description: {
      en: "Premium quality basmati rice",
      hi: "प्रीमियम गुणवत्ता बासमती चावल",
      mr: "प्रीमियम गुणवत्तेचे बासमती तांदूळ",
    },
    price: 80,
    unit: "kg",
    quantity: 200,
    category: "grains",
    images: ["/placeholder.svg?height=300&width=300"],
    seller: {
      _id: "seller4",
      name: "Arjun Singh",
      location: "Amravati, Maharashtra",
    },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: { en: "Fresh Milk", hi: "ताज़ा दूध", mr: "ताजे दूध" },
    description: { en: "Pure cow milk", hi: "शुद्ध गाय का दूध", mr: "शुद्ध गायीचे दूध" },
    price: 45,
    unit: "liter",
    quantity: 100,
    category: "dairy",
    images: ["/placeholder.svg?height=300&width=300"],
    seller: {
      _id: "seller5",
      name: "Lakshmi Dairy",
      location: "Kolhapur, Maharashtra",
    },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    const sort = searchParams.get("sort") || "newest"
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    let filteredProducts = [...products]

    // Filter by featured
    if (featured === "true") {
      filteredProducts = filteredProducts.filter((p) => p.featured)
    }

    // Filter by category
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((p) => p.category === category)
    }

    // Sort products
    switch (sort) {
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filteredProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name":
        filteredProducts.sort((a, b) => {
          const nameA = typeof a.name === "string" ? a.name : a.name.en
          const nameB = typeof b.name === "string" ? b.name : b.name.en
          return nameA.localeCompare(nameB)
        })
        break
    }

    const limitedProducts = filteredProducts.slice(0, limit)

    return NextResponse.json({
      products: limitedProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const productData = JSON.parse(formData.get("productData") as string)

    // In production, handle image uploads to cloud storage
    const images: string[] = []
    for (let i = 0; i < 5; i++) {
      const image = formData.get(`image${i}`)
      if (image) {
        // Mock image URL - in production, upload to cloud storage
        images.push(`/placeholder.svg?height=300&width=300&query=${productData.name.en}`)
      }
    }

    const product = {
      _id: Date.now().toString(),
      ...productData,
      price: Number.parseFloat(productData.price),
      quantity: Number.parseInt(productData.quantity),
      images,
      seller: {
        _id: "current-user-id", // Get from JWT token
        name: "Current User",
        location: "User Location",
      },
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(product)

    return NextResponse.json({
      message: "Product added successfully",
      product,
    })
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
