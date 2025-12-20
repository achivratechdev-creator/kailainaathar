import React from 'react';
import { CircleAlert } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({ isOpen, productName, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CircleAlert className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl text-gray-800 font-['Poppins',sans-serif] font-semibold mb-2">
            Delete Product?
          </h3>
          <p className="text-sm text-gray-500 font-['Poppins',sans-serif] font-normal mb-6">
            Are you sure you want to delete {productName}? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-['Poppins',sans-serif] font-light"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-['Poppins',sans-serif] font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}