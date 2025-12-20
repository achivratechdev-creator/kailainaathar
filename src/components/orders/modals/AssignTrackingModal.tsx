import React, { useState } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import { Order } from '@/types';

interface AssignTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onSubmit: (orderId: string, trackingData: { carrier: string; number: string }) => void;
}

const CARRIERS = ['DTDC', 'Delhivery', 'BlueDart', 'India Post', 'Amazon Shipping'];

export default function AssignTrackingModal({ isOpen, onClose, order, onSubmit }: AssignTrackingModalProps) {
  const [carrier, setCarrier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carrier && trackingNumber) {
      onSubmit(order.id, { carrier, number: trackingNumber });
      onClose();
      // Reset form
      setCarrier('');
      setTrackingNumber('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-gray-800 font-semibold">Mark as Shipped</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Info Card */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-700 font-medium">Order: {order.id}</p>
            <p className="text-xs text-gray-500 font-light mt-1">Customer: {order.customerName}</p>
          </div>

          {/* Carrier Dropdown (Custom to match design) */}
          <div className="relative">
            <label className="block text-sm text-gray-700 font-light mb-2">Delivery Partner *</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all hover:border-gray-400"
            >
              <span className={carrier ? 'text-gray-800' : 'text-gray-400 font-light'}>
                {carrier || 'Select delivery partner'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-40 animate-in fade-in zoom-in-95 duration-200">
                {CARRIERS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setCarrier(c); setIsDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all hover:bg-gray-50 ${
                      carrier === c ? 'bg-[#2e7d32]/5 text-[#2e7d32] font-medium' : 'text-gray-700 font-light'
                    }`}
                  >
                    <span>{c}</span>
                    {carrier === c && <Check className="w-3.5 h-3.5 text-[#2e7d32]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tracking Number Input */}
          <div>
            <label className="block text-sm text-gray-700 font-light mb-2">Tracking ID *</label>
            <input 
              type="text" 
              required
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-light text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-light"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!carrier || !trackingNumber}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}