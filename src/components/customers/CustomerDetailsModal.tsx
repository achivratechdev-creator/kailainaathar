import React from 'react';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import { Customer } from '@/types';

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export default function CustomerDetailsModal({ isOpen, onClose, customer }: CustomerDetailsModalProps) {
  if (!isOpen || !customer) return null;

  // Get first letter for Avatar
  const initial = customer.name.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-gray-800 font-['Poppins',sans-serif] font-semibold">Customer Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Card Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2e7d32] to-[#66bb6a] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-xl font-medium font-['Poppins',sans-serif]">{initial}</span>
              </div>
              <div>
                <h4 className="text-lg text-gray-800 font-medium font-['Poppins',sans-serif]">{customer.name}</h4>
                <p className="text-sm text-gray-500 font-light font-['Poppins',sans-serif]">Customer ID: {customer.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-light mb-1 font-['Poppins',sans-serif]">Total Orders</p>
                <p className="text-lg text-gray-800 font-medium font-['Poppins',sans-serif]">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-light mb-1 font-['Poppins',sans-serif]">Total Spent</p>
                <p className="text-lg text-gray-800 font-medium font-['Poppins',sans-serif]">{customer.spent}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm text-gray-700 font-medium mb-3 font-['Poppins',sans-serif]">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-light font-['Poppins',sans-serif]">Email Address</p>
                  <p className="text-sm text-gray-800 font-light font-['Poppins',sans-serif]">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-light font-['Poppins',sans-serif]">Phone Number</p>
                  <p className="text-sm text-gray-800 font-light font-['Poppins',sans-serif]">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-light font-['Poppins',sans-serif]">Address</p>
                  <p className="text-sm text-gray-800 font-light font-['Poppins',sans-serif]">
                    {customer.address || 'Address not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div>
            <h4 className="text-sm text-gray-700 font-medium mb-3 font-['Poppins',sans-serif]">Account Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-light mb-1 font-['Poppins',sans-serif]">Join Date</p>
                <p className="text-sm text-gray-800 font-light font-['Poppins',sans-serif]">{customer.joinDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-light mb-1 font-['Poppins',sans-serif]">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-light font-['Poppins',sans-serif] ${
                  customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {customer.status}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-light font-['Poppins',sans-serif]">
              View Order History
            </button>
            <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-light font-['Poppins',sans-serif]">
              Send Email
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}