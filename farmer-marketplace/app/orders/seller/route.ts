import { NextResponse } from "next/server"

export async function GET() {
  const orders = [
    { id: "o1", product: "Apple", buyer: "John", quantity: 2 },
    { id: "o2", product: "Carrot", buyer: "Jane", quantity: 5 },
  ]
  return NextResponse.json(orders)
}
