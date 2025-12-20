import React from 'react';
import { Shield, Truck, RotateCcw, Star } from 'lucide-react';
import { ProductDetail } from '@/types';

export default function ProductGallery({ product }: { product: ProductDetail }) {
  return (
    <div className="relative">
      <div className="sticky top-24">
        {/* Main Image Container */}
        <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden bg-gray-50 border border-gray-200 relative group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isFeatured && (
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full font-['Poppins',sans-serif] font-bold text-xs flex items-center gap-1.5 shadow-md">
                <Star className="w-3 h-3 fill-white text-white" />
                Premium
              </div>
            )}
            <div className="bg-white/95 backdrop-blur-sm text-[#2e7d32] px-3 py-1.5 rounded-full font-['Poppins',sans-serif] font-medium text-xs shadow-md">
              {product.category}
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 max-w-md mx-auto">
          <div className="bg-green-50 rounded-lg p-2.5 text-center border border-green-200">
            <Shield className="w-5 h-5 text-[#2e7d32] mx-auto mb-1" />
            <p className="text-[#2e7d32] font-['Poppins',sans-serif] font-bold text-[10px]">100% Authentic</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2.5 text-center border border-blue-200">
            <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-blue-600 font-['Poppins',sans-serif] font-bold text-[10px]">Free Delivery</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2.5 text-center border border-purple-200">
            <RotateCcw className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-purple-600 font-['Poppins',sans-serif] font-bold text-[10px]">Easy Returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}