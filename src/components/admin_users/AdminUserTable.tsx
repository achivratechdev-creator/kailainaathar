import React from 'react';
import { SquarePen, Trash2, ShieldCheck, Shield } from 'lucide-react';
import { AdminUser } from '@/types';

interface AdminUserTableProps {
  users: AdminUser[];
  onEdit: (user: AdminUser) => void;   // New Prop
  onDelete: (user: AdminUser) => void; // New Prop
}

const TableHeaderCell = ({ label, align = "left" }: { label: string; align?: "left" | "right" }) => (
  <th className={`px-6 py-4 text-${align} text-xs font-['Poppins',sans-serif] font-medium text-gray-600 uppercase tracking-wider`}>
    {label}
  </th>
);

export default function AdminUserTable({ users, onEdit, onDelete }: AdminUserTableProps) {
  
  const getRoleIcon = (role: string) => {
    if (role === 'Full-Control Admin' || role === 'Main Administrator') return <ShieldCheck className="w-4 h-4 text-green-600" />;
    return <Shield className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <TableHeaderCell label="Admin User" />
              <TableHeaderCell label="Role" />
              <TableHeaderCell label="Created Date" />
              <TableHeaderCell label="Last Login" />
              <TableHeaderCell label="Status" />
              <TableHeaderCell label="Actions" align="right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-['Poppins',sans-serif] font-semibold text-sm">{user.initial}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-['Poppins',sans-serif] font-light">{user.name}</p>
                      <p className="text-xs text-gray-500 font-['Poppins',sans-serif] font-light">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <span className="text-sm text-gray-700 font-['Poppins',sans-serif] font-light">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-gray-700 font-['Poppins',sans-serif] font-light">{user.createdDate}</span></td>
                <td className="px-6 py-4"><span className="text-sm text-gray-700 font-['Poppins',sans-serif] font-light">{user.lastLogin}</span></td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-['Poppins',sans-serif] font-light ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* Don't allow editing/deleting the Main Administrator */}
                    {user.role !== 'Main Administrator' && (
                      <>
                        <button onClick={() => onEdit(user)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit User">
                          <SquarePen className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(user)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}