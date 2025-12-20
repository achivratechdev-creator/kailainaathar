"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Award, X, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import Toast from '@/components/ui/Toast';
import { SHOP_PRODUCTS } from '@/data/shopData';
import { ShopProduct } from '@/types/shop';

export default function ShopPage() {
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured'); 
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  // --- FILTER & SORT LOGIC ---
  const filteredProducts = useMemo(() => {
    // 1. First, Filter by Search & Category
    let result = SHOP_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // 2. Then, Sort based on selection
    // Create a copy of the array using [...result] before sorting to avoid mutating the original
    const sortedResult = [...result]; 
    
    if (sortBy === 'low-to-high') {
      sortedResult.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
      sortedResult.sort((a, b) => b.price - a.price);
    }
    // 'featured' does nothing (uses default order from data file)

    return sortedResult;
  }, [searchTerm, selectedCategory, sortBy]);

  // --- HANDLERS ---
  const handleAddToCart = (product: ShopProduct) => {
    const isAlreadyInCart = cartItems.includes(product.id);
    
    if (isAlreadyInCart) {
      // Remove from cart
      setCartItems(prev => prev.filter(id => id !== product.id));
      setToast({ show: true, message: 'Removed from cart' });
    } else {
      // Add to cart
      setCartItems(prev => [...prev, product.id]);
      setToast({ show: true, message: 'Successfully added to cart' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Font Imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Arima:wght@400;500;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="min-h-screen bg-white pt-12 pb-16">
        <div className="max-w-[1320px] mx-auto px-6">
          
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-2xl mb-1">Siddha Essentials</h1>
            <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-sm">Premium quality authentic medicines for holistic wellness</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search for herbal oils, powders, medicines..." 
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg font-['Poppins',sans-serif] font-light text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Main Layout: Sidebar + Grid */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-5 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-base flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#2e7d32]" />
                    Filters
                  </h3>
                  {/* Mobile Close Button (Hidden on Desktop) */}
                  <button className="lg:hidden p-1.5 hover:bg-gray-200 rounded-md transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-['Poppins',sans-serif] font-semibold mb-3 text-xs uppercase tracking-wide">Category</label>
                  <div className="space-y-1.5">
                    {['All Categories', 'Herbal Oils', 'Powders', 'Medicines'].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-['Poppins',sans-serif] text-sm transition-all ${
                          selectedCategory === cat 
                            ? 'bg-[#2e7d32] text-white font-medium' 
                            : 'bg-white text-gray-700 font-light hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By Dropdown */}
                <div>
                  <label className="block text-gray-700 font-['Poppins',sans-serif] font-semibold mb-3 text-xs uppercase tracking-wide">
                    Sort By
                  </label>
                  <div className="relative">
                    <div className="relative w-full">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none px-3 py-2 bg-white border border-gray-300 rounded-lg font-['Poppins',sans-serif] font-light text-sm text-gray-700 cursor-pointer focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all hover:border-gray-400"
                      >
                        <option value="featured">Featured</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                      </select>
                      {/* Chevron Icon */}
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Quality Badge */}
                <div className="mt-6 p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span className="font-['Poppins',sans-serif] font-bold text-amber-900 text-xs">Premium Quality</span>
                  </div>
                  <p className="text-amber-800 font-['Poppins',sans-serif] font-light text-xs leading-relaxed">100% authentic tested products</p>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">
                    {filteredProducts.length} products
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isInCart={cartItems.includes(product.id)}
                    onToggleCart={handleAddToCart}
                  />
                ))}
                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500 font-['Poppins',sans-serif]">
                    No products found matching your criteria.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Toast 
        isVisible={toast.show} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      
     
    </div>
  );
}