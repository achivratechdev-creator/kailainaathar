import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function RelatedProducts() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
      <h2 className="text-gray-900 font-['Arima',sans-serif] font-bold text-2xl mb-6">You May Also Like</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-60 w-full bg-gray-50 overflow-hidden">
              <img 
                src="/api/placeholder/400/400" 
                alt="Kumkumadi Thailam" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Product Details */}
            <div className="p-4 flex flex-col gap-2">
              {/* Title in Green */}
              <h3 className="text-[#0D5F4D] font-['Poppins',sans-serif] font-medium text-lg truncate">
                Kumkumadi Thailam
              </h3>
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1">
                 {[1,2,3,4,5].map(star => (
                   <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                 ))}
              </div>

              {/* Price Row */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-[#2e7d32] font-bold font-['Poppins',sans-serif] text-xl">₹580</span>
                <span className="text-gray-400 font-['Poppins',sans-serif] text-sm line-through decoration-1">₹754</span>
              </div>

              {/* Button - Green Filled */}
              <Link 
                href="/product-detail" 
                className="w-full bg-[#2E7D32] hover:bg-[#256629] text-white font-['Poppins',sans-serif] text-sm py-3 font-medium text-center block rounded-lg mt-3 transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}