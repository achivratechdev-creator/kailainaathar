import React from 'react';
import { MessageSquare, CircleCheckBig, Clock, Star } from 'lucide-react';

interface ReviewStatsProps {
  total: number;
  approved: number;
  pending: number;
  averageRating: number;
}

export default function ReviewStats({ total, approved, pending, averageRating }: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Total Reviews */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-light">Total Reviews</p>
            <p className="text-2xl text-gray-800 font-medium">{total}</p>
          </div>
        </div>
      </div>

      {/* Approved */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
            <CircleCheckBig className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-light">Approved</p>
            <p className="text-2xl text-gray-800 font-medium">{approved}</p>
          </div>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-light">Pending</p>
            <p className="text-2xl text-gray-800 font-medium">{pending}</p>
          </div>
        </div>
      </div>

      {/* Avg Rating */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-light">Average Rating</p>
            <p className="text-2xl text-gray-800 font-medium">{averageRating} ⭐</p>
          </div>
        </div>
      </div>
    </div>
  );
}