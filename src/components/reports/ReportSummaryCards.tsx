import React from 'react';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';
import { ReportSummary } from '@/types';

const iconMap = {
  dollar: DollarSign,
  package: Package,
  trending: TrendingUp,
  users: Users
};

const gradientMap = {
  green: 'from-green-500 to-green-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600'
};

export default function ReportSummaryCards({ data }: { data: ReportSummary[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {data.map((item, idx) => {
        const Icon = iconMap[item.icon];
        return (
          <div key={idx} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${gradientMap[item.color]} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-light">{item.title}</p>
                <p className="text-2xl text-gray-800 font-medium">{item.value}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-light">
              <span className={item.isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {item.isPositive ? '↑' : '↓'} {item.change}
              </span> from last month
            </p>
          </div>
        );
      })}
    </div>
  );
}