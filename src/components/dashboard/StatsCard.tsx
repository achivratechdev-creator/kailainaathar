import React from 'react';
import { StatCardProps } from '@/types';

export default function StatsCard({ title, value, icon, gradientFrom, gradientTo }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-light mb-1.5">{title}</p>
          <h3 className="text-2xl text-gray-800 font-medium">{value}</h3>
        </div>
        <div className={`w-11 h-11 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {React.cloneElement(icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, { className: "w-5 h-5 text-white", strokeWidth: 2 })}
        </div>
      </div>
    </div>
  );
};