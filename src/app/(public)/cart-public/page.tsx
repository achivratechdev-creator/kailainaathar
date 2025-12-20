"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation"
import Link from 'next/link';
import { 
  ArrowLeft, Minus, Plus, Trash2, Shield, Truck, ShoppingCart, AlertTriangle, Bug 
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

// --- MOCK PRODUCT DATABASE ---
const ALL_PRODUCTS = [
  {
    id: 1,
    name: 'Neelibringadi Kera Thailam',
    category: 'Herbal Oils',
    price: 450,
    originalPrice: 585,
    image: '/images/kum-kumadi.jpg' 
  },
  {
    id: 2,
    name: 'Sukku Kaapi Powder',
    category: 'Powders',
    price: 220,
    originalPrice: 286,
    image: '/api/placeholder/100/100'
  },
  {
    id: 3,
    name: 'Triphala Choornam',
    category: 'Powders',
    price: 180,
    originalPrice: 234,
    image: '/api/placeholder/100/100'
  },
  {
    id: 4,
    name: 'Kumkumadi Thailam',
    category: 'Herbal Oils',
    price: 580,
    originalPrice: 754,
    image: '/api/placeholder/100/100'
  },
  {
    id: 5,
    name: 'Chyawanprash',
    category: 'Medicines',
    price: 380,
    originalPrice: 494,
    image: '/api/placeholder/100/100'
  }
];



// --- CART PAGE COMPONENT ---
export default function CartPage() {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
    const router = useRouter()

  // Manual hydration fix for Zustand persist
  useEffect(() => {
    useCartStore.persist.rehydrate();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Robust mapping that keeps "Unknown" items visible instead of deleting them
  const cartProducts = items.map(cartItem => {
    // Loose equality (==) to catch string '1' vs number 1 issues
    const product = ALL_PRODUCTS.find(p => p.id == cartItem.id);
    
    if (!product) {
      return {
        id: cartItem.id,
        name: `Unknown Product (ID: ${cartItem.id})`,
        category: 'Unknown',
        price: 0,
        originalPrice: 0,
        image: '/api/placeholder/100/100',
        quantity: cartItem.quantity,
        isUnknown: true
      };
    }
    return { ...product, quantity: cartItem.quantity, isUnknown: false };
  });

  const subtotal = cartProducts.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const total = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = subtotal - total;

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
       <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Arima:wght@400;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
      `}</style>

      

      <main className="pt-12 pb-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] font-medium text-sm transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Store
              </button>
              <h1 className="text-gray-900 font-bold text-2xl">Shopping Cart</h1>
            </div>
            {items.length > 0 && (
              <button onClick={clearCart} className="text-red-500 text-sm hover:underline flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Clear Cart
              </button>
            )}
          </div>

          {cartProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <button onClick={() => { router.push("/products") }} className="px-6 py-3 bg-[#2e7d32] text-white rounded-lg font-medium hover:bg-[#256629] transition-all">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* LEFT: Cart Items List */}
              <div className="lg:col-span-2 space-y-3">
                {cartProducts.map((item) => (
                  <div key={item.id} className={`bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-all ${item.isUnknown ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h3 className={`font-medium text-sm ${item.isUnknown ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.name}
                          </h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-all p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-gray-500 font-light text-xs mb-3">{item.category}</p>
                        
                        {item.isUnknown && (
                          <div className="text-xs text-red-500 mb-2 flex items-center gap-1 bg-red-50 p-2 rounded">
                            <AlertTriangle className="w-3 h-3" />
                            <strong>Data Error:</strong> Product ID <strong>{item.id}</strong> not found in database.
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button 
                              onClick={() => addItem(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-200 disabled:opacity-50"
                            >
                              <Minus className="w-3.5 h-3.5 text-gray-700" />
                            </button>
                            <span className="font-medium text-sm w-6 text-center text-gray-800">{item.quantity}</span>
                            <button 
                              onClick={() => addItem(item.id, 1)}
                              className="w-7 h-7 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-200"
                            >
                              <Plus className="w-3.5 h-3.5 text-gray-700" />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <div className="text-gray-400 text-xs line-through">₹{item.originalPrice * item.quantity}</div>
                            <div className="text-[#2e7d32] font-bold text-lg">₹{item.price * item.quantity}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-5 sticky top-24">
                  <h2 className="text-gray-900 font-bold text-base mb-5">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span className="font-light">Subtotal</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-green-600 text-sm">
                      <span className="font-light">Savings</span>
                      <span className="font-medium">-₹{savings}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span className="font-light">Shipping</span>
                      <span className="font-medium text-[#2e7d32]">FREE</span>
                    </div>
                    
                    <div className="border-t border-gray-300 pt-3 flex justify-between items-end">
                      <span className="text-gray-900 font-bold text-base">Total</span>
                      <span className="text-[#2e7d32] font-bold text-xl">₹{total}</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#2e7d32] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#256629] transition-all mb-5 hover:shadow-lg active:scale-95">
                    Proceed to Checkout
                  </button>

                  <div className="space-y-2.5 pt-5 border-t border-gray-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                        <Shield className="w-4 h-4 text-[#2e7d32]" />
                      </div>
                      <span className="text-gray-700 font-light text-xs">Safe & Secure Payments</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                        <Truck className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-light text-xs">Free Delivery on All Orders</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          
          
        </div>
      </main>

      
    </div>
  );
}