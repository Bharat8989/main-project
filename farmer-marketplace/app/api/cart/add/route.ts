// /app/api/cart/add/route.ts

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, quantity } = body

    console.log("Add to cart: ", { productId, quantity })

    // You can connect to MongoDB or other DB here
    // Example:
    // await db.cart.insert({ userId, productId, quantity })

    return NextResponse.json({ success: true, message: "Item added to cart" })
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
  }
}
