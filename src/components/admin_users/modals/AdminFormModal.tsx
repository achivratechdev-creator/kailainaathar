import React, { useState } from 'react';
import { X, Eye, SquarePen, UserCog, Shield, ShieldCheck } from 'lucide-react';
import { AdminUser } from '@/types';
import Dropdown from '@/components/ui/Dropdown'; 

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<AdminUser>) => void;
  initialData?: AdminUser | null;
}

const ROLES = ['Full-Control Admin', 'Order-Management'];
const STATUS_OPTIONS = ['Active', 'Inactive'];

export default function AdminFormModal({ isOpen, onClose, onSubmit, initialData }: AdminFormModalProps) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'Full-Control Admin' | 'Order-Management';
    status: 'Active' | 'Inactive';
  }>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    confirmPassword: '',
    role: (initialData?.role === 'Full-Control Admin' || initialData?.role === 'Order-Management')
      ? initialData.role
      : 'Full-Control Admin',
    status: initialData?.status || 'Active'
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Helper to render permissions
  const renderPermissionCard = () => {
    const isFullControl = formData.role === 'Full-Control Admin';
    const color = isFullControl ? 'green' : 'blue';
    const Icon = isFullControl ? ShieldCheck : Shield;
    
    return (
      <div className={`p-4 rounded-xl border-2 bg-${color}-50 border-${color}-200 transition-all`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-${color}-100`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
          <div className="flex-1">
            <h4 className={`font-['Poppins',sans-serif] font-semibold text-sm mb-2 text-${color}-800`}>
              {isFullControl ? 'Full-Control Admin Permissions' : 'Order-Management Admin Permissions'}
            </h4>
            <ul className={`space-y-1.5 text-xs text-${color}-700 font-['Poppins',sans-serif] font-light`}>
              {isFullControl ? (
                <>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>Complete access to all modules</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>Manage products, orders, customers</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>Manage admin users</li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>View and manage orders</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>View-only access to products</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>Cannot manage admin users</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isEditMode ? 'bg-blue-600' : 'bg-[#2e7d32]'}`}>
               {isEditMode ? <SquarePen className="w-5 h-5 text-white" /> : <UserCog className="w-5 h-5 text-white" />}
            </div>
            <h3 className="text-xl text-gray-800 font-['Poppins',sans-serif] font-semibold">
              {isEditMode ? 'Edit Admin User' : 'Add New Admin User'}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Full Name *</label>
              <input 
                type="text" required 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light text-sm"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Email Address *</label>
              <input 
                type="email" required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light text-sm"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Password {isEditMode ? '' : '*'}</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required={!isEditMode}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light text-sm pr-12"
                  placeholder={isEditMode ? "Leave blank to keep current" : "Enter password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Confirm Password {isEditMode ? '' : '*'}</label>
              <input 
                type={showPassword ? "text" : "password"} 
                required={!isEditMode}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light text-sm"
                placeholder={isEditMode ? "Leave blank to keep current" : "Confirm password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
          <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Admin Role *</label>
          <Dropdown value={formData.role} onChange={(val) => setFormData({...formData, role: val as 'Full-Control Admin' | 'Order-Management'})} options={ROLES} placeholder="Select admin role" />
        </div>

          {/* Permission Card */}
          {renderPermissionCard()}

          {/* Status */}
          <div>
          <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Status</label>
          <Dropdown value={formData.status} onChange={(val) => setFormData({...formData, status: val as 'Active' | 'Inactive'})} options={STATUS_OPTIONS} />
            </div>

          {/* FIXED: Buttons Section */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-['Poppins',sans-serif] font-light"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`flex-1 px-6 py-3 text-white rounded-xl hover:shadow-lg transition-all font-['Poppins',sans-serif] font-medium ${isEditMode ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-[#2e7d32] to-[#66bb6a]'}`}
            >
              {isEditMode ? 'Update User' : 'Add Admin User'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}