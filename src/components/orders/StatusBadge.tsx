import React from 'react';
import { Clock, Truck, CheckCircle, XCircle, ChevronDown, Package } from 'lucide-react';
import { Order } from '@/types';

interface StatusBadgeProps {
  status: Order['status'];
  onStatusChange?: (newStatus: Order['status']) => void;
}

export default function StatusBadge({ status, onStatusChange }: StatusBadgeProps) {
  
  // Design configuration
  const styles = {
    Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    Shipped: { bg: 'bg-purple-100', text: 'text-purple-700', icon: Truck },
    Delivered: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    Cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    Packed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Package },
  };

  const currentStyle = styles[status] || styles.Pending;
  const Icon = currentStyle.icon;

  // Handle change event from the invisible select
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onStatusChange) {
      onStatusChange(e.target.value as Order['status']);
    }
  };

  return (
    <div className="relative inline-block group">
      {/* 1. VISUAL LAYER: Keeps your exact design */}
      <div className={`flex items-center gap-2 pointer-events-none`}>
        <Icon className="w-4 h-4 text-gray-500" />
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-light ${currentStyle.bg} ${currentStyle.text}`}>
          <span>{status}</span>
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>

      {/* 2. INTERACTIVE LAYER: Invisible Select on top */}
      {/* This ensures the dropdown works even inside scrollable tables */}
      <select
        value={status}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 appearance-none"
        title="Change Status"
      >
        {Object.keys(styles).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}