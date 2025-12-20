import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQty: number) => void;
}

export default function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const increase = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="mb-5">
      <label className="block text-gray-700 font-['Poppins',sans-serif] font-semibold mb-2 text-xs uppercase tracking-wide">
        Quantity
      </label>
      <div className="flex items-center gap-3">
        <button 
          onClick={decrease}
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-['Poppins',sans-serif] font-medium text-base transition-all active:scale-95 text-gray-700"
        >
          -
        </button>
        <span className="font-['Poppins',sans-serif] font-bold text-lg w-12 text-center text-gray-900">
          {quantity}
        </span>
        <button 
          onClick={increase}
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-['Poppins',sans-serif] font-medium text-base transition-all active:scale-95 text-gray-700"
        >
          +
        </button>
      </div>
    </div>
  );
}