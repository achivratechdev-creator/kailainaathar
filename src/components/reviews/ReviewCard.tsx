import React from 'react';
import { Star, Trash2, CircleCheckBig, X } from 'lucide-react';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ReviewCard({ review, onApprove, onReject, onDelete }: ReviewCardProps) {
  
  // Helper to render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  // Helper for status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-sm text-gray-800 font-medium">{review.productName}</h4>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-light ${getStatusColor(review.status)}`}>
              {review.status}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <p className="text-sm text-gray-600 font-light">{review.userName}</p>
            <span className="text-xs text-gray-400">•</span>
            <p className="text-sm text-gray-500 font-light">{review.date}</p>
            <span className="text-xs text-gray-400">•</span>
            <div className="flex gap-1">
              {renderStars(review.rating)}
            </div>
          </div>
          
          <p className="text-sm text-gray-700 font-light leading-relaxed">
            {review.comment}
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-3 border-t border-gray-200">
        {/* Logic for Action Buttons */}
        {review.status === 'Pending' && (
          <>
            <button 
              onClick={() => onApprove(review.id)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white text-sm rounded-lg hover:shadow-lg transition-all duration-200 font-light"
            >
              <CircleCheckBig className="w-4 h-4" />
              Approve
            </button>
            <button 
              onClick={() => onReject(review.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-200 font-light"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
          </>
        )}
        
        {/* Delete is always available, styled differently based on context in your HTML, 
            but keeping it consistent here for simplicity. You can add 'ml-auto' to push it right if needed. */}
        <button 
          onClick={() => onDelete(review.id)}
          className={`flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-all duration-200 font-light ${review.status === 'Pending' ? 'ml-auto' : ''}`}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}