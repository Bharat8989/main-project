import { NextResponse } from "next/server"

export async function GET() {
  const myProducts = [
    { id: "1", name: "Tomato", price: 20 },
    { id: "2", name: "Potato", price: 15 },
  ]
  return NextResponse.json(myProducts)
}
