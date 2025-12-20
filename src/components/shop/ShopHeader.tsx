import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function ShopHeader({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
      <div className="max-w-[1320px] mx-auto flex justify-between items-center">
        {/* <div className="font-bold text-xl text-green-800">Siddha Clinic</div> */}
        <div className="relative p-2 bg-gray-100 rounded-full">
          <ShoppingBag className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}