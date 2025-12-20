import { ShopProduct } from '@/types/shop';

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 1,
    name: "Neelibringadi Kera Thailam",
    category: "Herbal Oils",
    price: 450,
    originalPrice: 585,
    image: "/images/neelibringadi.jpg", 
    description: "Traditional hair oil for healthy hair growth",
    rating: 1,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Triphala Choornam",
    category: "Powders",
    price: 180,
    originalPrice: 234,
    image: "/images/tripala.jpg",
    description: "Triple fruit powder for digestive health",
    rating: 2,
    isBestSeller: false
  },
  {
    id: 3,
    name: "Ashwagandha Tablets",
    category: "Medicines",
    price: 320,
    originalPrice: 416,
    image: "/images/ashwagandha.jpg",
    description: "Stress relief and energy booster",
    rating: 3,
    isBestSeller: false
  },
  {
    id: 4,
    name: "Kumkumadi Thailam",
    category: "Herbal Oils",
    price: 580,
    originalPrice: 754,
    image: "/images/kum-kumadi.jpg",
    description: "Premium face oil for glowing skin",
    rating: 3,
    isBestSeller: false
  },
  {
    id: 5,
    name: "Sukku Kaapi Powder",
    category: "Powders",
    price: 220,
    originalPrice: 286,
    image: "/images/sukku-kaapi.jpg",
    description: "Traditional herbal coffee for immunity",
    rating: 4,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Chyawanprash",
    category: "Medicines",
    price: 380,
    originalPrice: 494,
    image: "/images/Chyawanprash.jpg",
    description: "Complete health tonic for immunity",
    rating: 4,
    isBestSeller: false
  },
  
];