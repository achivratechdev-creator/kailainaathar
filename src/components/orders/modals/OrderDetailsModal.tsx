import React from 'react';
import { X } from 'lucide-react';
import { Order } from '@/types';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-gray-800 font-semibold">Order Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Order ID & Date */}
          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 font-light">Order ID</p>
              <p className="text-lg text-gray-800 font-medium">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-light">Order Date</p>
              <p className="text-lg text-gray-800 font-medium">{order.date}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <p className="text-sm text-gray-500 font-light mb-1">Customer Details</p>
            <p className="text-gray-800 font-medium">{order.customerName}</p>
            <p className="text-sm text-gray-600 font-light">{order.customerEmail}</p>
            <p className="text-sm text-gray-600 font-light">{order.customerPhone || '+91 98765 43210'}</p>
          </div>

          {/* Address */}
          <div>
            <p className="text-sm text-gray-500 font-light mb-1">Delivery Address</p>
            <p className="text-sm text-gray-800 font-light">
              {order.shippingAddress || '123, MG Road, Bangalore, Karnataka - 560001'}
            </p>
          </div>

          {/* Items List */}
          <div>
            <p className="text-sm text-gray-500 font-light mb-2">Products</p>
            {/* Mock items if none provided in data */}
            {(order.items || [{ name: 'Ashwagandha Powder', qty: 2, price: order.total }]).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm text-gray-800 font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500 font-light">Qty: {item.qty}</p>
                </div>
                <p className="text-sm text-gray-800 font-medium">{item.price}</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 border-t-2 border-gray-300">
            <p className="text-lg text-gray-800 font-medium">Total Amount</p>
            <p className="text-lg text-gray-800 font-medium">{order.total}</p>
          </div>

        </div>
      </div>
    </div>
  );
}