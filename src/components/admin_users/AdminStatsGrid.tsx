import React from 'react';
import { UserCog, ShieldCheck, Shield } from 'lucide-react';

// New interface for props
interface AdminStatsGridProps {
  totalUsers: number;
  fullControlCount: number;
  orderManagerCount: number;
}

export default function AdminStatsGrid({ totalUsers, fullControlCount, orderManagerCount }: AdminStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Admin Users (Green) */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-700 font-['Poppins',sans-serif] font-medium text-sm mb-1">Total Admin Users</p>
            <p className="text-green-900 font-['Poppins',sans-serif] font-bold text-3xl">{totalUsers}</p>
          </div>
          <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center">
            <UserCog className="w-7 h-7 text-green-700" />
          </div>
        </div>
      </div>

      {/* Full-Control Admins (Blue) */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-700 font-['Poppins',sans-serif] font-medium text-sm mb-1">Full-Control Admins</p>
            <p className="text-blue-900 font-['Poppins',sans-serif] font-bold text-3xl">{fullControlCount}</p>
          </div>
          <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-blue-700" />
          </div>
        </div>
      </div>

      {/* Order-Management Admins (Purple) */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-700 font-['Poppins',sans-serif] font-medium text-sm mb-1">Order-Management Admins</p>
            <p className="text-purple-900 font-['Poppins',sans-serif] font-bold text-3xl">{orderManagerCount}</p>
          </div>
          <div className="w-14 h-14 bg-purple-200 rounded-full flex items-center justify-center">
            <Shield className="w-7 h-7 text-purple-700" />
          </div>
        </div>
      </div>
    </div>
  );
}