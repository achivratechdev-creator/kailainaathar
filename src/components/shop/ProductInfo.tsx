import React, { useState } from 'react';
import { Star, Award, Phone, MessageCircle, ShoppingCart, Check } from 'lucide-react';
import { ProductDetail } from '@/types';
import QuantitySelector from './QuantitySelector';

export default function ProductInfo({ product }: { product: ProductDetail }) {
  const [quantity, setQuantity] = useState(1);

  // Helper to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div>
      {/* Title & Meta */}
      <div className="mb-4">
        {product.isFeatured && (
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-amber-700 font-['Poppins',sans-serif] font-medium text-xs bg-amber-50 px-2.5 py-1 rounded-full">
              Featured Product
            </span>
          </div>
        )}
        <h1 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-2xl mb-2.5 leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex items-center gap-0.5">
            {renderStars(product.ratingAverage)}
          </div>
          <span className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">
            ({product.ratingAverage})
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">
            {product.ratingCount}+ reviews
          </span>
        </div>
      </div>

      {/* Price Box */}
      <div className="mb-5 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-3xl">
            ₹{product.price}
          </span>
          <span className="text-gray-400 font-['Poppins',sans-serif] text-base line-through">
            ₹{product.originalPrice}
          </span>
          {product.discountPercentage && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full font-['Poppins',sans-serif] font-bold text-xs">
              Save {product.discountPercentage}%
            </span>
          )}
        </div>
        <p className="text-green-700 font-['Poppins',sans-serif] font-light text-xs">
          Inclusive of all taxes • Free shipping on orders above ₹500
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm mb-4 leading-relaxed">
        {product.description}
      </p>

      {/* Contact Box */}
      <div className="bg-gradient-to-r from-[#2e7d32]/5 to-[#66bb6a]/5 border border-[#2e7d32]/20 rounded-lg p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-[#2e7d32] rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1">
              Need Help? Contact Us
            </h4>
            <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-xs mb-2">
              Call or WhatsApp to know more about this product
            </p>
            <a href="tel:+919876543210" className="text-[#2e7d32] font-['Poppins',sans-serif] font-bold text-base hover:underline">
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Actions */}
      <QuantitySelector quantity={quantity} onChange={setQuantity} />

      <div className="flex gap-3 mb-6">
        <button className="flex-1 bg-white border-2 border-[#2e7d32] text-[#2e7d32] py-2.5 rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:bg-green-50 transition-all active:scale-95 flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        <button className="flex-1 bg-[#2e7d32] text-white py-2.5 rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:bg-[#256629] transition-all active:scale-95">
          Buy Now
        </button>
      </div>

      {/* Tabs / Accordions */}
      <div className="border-t border-gray-200 pt-5">
        <div className="mb-6">
          <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold mb-4">Benefits</h3>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <ul className="space-y-3">
              {product.benefits?.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 font-['Poppins',sans-serif] text-sm">
                  <Check className="w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5" />
                  <span className="font-light leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold mb-4">Ingredients</h3>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {product.ingredients?.map((ing, idx) => (
                <div key={idx} className="bg-white border border-green-200 text-[#2e7d32] px-4 py-2 rounded-full font-['Poppins',sans-serif] font-medium text-sm shadow-sm">
                  {ing}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}