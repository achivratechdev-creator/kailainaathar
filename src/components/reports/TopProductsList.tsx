import React from 'react';
import { TopProduct } from '@/types';

export default function TopProductsList({ products }: { products: TopProduct[] }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm text-gray-800 mb-4 font-medium">Top Selling Products</h3>
      <div className="space-y-3">
        {products.map((product, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-800 font-medium">{product.name}</p>
              <p className="text-xs text-gray-500 font-light">{product.unitsSold} units sold</p>
            </div>
            <div className="text-right w-32">
              <p className="text-sm text-gray-800 font-medium">{product.revenue}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] rounded-full" 
                  style={{ width: `${product.popularity}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}