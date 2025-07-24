export interface User {
  _id: string
  name: string
  email: string
  role: "farmer" | "buyer"
  phone: string
  location: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  _id: string
  name: string | { en: string; hi: string; mr: string }
  description: string | { en: string; hi: string; mr: string }
  price: number
  unit: string
  quantity: number
  category: string
  images: string[]
  seller: {
    _id: string
    name: string
    location: string
  }
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Order {
  _id: string
  buyer: {
    _id: string
    name: string
    email: string
  }
  seller: {
    _id: string
    name: string
    email: string
  }
  items: {
    product: Product
    quantity: number
    price: number
  }[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    street: string
    city: string
    state: string
    pincode: string
  }
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  _id: string
  sender: string
  receiver: string
  message: string
  timestamp: string
  read: boolean
}

export interface Chat {
  _id: string
  participants: User[]
  lastMessage: ChatMessage
  unreadCount: number
  createdAt: string
  updatedAt: string
}
