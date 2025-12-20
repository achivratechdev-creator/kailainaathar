"use client";

import { useEffect, useState, useMemo } from "react"
import { ShoppingCart, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useCartStore, useProductStore } from "@/store"
import ReviewCard from "@/components/ui/cards/product/ReviewCard"
import { Review, RelatedProduct } from "@/types/product";

const INITIAL_COUNT = 5

export default function ProductPage () {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  
    const { product, loading, fetchProductById } = useProductStore()
  const { addToCart } = useCartStore()
    
      const [qty, setQty] = useState(1)
      const rating = product?.rating ?? 4.8;
    const stars = Math.round(rating);
    const savePercent =
  product?.mrp > 0 && product?.price < product?.mrp
    ? Math.round(((product?.mrp - product?.price) / product?.mrp) * 100)
    : 0

    const ratingBreakdown = [
        { stars: 5, count: Math.round(product?.reviews * 0.76) },
        { stars: 4, count: Math.round(product?.reviews * 0.18) },
        { stars: 3, count: Math.round(product?.reviews * 0.04) },
        { stars: 2, count: Math.round(product?.reviews * 0.01) },
        { stars: 1, count: Math.round(product?.reviews * 0.01) },
    ]

     const [expanded, setExpanded] = useState(false)

    const relatedProducts = product?.relatedProducts ?? []
    const reviews = product?.reviewList ?? []

    const visibleReviews = useMemo(() => {
        if (expanded) return reviews
        return reviews.slice(0, INITIAL_COUNT)
    }, [expanded, reviews])


  useEffect(() => {
    fetchProductById(id)
  }, [id, fetchProductById])

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-poppins text-gray-500">Loading product…</p>
      </div>
    )
  }

    return(
        <>
        <div className="min-h-screen bg-white pt-12 pb-16">
            <div className="max-w-[1320px] mx-auto px-6"><button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] font-['Poppins',sans-serif] font-medium text-sm mb-6 transition-colors group"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        className="lucide lucide-arrow-left w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        aria-hidden="true">
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>Back to Store</button>
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="relative">
                            <div className="sticky top-24">
                                <div
                                    className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                                    <img src={product?.image}
                                        alt={product?.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                                </div>
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    <div
                                        className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full font-['Poppins',sans-serif] font-bold text-xs flex items-center gap-1.5 shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-white"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg>Premium</div>
                                    <div
                                        className="bg-white/95 backdrop-blur-sm text-[#2e7d32] px-3 py-1.5 rounded-full font-['Poppins',sans-serif] font-medium text-xs shadow-md">
                                        {product?.categoryLabel}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-3 max-w-md mx-auto">
                                    <div className="bg-green-50 rounded-lg p-2.5 text-center border border-green-200"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-shield w-5 h-5 text-[#2e7d32] mx-auto mb-1" aria-hidden="true">
                                            <path
                                                d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                                            </path>
                                        </svg>
                                        <p className="text-[#2e7d32] font-['Poppins',sans-serif] font-bold text-[10px]">100%
                                            Authentic</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-2.5 text-center border border-blue-200"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-truck w-5 h-5 text-blue-600 mx-auto mb-1" aria-hidden="true">
                                            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                                            <path d="M15 18H9"></path>
                                            <path
                                                d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14">
                                            </path>
                                            <circle cx="17" cy="18" r="2"></circle>
                                            <circle cx="7" cy="18" r="2"></circle>
                                        </svg>
                                        <p className="text-blue-600 font-['Poppins',sans-serif] font-bold text-[10px]">Free Delivery
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-2.5 text-center border border-purple-200"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-rotate-ccw w-5 h-5 text-purple-600 mx-auto mb-1"
                                            aria-hidden="true">
                                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                            <path d="M3 3v5h5"></path>
                                        </svg>
                                        <p className="text-purple-600 font-['Poppins',sans-serif] font-bold text-[10px]">Easy
                                            Returns</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        className="lucide lucide-award w-4 h-4 text-amber-500" aria-hidden="true">
                                        <path
                                            d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526">
                                        </path>
                                        <circle cx="12" cy="8" r="6"></circle>
                                    </svg><span
                                        className="text-amber-700 font-['Poppins',sans-serif] font-medium text-xs bg-amber-50 px-2.5 py-1 rounded-full">Featured
                                        Product</span></div>
                                <h1 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-2xl mb-2.5 leading-tight">
                                    {product?.name}</h1>
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < stars ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div><span
                                        className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">({rating})</span><span
                                        className="text-gray-300">•</span><span
                                        className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">{product?.reviews}+ reviews</span>
                                </div>
                                {/* <div className="flex items-center gap-2.5 mb-4">
                                    <div className="flex items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="24"
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
                                        </svg></div><span
                                        className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">({rating})</span><span
                                        className="text-gray-300">•</span><span
                                        className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">{product?.reviews}+ reviews</span>
                                </div> */}
                            </div>
                            <div className="mb-5 p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-baseline gap-3 mb-1.5"><span
                                        className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-3xl">₹{product?.price}</span><span
                                        className="text-gray-400 font-['Poppins',sans-serif] text-base line-through">₹{product?.mrp}</span><span
                                        className="bg-red-500 text-white px-2 py-0.5 rounded-full font-['Poppins',sans-serif] font-bold text-xs">Save
                                        {savePercent}%</span></div>
                                <p className="text-green-700 font-['Poppins',sans-serif] font-light text-xs">Inclusive of all taxes
                                    • Free shipping on orders above ₹500</p>
                            </div>
                            <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm mb-4 leading-relaxed">
                                {product?.description}</p>
                            <div
                                className="bg-gradient-to-r from-[#2e7d32]/5 to-[#66bb6a]/5 border border-[#2e7d32]/20 rounded-lg p-4 mb-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex gap-2">
                                        <div
                                            className="w-10 h-10 bg-[#2e7d32] rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" className="lucide lucide-phone w-5 h-5 text-white"
                                                aria-hidden="true">
                                                <path
                                                    d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384">
                                                </path>
                                            </svg></div>
                                        <div
                                            className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" className="lucide lucide-message-circle w-5 h-5 text-white"
                                                aria-hidden="true">
                                                <path
                                                    d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719">
                                                </path>
                                            </svg></div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1">Need
                                            Help? Contact Us</h4>
                                        <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-xs mb-2">Call or
                                            WhatsApp to know more about this product</p><a href="tel:+919876543210"
                                            className="text-[#2e7d32] font-['Poppins',sans-serif] font-bold text-base hover:underline">+91
                                            98765 43210</a>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5"><label
                                    className="block text-gray-700 font-['Poppins',sans-serif] font-semibold mb-2 text-xs uppercase tracking-wide">Quantity</label>
                                <div className="flex items-center gap-3"><button
                                        onClick={() => setQty(Math.max(1, qty - 1))} 
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-['Poppins',sans-serif] font-medium text-base transition-all active:scale-95">-</button><span
                                        className="font-['Poppins',sans-serif] font-bold text-lg w-12 text-center">{qty}</span><button
                                        onClick={() => setQty(qty + 1)} 
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-['Poppins',sans-serif] font-medium text-base transition-all active:scale-95">+</button>
                                </div>
                            </div>
                            <div className="flex gap-3 mb-6"><button
                                    onClick={() => addToCart(product, qty)}
                                    className="flex-1 bg-white border-2 border-[#2e7d32] text-[#2e7d32] py-2.5 rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:bg-green-50 transition-all active:scale-95 flex items-center justify-center gap-2"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-shopping-cart w-4 h-4" aria-hidden="true">
                                        <circle cx="8" cy="21" r="1"></circle>
                                        <circle cx="19" cy="21" r="1"></circle>
                                        <path
                                            d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12">
                                        </path>
                                    </svg>Add to Cart</button><button
                                    onClick={() => {
                                    addToCart(product, qty)
                                    router.push("/cart")
                                    }}
                                    className="flex-1 bg-[#2e7d32] text-white py-2.5 rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:bg-[#256629] transition-all active:scale-95">Buy
                                    Now</button></div>
                            <div className="border-t border-gray-200 pt-5">
                                <div className="mb-6">
                                    <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold mb-4">Benefits</h3>
                                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                        <ul className="space-y-3">
                                            {product?.benefits.map((b) => (
                                            <li
                                                className="flex items-start gap-3 text-gray-700 font-['Poppins',sans-serif] text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-check w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5"
                                                    aria-hidden="true">
                                                    <path d="M20 6 9 17l-5-5"></path>
                                                </svg><span className="font-light leading-relaxed">{b}</span>
                                            </li>
                                            ))}
                                            {/* <li
                                                className="flex items-start gap-3 text-gray-700 font-['Poppins',sans-serif] text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-check w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5"
                                                    aria-hidden="true">
                                                    <path d="M20 6 9 17l-5-5"></path>
                                                </svg><span className="font-light leading-relaxed">Improves hair texture</span></li>
                                            <li
                                                className="flex items-start gap-3 text-gray-700 font-['Poppins',sans-serif] text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-check w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5"
                                                    aria-hidden="true">
                                                    <path d="M20 6 9 17l-5-5"></path>
                                                </svg><span className="font-light leading-relaxed">Reduces dandruff</span></li>
                                            <li
                                                className="flex items-start gap-3 text-gray-700 font-['Poppins',sans-serif] text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-check w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5"
                                                    aria-hidden="true">
                                                    <path d="M20 6 9 17l-5-5"></path>
                                                </svg><span className="font-light leading-relaxed">Cooling effect on head</span>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold mb-4">Ingredients</h3>
                                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                        <div className="flex flex-wrap gap-2">
                                            {product?.ingredients.map((i) => (
                                            <div
                                                key={i}
                                                className="bg-white border border-green-200 text-[#2e7d32] px-4 py-2 rounded-full font-['Poppins',sans-serif] font-medium text-sm shadow-sm">
                                                {i}</div>
                                                ))}
                                            {/* <div
                                                className="bg-white border border-green-200 text-[#2e7d32] px-4 py-2 rounded-full font-['Poppins',sans-serif] font-medium text-sm shadow-sm">
                                                Bhringaraj (Eclipta alba)</div>
                                            <div
                                                className="bg-white border border-green-200 text-[#2e7d32] px-4 py-2 rounded-full font-['Poppins',sans-serif] font-medium text-sm shadow-sm">
                                                Coconut Oil</div>
                                            <div
                                                className="bg-white border border-green-200 text-[#2e7d32] px-4 py-2 rounded-full font-['Poppins',sans-serif] font-medium text-sm shadow-sm">
                                                Amla (Phyllanthus emblica)</div>
                                            <div
                                                className="bg-white border border-green-200 text-[#2e7d32] px-4 py-2 rounded-full font-['Poppins',sans-serif] font-medium text-sm shadow-sm">
                                                Curry Leaves</div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-xl mb-5">Why Buy From Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-refresh-ccw w-6 h-6 text-purple-600"
                                        aria-hidden="true">
                                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                        <path d="M3 3v5h5"></path>
                                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                                        <path d="M16 16h5v5"></path>
                                    </svg></div>
                                <div className="flex-1">
                                    <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1.5">Easy
                                        Returns &amp; Refunds</h3>
                                    <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-xs leading-relaxed">
                                        7-day return policy. Full refund if product doesn't meet quality standards.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-credit-card w-6 h-6 text-blue-600"
                                        aria-hidden="true">
                                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                                        <line x1="2" x2="22" y1="10" y2="10"></line>
                                    </svg></div>
                                <div className="flex-1">
                                    <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1.5">100%
                                        Secure Payment</h3>
                                    <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-xs leading-relaxed">SSL
                                        encrypted checkout. Your payment information is completely safe.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-package w-6 h-6 text-green-600"
                                        aria-hidden="true">
                                        <path
                                            d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z">
                                        </path>
                                        <path d="M12 22V12"></path>
                                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                                        <path d="m7.5 4.27 9 5.15"></path>
                                    </svg></div>
                                <div className="flex-1">
                                    <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1.5">Fast
                                        &amp; Safe Delivery</h3>
                                    <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-xs leading-relaxed">Free
                                        delivery on orders above ₹500. Delivered in 3-5 business days.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-headphones w-6 h-6 text-orange-600"
                                        aria-hidden="true">
                                        <path
                                            d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3">
                                        </path>
                                    </svg></div>
                                <div className="flex-1">
                                    <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1.5">24/7
                                        Customer Support</h3>
                                    <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-xs leading-relaxed">
                                        Dedicated support team available via call, WhatsApp, or email anytime.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-badge-check w-6 h-6 text-amber-600"
                                        aria-hidden="true">
                                        <path
                                            d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z">
                                        </path>
                                        <path d="m9 12 2 2 4-4"></path>
                                    </svg></div>
                                <div className="flex-1">
                                    <h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1.5">Quality
                                        Guarantee</h3>
                                    <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-xs leading-relaxed">100%
                                        authentic Siddha products. Lab-tested and quality certified.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-xl mb-5">Customer Reviews &amp; Ratings
                    </h2>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Average Rating */}
                            <div className="flex flex-col items-center justify-center text-center md:border-r border-amber-200 md:pr-6">
                            <div className="text-5xl font-bold text-gray-900 font-poppins mb-2">
                                {product?.rating.toFixed(1)}
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`w-5 h-5 ${
                                    i < Math.round(product?.rating)
                                        ? "fill-amber-400 text-amber-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                                >
                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                </svg>
                                ))}
                            </div>

                            <p className="text-gray-600 font-poppins font-light text-sm">
                                Based on {product?.reviews} reviews
                            </p>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-2">
                            {ratingBreakdown.map((row) => {
                                const percent = Math.round((row.count / product?.reviews) * 100)

                                return (
                                <div key={row.stars} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16">
                                    <span className="font-poppins font-medium text-sm text-gray-700">
                                        {row.stars}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                    >
                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a.53.53 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a.53.53 0 0 0 1.597-1.16z" />
                                    </svg>
                                    </div>

                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                                        style={{ width: `${percent}%` }}
                                    />
                                    </div>

                                    <span className="font-poppins font-light text-xs text-gray-600 w-12 text-right">
                                    {row.count}
                                    </span>
                                </div>
                                )
                            })}
                            </div>

                        </div>
                    </div>

                    {/* <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col items-center justify-center text-center border-r border-amber-200 pr-6">
                                <div className="text-5xl font-bold text-gray-900 font-['Poppins',sans-serif] mb-2">4.8</div>
                                <div className="flex items-center gap-1 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        className="lucide lucide-star w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-5 h-5 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-5 h-5 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-5 h-5 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-5 h-5 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg></div>
                                <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">Based on 250 reviews</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16"><span
                                            className="font-['Poppins',sans-serif] font-medium text-sm text-gray-700">5</span><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg></div>
                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                                            style={{ width: "76%"}}></div>
                                    </div><span
                                        className="font-['Poppins',sans-serif] font-light text-xs text-gray-600 w-12 text-right">190</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16"><span
                                            className="font-['Poppins',sans-serif] font-medium text-sm text-gray-700">4</span><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg></div>
                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                                            style={{ width: "18%"}}></div>
                                    </div><span
                                        className="font-['Poppins',sans-serif] font-light text-xs text-gray-600 w-12 text-right">45</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16"><span
                                            className="font-['Poppins',sans-serif] font-medium text-sm text-gray-700">3</span><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg></div>
                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                                            style={{ width: "4%"}}></div>
                                    </div><span
                                        className="font-['Poppins',sans-serif] font-light text-xs text-gray-600 w-12 text-right">10</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16"><span
                                            className="font-['Poppins',sans-serif] font-medium text-sm text-gray-700">2</span><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg></div>
                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                                            style={{ width: "1%"}}></div>
                                    </div><span
                                        className="font-['Poppins',sans-serif] font-light text-xs text-gray-600 w-12 text-right">3</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16"><span
                                            className="font-['Poppins',sans-serif] font-medium text-sm text-gray-700">1</span><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg></div>
                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                                            style={{ width: "1%"}}></div>
                                    </div><span
                                        className="font-['Poppins',sans-serif] font-light text-xs text-gray-600 w-12 text-right">2</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="space-y-4">
                        {visibleReviews.map((review: Review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-['Poppins',sans-serif] font-semibold text-lg">P</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm">Priya
                                                Sharma</h4>
                                            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-badge-check w-3 h-3 text-green-600" aria-hidden="true">
                                                    <path
                                                        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z">
                                                    </path>
                                                    <path d="m9 12 2 2 4-4"></path>
                                                </svg><span
                                                    className="text-green-700 font-['Poppins',sans-serif] font-medium text-[10px]">Verified
                                                    Purchase</span></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg></div><span
                                                className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs">2 weeks
                                                ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 font-['Poppins',sans-serif] font-light text-sm leading-relaxed mb-4">
                                Absolutely wonderful product! I've been using this for 3 months now and the results are amazing.
                                My joint pain has reduced significantly and I feel much more energetic. Highly recommend to
                                anyone looking for natural remedies.</p>
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        className="lucide lucide-image w-4 h-4 text-gray-600" aria-hidden="true">
                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                        <circle cx="9" cy="9" r="2"></circle>
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                    </svg><span className="text-gray-700 font-['Poppins',sans-serif] font-medium text-xs">Customer
                                        Media</span></div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    <div
                                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105 transition-transform group">
                                        <img src="https://images.unsplash.com/photo-1603790090292-ef562ccac38e?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMGJvdHRsZXN8ZW58MXx8fHwxNzY0NTkwMTc4fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;utm_source=figma&amp;utm_medium=referral"
                                            alt="Review from Priya Sharma" className="w-full h-full object-cover"/>
                                        <div
                                            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-image w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-hidden="true">
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                                <circle cx="9" cy="9" r="2"></circle>
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                            </svg></div>
                                    </div>
                                    <div
                                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105 transition-transform group">
                                        <img src="https://images.unsplash.com/photo-1758525732480-8df43412b54c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0NTkwMTc3fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;utm_source=figma&amp;utm_medium=referral"
                                            alt="Review from Priya Sharma" className="w-full h-full object-cover"/>
                                        <div
                                            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-image w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-hidden="true">
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                                <circle cx="9" cy="9" r="2"></circle>
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                            </svg></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pt-3 border-t border-gray-200"><button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-thumbs-up w-4 h-4" aria-hidden="true">
                                        <path d="M7 10v12"></path>
                                        <path
                                            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z">
                                        </path>
                                    </svg><span className="font-['Poppins',sans-serif] font-medium text-xs">Helpful
                                        (42)</span></button></div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-['Poppins',sans-serif] font-semibold text-lg">R</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm">Rajesh
                                                Kumar</h4>
                                            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-badge-check w-3 h-3 text-green-600" aria-hidden="true">
                                                    <path
                                                        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z">
                                                    </path>
                                                    <path d="m9 12 2 2 4-4"></path>
                                                </svg><span
                                                    className="text-green-700 font-['Poppins',sans-serif] font-medium text-[10px]">Verified
                                                    Purchase</span></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg></div><span
                                                className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs">1 month
                                                ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 font-['Poppins',sans-serif] font-light text-sm leading-relaxed mb-4">Best
                                Siddha medicine I have ever tried. The quality is top-notch and packaging is excellent. Delivery
                                was quick and the product was well sealed. Will definitely order again!</p>
                            <div className="flex items-center gap-4 pt-3 border-t border-gray-200"><button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-thumbs-up w-4 h-4" aria-hidden="true">
                                        <path d="M7 10v12"></path>
                                        <path
                                            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z">
                                        </path>
                                    </svg><span className="font-['Poppins',sans-serif] font-medium text-xs">Helpful
                                        (28)</span></button></div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-['Poppins',sans-serif] font-semibold text-lg">A</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm">Anita
                                                Desai</h4>
                                            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-badge-check w-3 h-3 text-green-600" aria-hidden="true">
                                                    <path
                                                        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z">
                                                    </path>
                                                    <path d="m9 12 2 2 4-4"></path>
                                                </svg><span
                                                    className="text-green-700 font-['Poppins',sans-serif] font-medium text-[10px]">Verified
                                                    Purchase</span></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-gray-200 text-gray-200"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg></div><span
                                                className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs">3 weeks
                                                ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 font-['Poppins',sans-serif] font-light text-sm leading-relaxed mb-4">Very
                                effective product?. I noticed improvements within the first week itself. The taste is a bit
                                strong but that's expected with natural herbs. Overall satisfied with the purchase.</p>
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        className="lucide lucide-image w-4 h-4 text-gray-600" aria-hidden="true">
                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                        <circle cx="9" cy="9" r="2"></circle>
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                    </svg><span className="text-gray-700 font-['Poppins',sans-serif] font-medium text-xs">Customer
                                        Media</span></div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    <div
                                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105 transition-transform group">
                                        <img src="https://images.unsplash.com/photo-1626174630035-4d9f9f29d663?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwd2VsbG5lc3MlMjBoYXBweXxlbnwxfHx8fDE3NjQ1OTAxNzh8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;utm_source=figma&amp;utm_medium=referral"
                                            alt="Review from Anita Desai" className="w-full h-full object-cover"/>
                                        <div
                                            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-image w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-hidden="true">
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                                <circle cx="9" cy="9" r="2"></circle>
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                            </svg></div>
                                    </div>
                                    <div
                                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-200 cursor-pointer hover:scale-105 transition-transform group">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-play w-6 h-6 text-gray-900 ml-0.5" aria-hidden="true">
                                                    <path
                                                        d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z">
                                                    </path>
                                                </svg></div>
                                        </div>
                                        <div
                                            className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded font-['Poppins',sans-serif] font-bold text-[10px]">
                                            VIDEO</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pt-3 border-t border-gray-200"><button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-thumbs-up w-4 h-4" aria-hidden="true">
                                        <path d="M7 10v12"></path>
                                        <path
                                            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z">
                                        </path>
                                    </svg><span className="font-['Poppins',sans-serif] font-medium text-xs">Helpful
                                        (35)</span></button></div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-['Poppins',sans-serif] font-semibold text-lg">S</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm">Suresh
                                                Menon</h4>
                                            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-badge-check w-3 h-3 text-green-600" aria-hidden="true">
                                                    <path
                                                        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z">
                                                    </path>
                                                    <path d="m9 12 2 2 4-4"></path>
                                                </svg><span
                                                    className="text-green-700 font-['Poppins',sans-serif] font-medium text-[10px]">Verified
                                                    Purchase</span></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg></div><span
                                                className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs">5 days
                                                ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 font-['Poppins',sans-serif] font-light text-sm leading-relaxed mb-4">
                                Excellent product! My family has been using Siddha medicines for years and this is by far one of
                                the best. The customer service is also very responsive and helpful.</p>
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        className="lucide lucide-image w-4 h-4 text-gray-600" aria-hidden="true">
                                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                        <circle cx="9" cy="9" r="2"></circle>
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                    </svg><span className="text-gray-700 font-['Poppins',sans-serif] font-medium text-xs">Customer
                                        Media</span></div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    <div
                                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105 transition-transform group">
                                        <img src="https://images.unsplash.com/photo-1758525224146-3bc255c80542?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwc2VsZmllfGVufDF8fHx8MTc2NDU5MDE3N3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;utm_source=figma&amp;utm_medium=referral"
                                            alt="Review from Suresh Menon" className="w-full h-full object-cover"/>
                                        <div
                                            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-image w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-hidden="true">
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                                <circle cx="9" cy="9" r="2"></circle>
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                            </svg></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pt-3 border-t border-gray-200"><button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-thumbs-up w-4 h-4" aria-hidden="true">
                                        <path d="M7 10v12"></path>
                                        <path
                                            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z">
                                        </path>
                                    </svg><span className="font-['Poppins',sans-serif] font-medium text-xs">Helpful
                                        (15)</span></button></div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-['Poppins',sans-serif] font-semibold text-lg">L</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm">Lakshmi
                                                Iyer</h4>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    className="lucide lucide-star w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                                    </path>
                                                </svg></div><span
                                                className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs">1 week
                                                ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 font-['Poppins',sans-serif] font-light text-sm leading-relaxed mb-4">Great
                                value for money. The product works well and I can feel the difference in my overall health.
                                Packaging could be improved but the product quality is excellent.</p>
                            <div className="flex items-center gap-4 pt-3 border-t border-gray-200"><button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-thumbs-up w-4 h-4" aria-hidden="true">
                                        <path d="M7 10v12"></path>
                                        <path
                                            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z">
                                        </path>
                                    </svg><span className="font-['Poppins',sans-serif] font-medium text-xs">Helpful
                                        (20)</span></button></div>
                        </div>
                    </div>
                    <div className="mt-6 text-center"><button
                            className="px-6 py-3 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:shadow-lg transition-all">View 
                            All {product?.reviews} Reviews</button></div>
                    {reviews.length > INITIAL_COUNT && (
                    <div className="mt-6 text-center"><button
                             onClick={() => setExpanded((p) => !p)}
                            className="px-6 py-3 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:shadow-lg transition-all">{expanded
                            ? "Show Less Reviews"
                            : `View All ${reviews.length} Reviews`}</button></div>
                    )}
                </div>
                <div>
                    <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-xl mb-5">You May Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {relatedProducts.map((p) => (
                            <div
                                key={p.id}
                                onClick={() => router.push(`/product/${p.id}`)}
                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#2e7d32]/40">
                                <div className="relative h-48 overflow-hidden bg-gray-50"><img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                </div>
                                <div className="p-4">
                                    <h3
                                        className="text-gray-900 font-['Poppins',sans-serif] font-medium text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                        {p.name}</h3>
                                    <div className="flex items-center gap-0.5 mb-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < Math.round(p?.rating ?? 4.8) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                            aria-hidden="true">
                                            <path
                                                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                            </path>
                                        </svg> */}
                                        
                                        </div>
                                    <div className="flex items-center justify-between mb-3"><span
                                            className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-lg">₹{p.price}</span><span
                                            className="text-gray-400 font-['Poppins',sans-serif] text-xs line-through">₹{p.mrp}</span></div>
                                    <button
                                         onClick={() => router.push(`/product/${p.id}`)}
                                        className="w-full bg-[#2e7d32] text-white py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">View
                                        Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div>
                    <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-xl mb-5">You May Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <div
                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#2e7d32]/40">
                            <div className="relative h-48 overflow-hidden bg-gray-50"><img
                                    src="https://images.unsplash.com/photo-1662058595162-10e024b1a907?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJhbCUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjM5NjY5NjR8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                                    alt="Kumkumadi Thailam"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <div className="p-4">
                                <h3
                                    className="text-gray-900 font-['Poppins',sans-serif] font-medium text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                                    Kumkumadi Thailam</h3>
                                <div className="flex items-center gap-0.5 mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" className="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400"
                                        aria-hidden="true">
                                        <path
                                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                                        </path>
                                    </svg></div>
                                <div className="flex items-center justify-between mb-3"><span
                                        className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-lg">₹580</span><span
                                        className="text-gray-400 font-['Poppins',sans-serif] text-xs line-through">₹754</span></div>
                                <button
                                    className="w-full bg-[#2e7d32] text-white py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">View
                                    Details</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        </>
    );
}