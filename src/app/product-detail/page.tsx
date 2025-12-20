"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, ShoppingCart, Star, Shield, Truck, 
  RotateCcw, Award, Phone, MessageCircle, Check, 
  CreditCard, Headphones, ShieldCheck 
} from 'lucide-react';
import Toast from '@/components/ui/Toast';
import { useCartStore } from '@/store/useCartStore';
import ReviewsSection from '@/components/shop/ReviewsSection';

// --- DATA ---
const PRODUCT = {
  id: 1, 
  name: 'Neelibringadi Kera Thailam',
  category: 'Herbal Oils',
  price: 100,
  originalPrice: 585,
  description: 'Neelibringadi Kera Thailam is a classical Siddha oil formulation that promotes hair growth, prevents premature greying, and nourishes the scalp.',
  ratingAverage: 3, // CHANGED TO 3 TO TEST DYNAMIC STARS
  ratingCount: 250,
  isFeatured: true, 
  benefits: [
    'Strengthens hair follicles', 'Improves hair texture', 
    'Reduces dandruff', 'Cooling effect on head'
  ],
  ingredients: [
    'Neeli (Indigofera tinctoria)', 'Bhringaraj (Eclipta alba)', 
    'Coconut Oil', 'Amla', 'Curry Leaves'
  ],
  image: '/images/kum-kumadi.jpg', 
  
  reviews: [
    { 
      id: 1, 
      userName: 'Priya Sharma', 
      userInitial: 'P', 
      rating: 5, 
      date: '2 weeks ago', 
      comment: "Absolutely wonderful product! My joint pain has reduced significantly.", 
      verified: true, 
      helpfulCount: 42 
    },
    { 
      id: 2, 
      userName: 'Rajesh Kumar', 
      userInitial: 'R', 
      rating: 5, 
      date: '1 month ago', 
      comment: "Best Siddha medicine I have ever tried. Delivery was quick.", 
      verified: true, 
      helpfulCount: 28 
    },
  ]
};

// ... (LoginModal, QuantitySelector, ProductGallery, WhyBuyFromUs components remain same) ...
// Copy them from your previous file or let me know if you need them repeated.
// For brevity, I am showing the main component logic below.

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-3">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-xl mb-1.5">Login Required</h3>
          <p className="text-gray-600 font-['Poppins',sans-serif] font-light text-sm">Please login to continue with your purchase</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:bg-gray-200 transition-all">Cancel</button>
            <button onClick={() => { window.location.href = '/login'; }} className="flex-1 bg-[#2e7d32] text-white py-2.5 rounded-lg font-['Poppins',sans-serif] font-medium text-sm hover:bg-[#256629] transition-all">Login Now</button>
        </div>
      </div>
    </div>
  );
};

const QuantitySelector = ({ quantity, onChange }: { quantity: number, onChange: (q: number) => void }) => (
  <div className="mb-5">
    <label className="block text-gray-700 font-['Poppins',sans-serif] font-semibold mb-2 text-xs uppercase tracking-wide">Quantity</label>
    <div className="flex items-center gap-3">
      <button onClick={() => quantity > 1 && onChange(quantity - 1)} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-bold text-gray-700 transition-all">-</button>
      <span className="font-['Poppins',sans-serif] font-bold text-lg w-12 text-center text-gray-900">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-bold text-gray-700 transition-all">+</button>
    </div>
  </div>
);

