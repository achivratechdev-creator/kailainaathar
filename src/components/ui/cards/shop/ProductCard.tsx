// components/ProductCard.tsx
import { Product } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
    const rating = product.rating ?? 4.8;
    const stars = Math.round(rating);

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#2e7d32]/40 relative cursor-pointer">
            {product.badge && (
                <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-bold text-[10px] flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-white" />
                    {product.badge}
                </div>
            )}


            <div className="relative h-56 overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#2e7d32] px-2.5 py-1 rounded-full font-['Poppins',sans-serif] font-medium text-[10px] shadow-sm">
                    {product.categoryLabel}
                </div>
            </div>


            <div className="p-4">
                <h3 className="text-gray-900 mb-1.5 font-['Poppins',sans-serif] font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#2e7d32] transition-colors">
                    {product.name}
                </h3>


                <p className="text-gray-500 font-['Poppins',sans-serif] font-light text-xs mb-3 line-clamp-2">
                    {product.description}
                </p>


                <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < stars ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                    ))}
                    <span className="text-gray-400 font-['Poppins',sans-serif] text-[10px] ml-1">({rating})</span>
                </div>


                <div className="mb-3">
                    {product.mrp && (
                        <span className="text-gray-400 font-['Poppins',sans-serif] font-light text-xs line-through mr-2">
                            ₹{product.mrp}
                        </span>
                    )}
                    <span className="font-['Poppins',sans-serif] font-bold text-[#2e7d32] text-xl">
                        ₹{product.price}
                    </span>
                </div>


                <div className="flex flex-col gap-2">
                    <button className="flex items-center justify-center gap-2 bg-white border border-[#2e7d32] text-[#2e7d32] px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#2e7d32] hover:text-white transition-all">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                    </button>
                    <button className="bg-[#2e7d32] text-white px-3 py-2 rounded-lg font-['Poppins',sans-serif] font-medium text-xs hover:bg-[#256629] transition-all">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}