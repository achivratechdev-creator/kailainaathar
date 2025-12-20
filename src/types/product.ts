// product.types.ts

export interface RelatedProduct {
  id: number
  name: string
  image: string
  price: number
  mrp?: number
  rating?: number
}

export interface Product extends RelatedProduct {
  description: string
  categoryLabel: string
  badge?: "Best Seller" | null
  reviews?: number
  benefits?: string[]
  ingredients?: string[]
  reviewsList?: Review[]
  relatedProducts?: RelatedProduct[]
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  verified?: boolean
  createdAt: string
  helpfulCount?: number
  media?: string[]
}
