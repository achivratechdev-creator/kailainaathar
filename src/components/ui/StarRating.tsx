import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;             // Current rating value
  maxStars?: number;          // Default 5
  size?: number;              // Icon size
  onChange?: (newRating: number) => void; // Function to handle clicks
  readOnly?: boolean;         // If true, user cannot click
}

export default function StarRating({ 
  rating, 
  maxStars = 5, 
  size = 16, 
  onChange,
  readOnly = false
}: StarRatingProps) {
  
  // Local state for hover effect (optional, makes it feel nicer)
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        
        // Use hover value if present, otherwise actual rating.
        // FIX: We wrap 'rating' in Number() to prevent the "Operator > cannot be applied to types string and number" error.
        const displayValue = hoverRating ?? Number(rating);
        
        // Logic: Should this star be yellow?
        const isFilled = starValue <= Math.round(displayValue);

        return (
          <Star 
            key={index} 
            size={size}
            className={`transition-colors duration-200 ${readOnly ? '' : 'cursor-pointer'} ${
              isFilled 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-gray-200 text-gray-200'
            }`}
            // 1. Click Handler (Updates the state in parent)
            onClick={() => {
              if (!readOnly && onChange) {
                onChange(starValue);
              }
            }}
            // 2. Hover Handlers (Visual only)
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(null)}
          />
        );
      })}
    </div>
  );
}