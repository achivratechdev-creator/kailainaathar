import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  value: string | number;
  onChange: (val: string) => void;
  options: { label: string; value: string | number }[] | string[];
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function Dropdown({ value, onChange, options, placeholder = "Select...", className = "", required = false }: DropdownProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <select 
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-4 py-3 bg-white border border-gray-300 rounded-lg font-['Poppins',sans-serif] font-light text-sm text-gray-700 cursor-pointer focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all hover:border-gray-400 pr-10"
        >
          <option value="" disabled className="text-gray-400">{placeholder}</option>
          {options.map((opt) => {
            const label = typeof opt === 'string' ? opt : opt.label;
            const val = typeof opt === 'string' ? opt : opt.value;
            return <option key={val} value={val}>{label}</option>;
          })}
        </select>
        
        {/* Custom Arrow Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}