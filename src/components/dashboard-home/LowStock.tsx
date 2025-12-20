import React from 'react';
import { CircleAlert } from 'lucide-react';
import { LowStockItem } from '@/types';

export default function LowStock({ items }: { items: LowStockItem[] }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <CircleAlert className="w-4 h-4 text-red-600" />
        <h3 className="text-sm text-gray-800 font-medium">Low Stock Alert</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-gray-800 font-light mb-1.5">{item.name}</p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-600 font-light">Stock: {item.currentStock}</span>
              <span className="text-xs text-red-600 font-light">Min: {item.minStock}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}