"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useShopStore } from "@/store";
import ProductCard from "@/components/ui/cards/shop/ProductCard";

export default function Shop () {
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const {
        fetchProducts,
        search,
        setSearch,
        setCategory,
        setSortBy,
        category,
        sortBy,
        filteredProducts,
    } = useShopStore();


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    const products = filteredProducts();

    return(
        <>
            <div className="min-h-screen bg-white pt-12 pb-16">
                <div className="max-w-[1320px] mx-auto px-6">
                    <div className="mb-8">
                        <h1 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-2xl mb-1">Siddha Essentials</h1>
                        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-sm">Premium quality authentic medicines
                            for holistic wellness</p>
                    </div>
                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative max-w-xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="luicide luicide-search absolute left-4 top-1/2 -translate-y-[50%] block w-4 h-4 text-gray-400"
                                aria-hidden
                            >
                                <path d="m21 21-4.34-4.34" />
                                <circle cx="11" cy="11" r="8" />
                            </svg>


                            <input
                                type="text"
                                placeholder="Search for herbal oils, powders, medicines..."
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg font-['Poppins',sans-serif] font-light text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {!isFilterOpen &&(
                            <div className="w-64 shrink-0">
                            <div className="bg-gray-50 rounded-lg border border-gray-200 p-5 sticky top-24">
                                <div className="flex items-center justify-between mb-5">
                                    <h3
                                        className="text-gray-900 font-['Poppins',sans-serif] font-bold text-base flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-funnel w-4 h-4 text-[#2e7d32]"
                                            aria-hidden="true">
                                            <path
                                                d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z">
                                            </path>
                                        </svg>Filters</h3><button
                                         onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="lg:hidden p-1.5 hover:bg-gray-200 rounded-md transition-all"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-x w-4 h-4" aria-hidden="true">
                                            <path d="M18 6 6 18"></path>
                                            <path d="m6 6 12 12"></path>
                                        </svg></button>
                                </div>
                                {/* Category */}
                                <div className="mb-6">
                                    <label className="block text-xs uppercase font-semibold mb-3 text-gray-700">
                                        Category
                                    </label>
                                    <div className="space-y-1.5">
                                        {[
                                            { label: "All Categories", value: "all" },
                                            { label: "Herbal Oils", value: "Herbal Oils" },
                                            { label: "Powders", value: "Powders" },
                                            { label: "Medicines", value: "Medicines" },
                                        ].map((c) => (
                                            <button
                                                key={c.value}
                                                onClick={() => setCategory(c.value as any)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${category === c.value
                                                        ? "bg-[#2e7d32] text-white font-medium"
                                                        : "bg-white text-gray-700 font-light hover:bg-gray-100"
                                                    }`}
                                            >
                                                {c.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                                {/* Sort */}
                                <div>
                                    <label className="block text-xs uppercase font-semibold mb-3 text-gray-700">
                                        Sort By
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        )}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">{products.length} products</p>
                                </div>
                            </div>
                            { (isFilterOpen) && (
                                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-['Poppins',sans-serif] font-light text-sm text-gray-700 hover:border-[#2e7d32] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel w-3.5 h-3.5" aria-hidden="true"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg>Show Filters</button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {products.map((p) => (
                                    <Link href={`/product/`+p.id}><ProductCard key={p.id} product={p} /></Link>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
                                    <div
                                        className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-bold text-[10px] flex items-center gap-1 shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-white"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg>Best Seller
                                    </div>
                                    <div className="relative h-56 overflow-hidden bg-gray-50"><img
                                            src="https://images.unsplash.com/photo-1662058595162-10e024b1a907?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJhbCUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjM5NjY5NjR8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                                            alt="Neelibringadi Kera Thailam"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                        <div
                                            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
                                            Herbal Oils</div>
                                    </div>
                                    <div className="p-4">
                                        <h3
                                            className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                            Neelibringadi Kera Thailam</h3>
                                        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
                                            Traditional
                                            hair oil for healthy hair growth</p>
                                        <div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><span
                                                className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">(4.8)</span>
                                        </div>
                                        <div className="mb-3"><span
                                                className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">₹585</span><span
                                                className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">₹450</span>
                                        </div>
                                        <div className="flex flex-col gap-2"><button
                                                className="flex items-center justify-center gap-2 bg-white border border-[#2e7d32] text-[#2e7d32] px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#2e7d32] hover:text-white transition-all"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" className="lucide lucide-shopping-cart w-3.5 h-3.5"
                                                    aria-hidden="true">
                                                    <circle cx="8" cy="21" r="1"></circle>
                                                    <circle cx="19" cy="21" r="1"></circle>
                                                    <path
                                                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                                                    </path>
                                                </svg>Add to Cart</button><button
                                                className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">Buy
                                                Now</button></div>
                                    </div>
                                </div>
                                <div
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
                                    <div className="relative h-56 overflow-hidden bg-gray-50"><img
                                            src="https://images.unsplash.com/photo-1699415513957-b39988293583?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBwb3dkZXIlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjM5NjY5NjR8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                                            alt="Triphala Choornam"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                        <div
                                            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
                                            Powders</div>
                                    </div>
                                    <div className="p-4">
                                        <h3
                                            className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                            Triphala Choornam</h3>
                                        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
                                            Triple fruit
                                            powder for digestive health</p>
                                        <div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><span
                                                className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">(4.8)</span>
                                        </div>
                                        <div className="mb-3"><span
                                                className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">₹234</span><span
                                                className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">₹180</span>
                                        </div>
                                        <div className="flex flex-col gap-2"><button
                                                className="flex items-center justify-center gap-2 bg-white border border-[#2e7d32] text-[#2e7d32] px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#2e7d32] hover:text-white transition-all"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" className="lucide lucide-shopping-cart w-3.5 h-3.5"
                                                    aria-hidden="true">
                                                    <circle cx="8" cy="21" r="1"></circle>
                                                    <circle cx="19" cy="21" r="1"></circle>
                                                    <path
                                                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                                                    </path>
                                                </svg>Add to Cart</button><button
                                                className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">Buy
                                                Now</button></div>
                                    </div>
                                </div>
                                <div
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
                                    <div className="relative h-56 overflow-hidden bg-gray-50"><img
                                            src="https://images.unsplash.com/photo-1734607402840-902613545974?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBtZWRpY2luZSUyMHRhYmxldHN8ZW58MXx8fHwxNzYzOTY2OTY0fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                                            alt="Ashwagandha Tablets"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                        <div
                                            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
                                            Medicines</div>
                                    </div>
                                    <div className="p-4">
                                        <h3
                                            className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                            Ashwagandha Tablets</h3>
                                        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
                                            Stress relief
                                            and energy booster</p>
                                        <div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><span
                                                className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">(4.8)</span>
                                        </div>
                                        <div className="mb-3"><span
                                                className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">₹416</span><span
                                                className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">₹320</span>
                                        </div>
                                        <div className="flex flex-col gap-2"><button
                                                className="flex items-center justify-center gap-2 bg-white border border-[#2e7d32] text-[#2e7d32] px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#2e7d32] hover:text-white transition-all"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" className="lucide lucide-shopping-cart w-3.5 h-3.5"
                                                    aria-hidden="true">
                                                    <circle cx="8" cy="21" r="1"></circle>
                                                    <circle cx="19" cy="21" r="1"></circle>
                                                    <path
                                                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                                                    </path>
                                                </svg>Add to Cart</button><button
                                                className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">Buy
                                                Now</button></div>
                                    </div>
                                </div>
                                <div
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
                                    <div className="relative h-56 overflow-hidden bg-gray-50"><img
                                            src="https://images.unsplash.com/photo-1709813610121-e2a51545e212?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBrYXNoYXlhbSUyMG1lZGljaW5lfGVufDF8fHx8MTc2Mzk2Njk2NHww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                                            alt="Sukku Kaapi Powder"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                        <div
                                            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
                                            Powders</div>
                                    </div>
                                    <div className="p-4">
                                        <h3
                                            className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                            Sukku Kaapi Powder</h3>
                                        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
                                            Traditional
                                            herbal coffee for immunity</p>
                                        <div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><span
                                                className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">(4.8)</span>
                                        </div>
                                        <div className="mb-3"><span
                                                className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">₹286</span><span
                                                className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">₹220</span>
                                        </div>
                                        <div className="flex flex-col gap-2"><button
                                                className="flex items-center justify-center gap-2 bg-white border border-[#2e7d32] text-[#2e7d32] px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#2e7d32] hover:text-white transition-all"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" className="lucide lucide-shopping-cart w-3.5 h-3.5"
                                                    aria-hidden="true">
                                                    <circle cx="8" cy="21" r="1"></circle>
                                                    <circle cx="19" cy="21" r="1"></circle>
                                                    <path
                                                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                                                    </path>
                                                </svg>Add to Cart</button><button
                                                className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">Buy
                                                Now</button></div>
                                    </div>
                                </div>
                                <div
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
                                    <div className="relative h-56 overflow-hidden bg-gray-50"><img
                                            src="https://images.unsplash.com/photo-1662058595162-10e024b1a907?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJhbCUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjM5NjY5NjR8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                                            alt="Kumkumadi Thailam"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                        <div
                                            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
                                            Herbal Oils</div>
                                    </div>
                                    <div className="p-4">
                                        <h3
                                            className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                            Kumkumadi Thailam</h3>
                                        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
                                            Premium face
                                            oil for glowing skin</p>
                                        <div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><span
                                                className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">(4.8)</span>
                                        </div>
                                        <div className="mb-3"><span
                                                className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">₹754</span><span
                                                className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">₹580</span>
                                        </div>
                                        <div className="flex flex-col gap-2"><button
                                                className="flex items-center justify-center gap-2 bg-white border border-[#2e7d32] text-[#2e7d32] px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#2e7d32] hover:text-white transition-all"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" className="lucide lucide-shopping-cart w-3.5 h-3.5"
                                                    aria-hidden="true">
                                                    <circle cx="8" cy="21" r="1"></circle>
                                                    <circle cx="19" cy="21" r="1"></circle>
                                                    <path
                                                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                                                    </path>
                                                </svg>Add to Cart</button><button
                                                className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">Buy
                                                Now</button></div>
                                    </div>
                                </div>
                                <div
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
                                    <div className="relative h-56 overflow-hidden bg-gray-50"><img
                                            src="https://images.unsplash.com/photo-1734607402840-902613545974?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBtZWRpY2luZSUyMHRhYmxldHN8ZW58MXx8fHwxNzYzOTY2OTY0fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                                            alt="Chyawanprash"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                        <div
                                            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
                                            Medicines</div>
                                    </div>
                                    <div className="p-4">
                                        <h3
                                            className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                            Chyawanprash</h3>
                                        <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
                                            Complete
                                            health tonic for immunity</p>
                                        <div className="flex items-center gap-1 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                aria-hidden="true">
                                                <path
                                                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                </path>
                                            </svg><span
                                                className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">(4.8)</span>
                                        </div>
                                        <div className="mb-3"><span
                                                className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">₹494</span><span
                                                className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">₹380</span>
                                        </div>
                                        <div className="flex flex-col gap-2"><button
                                                className="flex items-center justify-center gap-2 bg-white border border-[#2e7d32] text-[#2e7d32] px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#2e7d32] hover:text-white transition-all"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" className="lucide lucide-shopping-cart w-3.5 h-3.5"
                                                    aria-hidden="true">
                                                    <circle cx="8" cy="21" r="1"></circle>
                                                    <circle cx="19" cy="21" r="1"></circle>
                                                    <path
                                                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                                                    </path>
                                                </svg>Add to Cart</button><button
                                                className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">Buy
                                                Now</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>    
    );
}