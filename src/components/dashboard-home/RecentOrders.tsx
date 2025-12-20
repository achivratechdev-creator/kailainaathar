import React from 'react';
import { RecentOrderSummary } from '@/types';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Packed: 'bg-blue-100 text-blue-700',
};

export default function RecentOrders({ orders }: { orders: RecentOrderSummary[] }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-lg p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-gray-800 font-medium">Recent Orders</h3>
        <button className="text-xs text-[#2e7d32] hover:text-[#66bb6a] font-light">View All →</button>
      </div>
      <div className="space-y-2.5">
        {orders.map((order, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 font-light truncate">{order.id}</p>
              <p className="text-xs text-gray-500 font-light truncate">{order.customer}</p>
            </div>
            <div className="flex-1 min-w-0 px-2">
              <p className="text-sm text-gray-700 font-light truncate">{order.product}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm text-gray-800 font-light">{order.amount}</p>
            </div>
            <div className="flex-shrink-0 ml-3">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-light ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}