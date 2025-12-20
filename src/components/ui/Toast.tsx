"use client";

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // Delay unmounting to allow exit animation
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed top-24 right-4 z-[100] flex items-center gap-3 bg-[#2e7d32] text-white px-6 py-4 rounded-xl shadow-2xl transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white/20 p-1 rounded-full">
        <Check className="w-5 h-5 text-white" strokeWidth={3} />
      </div>
      <span className="font-['Poppins',sans-serif] font-medium text-sm">
        {message}
      </span>
    </div>
  );
}