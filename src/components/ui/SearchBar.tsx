import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ searchTerm, setSearchTerm, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        {/* Icon Wrapper */}
        <div className="absolute left-0 pl-3.5 flex items-center pointer-events-none h-full">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        
        <input 
          type="text" 
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent font-light placeholder:text-gray-400 transition-all hover:border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}