const ProductGallery = () => (
  <div className="relative">
    <div className="sticky top-24">
      <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden bg-gray-50 border border-gray-200 relative group">
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
             <img src="/images/kum-kumadi.jpg" alt="Product" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {PRODUCT.isFeatured && (
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md">
              <Star className="w-3 h-3 fill-white" /> Premium
            </div>
          )}
          <div className="bg-white/95 backdrop-blur-sm text-[#2e7d32] px-3 py-1.5 rounded-full font-medium text-xs shadow-md">Herbal Oils</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 max-w-md mx-auto">
        {[{ icon: Shield, text: 'Authentic', color: 'text-[#2e7d32]', bg: 'bg-green-50', border: 'border-green-200' }, { icon: Truck, text: 'Free Delivery', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' }, { icon: RotateCcw, text: 'Easy Returns', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' }].map((feat, i) => (
          <div key={i} className={`${feat.bg} rounded-lg p-2.5 text-center border ${feat.border}`}>
            <feat.icon className={`w-5 h-5 ${feat.color} mx-auto mb-1`} />
            <p className={`${feat.color} font-bold text-[10px]`}>{feat.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WhyBuyFromUs = () => {
  const features = [{ icon: RotateCcw, title: "Easy Returns & Refunds", desc: "7-day return policy. Full refund if product doesn't meet quality standards.", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" }, { icon: CreditCard, title: "100% Secure Payment", desc: "SSL encrypted checkout. Your payment information is completely safe.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" }, { icon: Truck, title: "Fast & Safe Delivery", desc: "Free delivery on orders above ₹500. Delivered in 3-5 business days.", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" }, { icon: Headphones, title: "24/7 Customer Support", desc: "Dedicated support team available via call, WhatsApp, or email anytime.", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" }, { icon: ShieldCheck, title: "Quality Guarantee", desc: "100% authentic Siddha products. Lab-tested and quality certified.", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100" }];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
      <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-xl mb-6">Why Buy From Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feat, i) => (
          <div key={i} className={`${feat.bg} border ${feat.border} rounded-xl p-5 flex items-start gap-4 transition-all hover:shadow-md`}>
            <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm ${feat.color}`}><feat.icon className="w-5 h-5" /></div>
            <div><h3 className="text-gray-900 font-['Poppins',sans-serif] font-semibold text-sm mb-1">{feat.title}</h3><p className="text-gray-600 font-['Poppins',sans-serif] text-xs leading-relaxed">{feat.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function ProductDetailPage() {
  const router = useRouter(); 
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const discountPercentage = Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100);

  const handleAction = () => {
    const isLoggedIn = false; 
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    addItem(PRODUCT.id, quantity);
    setToastMessage(`Added ${quantity} item(s) to cart!`);
    setShowToast(true);
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Arima:wght@400;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
      `}</style>

      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLoginRedirect} />

      <main className="pt-12 pb-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] font-medium text-sm mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Store
          </Link>

          {/* MAIN PRODUCT DETAIL GRID */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProductGallery />
              <div>
                <div className="mb-4">
                  {PRODUCT.isFeatured && (
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="text-amber-700 font-medium text-xs bg-amber-50 px-2.5 py-1 rounded-full">Featured Product</span>
                    </div>
                  )}
                  <h1 className="text-gray-900 font-bold text-2xl mb-2.5 leading-tight">{PRODUCT.name}</h1>
                  
                  {/* --- DYNAMIC RATING STARS --- */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${
                            star <= Math.round(PRODUCT.ratingAverage) 
                              ? "fill-amber-400 text-amber-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">({PRODUCT.ratingAverage})</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-600 text-sm">{PRODUCT.ratingCount}+ reviews</span>
                  </div>
                  {/* --------------------------- */}

                </div>

                <div className="mb-5 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-bold text-[#2e7d32] text-3xl">₹{PRODUCT.price}</span>
                    <span className="text-gray-400 text-base line-through">₹{PRODUCT.originalPrice}</span>
                    {discountPercentage > 0 && (<span className="bg-red-500 text-white px-2 py-0.5 rounded-full font-bold text-xs">Save {discountPercentage}%</span>)}
                  </div>
                  <p className="text-green-700 text-xs">Inclusive of all taxes • Free shipping on orders above ₹500</p>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{PRODUCT.description}</p>

                <div className="bg-gradient-to-r from-[#2e7d32]/5 to-[#66bb6a]/5 border border-[#2e7d32]/20 rounded-lg p-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-10 h-10 bg-[#2e7d32] rounded-full flex items-center justify-center"><Phone className="w-5 h-5 text-white" /></div>
                      <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold text-sm">Need Help? Contact Us</h4>
                      <a href="tel:+919876543210" className="text-[#2e7d32] font-bold text-base hover:underline">+91 98765 43210</a>
                    </div>
                  </div>
                </div>

                <QuantitySelector quantity={quantity} onChange={setQuantity} />

                <div className="flex gap-3 mb-6">
                  <button onClick={handleAction} className="flex-1 bg-white border-2 border-[#2e7d32] text-[#2e7d32] py-2.5 rounded-lg font-medium text-sm hover:bg-green-50 transition-all active:scale-95 flex items-center justify-center gap-2"><ShoppingCart className="w-4 h-4" /> Add to Cart</button>
                  <button onClick={handleAction} className="flex-1 bg-[#2e7d32] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#256629] transition-all active:scale-95">Buy Now</button>
                </div>

                <div className="border-t border-gray-200 pt-5 space-y-6">
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-3">Benefits</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <ul className="space-y-2">
                        {PRODUCT.benefits.map((b, i) => <li key={i} className="flex items-start gap-3 text-gray-700 text-sm"><Check className="w-4 h-4 text-[#2e7d32] mt-0.5" /> {b}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-3">Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCT.ingredients.map((ing, i) => <span key={i} className="bg-white border border-green-200 text-[#2e7d32] px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">{ing}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <WhyBuyFromUs />
          <ReviewsSection product={PRODUCT} />

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
            <h2 className="text-gray-900 font-['poppins',sans-serif] font-bold text-xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Link key={i} href="/product-detail" className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer">
                  <div className="relative h-60 w-full bg-gray-50 overflow-hidden">
                    <img src="/images/kum-kumadi.jpg" alt="Kumkumadi Thailam" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-[#0D5F4D] font-['Poppins',sans-serif] font-medium text-lg truncate">Kumkumadi Thailam</h3>
                    <div className="flex items-center gap-1">{[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                    <div className="flex items-center justify-between mt-1"><span className="text-[#2e7d32] font-bold font-['Poppins',sans-serif] text-xl">₹580</span><span className="text-gray-400 font-['Poppins',sans-serif] text-sm line-through decoration-1">₹754</span></div>
                    <span className="w-full bg-[#2E7D32] group-hover:bg-[#256629] text-white font-['Poppins',sans-serif] text-sm py-3 font-medium text-center block rounded-lg mt-3 transition-colors duration-200">View Details</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}