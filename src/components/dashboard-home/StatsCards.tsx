import React from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { DashboardStat } from '@/types';

const iconMap = {
  dollar: DollarSign,
  cart: ShoppingCart,
  package: Package,
  users: Users
};

const gradientMap = {
  green: 'from-green-500 to-green-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600' // fallback
};

export default function StatsCards({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.iconName];
        return (
          <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-light mb-1.5">{stat.title}</p>
                <h3 className="text-2xl text-gray-800 font-medium">{stat.value}</h3>
              </div>
              <div className={`w-11 h-11 bg-gradient-to-br ${gradientMap[stat.color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-light ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 font-light">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}