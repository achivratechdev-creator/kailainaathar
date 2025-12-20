import React from 'react';
import { TrendingUp, ShoppingCart, Users } from 'lucide-react';
import { DailyStat } from '@/types';

const iconMap = {
  trending: TrendingUp,
  cart: ShoppingCart,
  users: Users
};

const colors = {
  green: { bg: 'bg-gradient-to-br from-green-50 to-green-100', border: 'border-green-200', iconBg: 'bg-green-600' },
  blue: { bg: 'bg-gradient-to-br from-blue-50 to-blue-100', border: 'border-blue-200', iconBg: 'bg-blue-600' },
  purple: { bg: 'bg-gradient-to-br from-purple-50 to-purple-100', border: 'border-purple-200', iconBg: 'bg-purple-600' },
};

export default function DailyStats({ stats }: { stats: DailyStat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, idx) => {
        const Icon = iconMap[stat.iconName];
        const style = colors[stat.color];
        return (
          <div key={idx} className={`${style.bg} rounded-lg p-4 border ${style.border}`}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`w-8 h-8 ${style.iconBg} rounded-lg flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-xs text-gray-700 font-medium">{stat.title}</h4>
            </div>
            <p className="text-xl text-gray-800 mb-0.5 font-semibold">{stat.value}</p>
            <p className="text-[10px] text-gray-600 font-normal">{stat.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}