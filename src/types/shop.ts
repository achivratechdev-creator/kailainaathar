// Defines the ShopProduct interface used across the app.
export interface ShopProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
  rating: number; // 0.0 - 5.0
  isBestSeller?: boolean;
}