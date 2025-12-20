import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      <div>
        <h1 className="text-lg text-gray-800 font-semibold">{title}</h1>
        <p className="text-xs text-gray-500 font-normal">{subtitle}</p>
      </div>
      {/* ... Rest of header (User profile) remains the same ... */}
       <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-800 font-light">admin@kailainaadhar.com</p>
          <p className="text-xs text-gray-500 font-light">Administrator</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-[#2e7d32] to-[#66bb6a] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-light">A</span>
        </div>
      </div>
    </header>
  );
}