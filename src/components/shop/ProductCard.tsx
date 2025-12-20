"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ShopProduct } from '@/types/shop';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: ShopProduct;
  isInCart: boolean;
  onToggleCart: (product: ShopProduct) => void;
}

export default function ProductCard({ product, isInCart, onToggleCart }: ProductCardProps) {
  const router = useRouter();

  // 1. Buy Now Handler: Add (if needed) -> Redirect to Cart
  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card's main click
    
    if (!isInCart) {
      onToggleCart(product);
    }
    router.push('/login')
  };

  // 2. Add to Cart Handler: Add -> Redirect to Cart (or Remove)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card's main click

    if (isInCart) {
      // If already in cart, just remove it (Toggle)
      onToggleCart(product);
    } else {
      // If adding, Add AND Redirect to Cart
      onToggleCart(product);
      router.push('/cart');
    }
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
      
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-bold text-[10px] flex items-center gap-1 shadow-md">
          <Star className="w-3 h-3 fill-white" />
          Best Seller
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Category Tag */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating Stars (Fixed to show actual rating) */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`w-3.5 h-3.5 ${star <= product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">({product.rating})</span>
        </div>

        {/* Price Section */}
        <div className="mb-3">
          <span className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">
            ₹{product.originalPrice}
          </span>
          <span className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">
            ₹{product.price}
          </span>
        </div>

        {/* Buttons (Add to Cart & Buy Now) */}
        <div className="flex flex-col gap-2">
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 border px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs transition-all ${
              isInCart 
                ? 'bg-red-50 border-red-500 text-red-500 hover:bg-red-100' 
                : 'bg-white border-[#2e7d32] text-[#2e7d32] hover:bg-[#2e7d32] hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          
          {/* Buy Now Button */}
          <button 
            onClick={handleBuyNow} 
            className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all"
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}