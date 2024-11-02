export interface Product {
  id: number
  name: string
  description: string
  image_url: string
  favorites: boolean
  price: number
  discount: number
  cart: boolean
  category: string
}

export interface Order {
  id: number
  total: number
  products: Product[]
  createdAt: Date
  totalCartValue: number
  deliveryValue: number
}
export interface PaymentMethod {
  id: number
  name: string
}
