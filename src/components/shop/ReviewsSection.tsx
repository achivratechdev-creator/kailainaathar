"use client";

import React, { useState } from 'react';
import { Star, BadgeCheck, ThumbsUp } from 'lucide-react';

interface Review {
  id: number;
  userName: string;
  userInitial: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  isHelpful?: boolean; 
}

export default function ReviewsSection({ product }: { product: any }) {
  const [reviews, setReviews] = useState<Review[]>(
    product.reviews.map((r: any) => ({ ...r, isHelpful: false }))
  );

  const handleHelpfulClick = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review.id === reviewId) {
          const newIsHelpful = !review.isHelpful;
          return {
            ...review,
            isHelpful: newIsHelpful,
            helpfulCount: newIsHelpful 
              ? review.helpfulCount + 1 
              : review.helpfulCount - 1,
          };
        }
        return review;
      })
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
      <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-xl mb-6">
        Customer Reviews
      </h2>

      {/* Rating Summary Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center gap-8">
        <div className="text-center md:border-r border-amber-200 md:pr-8">
          <div className="text-5xl font-bold text-gray-900 mb-2">{product.ratingAverage}</div>
          
          {/* DYNAMIC STARS LOGIC */}
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${
                  star <= Math.round(product.ratingAverage) 
                    ? "fill-amber-400 text-amber-400"  // Filled Star
                    : "text-gray-300"                  // Empty Star
                }`} 
              />
            ))}
          </div>
          
          <p className="text-gray-600 text-sm font-['Poppins',sans-serif]">Based on {product.ratingCount} reviews</p>
        </div>
        
        {/* Progress Bars */}
        <div className="flex-1 w-full space-y-2">
          {[76, 18, 4, 1, 1].map((pct, i) => (
            <div key={i} className="flex items-center gap-3 text-xs font-['Poppins',sans-serif]">
              <span className="w-3 font-medium text-gray-700">{5 - i}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div style={{ width: `${pct}%` }} className="h-full bg-amber-400"></div>
              </div>
              <span className="w-8 text-right text-gray-500">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] flex items-center justify-center text-white font-bold font-['Poppins',sans-serif]">
                  {review.userInitial}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-gray-900 font-['Poppins',sans-serif]">
                      {review.userName}
                    </h4>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-['Poppins',sans-serif]">
                        <BadgeCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  
                  {/* INDIVIDUAL REVIEW STARS */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3 h-3 ${
                            star <= review.rating 
                              ? "fill-amber-400 text-amber-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-['Poppins',sans-serif]">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm mb-4 font-['Poppins',sans-serif] leading-relaxed">
              {review.comment}
            </p>

            <button
              onClick={() => handleHelpfulClick(review.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium font-['Poppins',sans-serif] transition-all duration-200 active:scale-95 ${
                review.isHelpful
                  ? 'bg-[#2e7d32] text-white border border-[#2e7d32] shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${review.isHelpful ? 'fill-white' : ''}`} /> 
              Helpful ({review.helpfulCount})
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}