import React from 'react';
import { Eye, Download, ExternalLink } from 'lucide-react';
import { Order } from '@/types';
import StatusBadge from './StatusBadge';

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onUpdateStatus: (id: string, status: Order['status']) => void;
  onAssignTracking: (order: Order) => void;
}

// FIX: Enforced text-left
const TableHeaderCell = ({ label, align = "left" }: { label: string; align?: "left" | "right" }) => (
  <th className={`px-6 py-4 text-${align} text-xs font-medium text-gray-600 uppercase tracking-wider`}>
    {label}
  </th>
);

export default function OrderTable({ orders, onViewDetails, onUpdateStatus, onAssignTracking }: OrderTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <TableHeaderCell label="Order ID" />
              <TableHeaderCell label="Customer" />
              <TableHeaderCell label="Date" />
              <TableHeaderCell label="Total" />
              <TableHeaderCell label="Status" />
              <TableHeaderCell label="Tracking" />
              <TableHeaderCell label="Actions" align="right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4"><p className="text-sm text-gray-800 font-light">{order.id}</p></td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-gray-800 font-light">{order.customerName}</p>
                    <p className="text-xs text-gray-500 font-light">{order.customerEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-gray-700 font-light">{order.date}</span></td>
                <td className="px-6 py-4"><span className="text-sm text-gray-800 font-light">{order.total}</span></td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} onStatusChange={(newStatus) => onUpdateStatus(order.id, newStatus)} />
                </td>
                <td className="px-6 py-4">
                  {order.tracking ? (
                    <div>
                      <p className="text-xs text-gray-600 font-light">{order.tracking.carrier}</p>
                      <a href={order.tracking.url} className="text-xs text-[#2e7d32] hover:text-[#66bb6a] font-light flex items-center gap-1">
                        {order.tracking.number} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ) : (
                    <button onClick={() => onAssignTracking(order)} className="text-xs text-blue-600 hover:text-blue-700 font-light underline decoration-blue-200 hover:decoration-blue-600 transition-all">Assign</button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onViewDetails(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
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