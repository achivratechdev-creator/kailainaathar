import React from 'react';
import { Mail, Phone, Eye, ShoppingBag } from 'lucide-react';
import { Customer } from '@/types';

// Add the interface
interface CustomerTableProps {
  customers: Customer[];
  onViewDetails: (customer: Customer) => void; // New Prop
}

const TableHeaderCell = ({ label, align = "left" }: { label: string; align?: "left" | "right" }) => (
  <th className={`px-6 py-4 text-${align} text-xs font-medium text-gray-600 uppercase tracking-wider`}>
    {label}
  </th>
);

// Update Component signature
export default function CustomerTable({ customers, onViewDetails }: CustomerTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <TableHeaderCell label="Customer" />
              <TableHeaderCell label="Contact" />
              <TableHeaderCell label="Orders" />
              <TableHeaderCell label="Total Spent" />
              <TableHeaderCell label="Join Date" />
              <TableHeaderCell label="Status" />
              <TableHeaderCell label="Actions" align="right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-gray-800 font-light">{customer.name}</p>
                    <p className="text-xs text-gray-500 font-light">ID: {customer.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                      <span className="text-sm text-gray-700 font-light">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                      <span className="text-sm text-gray-700 font-light">{customer.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-800 font-light">{customer.orders}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-800 font-light">{customer.spent}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 font-light">{customer.joinDate}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-light ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewDetails(customer)} // Trigger Prop
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150" 
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150" title="View Orders">
                      <ShoppingBag className="w-4 h-4" strokeWidth={2} />
                    </button>
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