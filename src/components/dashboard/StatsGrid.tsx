import React from 'react';
import { Users, UserCheck, Package, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <StatsCard
        title="Total Customers"
        value={5}
        icon={<Users />}
        gradientFrom="from-blue-500"
        gradientTo="to-blue-600"
      />
      <StatsCard
        title="Active Customers"
        value={4}
        icon={<UserCheck />}
        gradientFrom="from-green-500"
        gradientTo="to-green-600"
      />
      <StatsCard
        title="Total Orders"
        value={43}
        icon={<Package />}
        gradientFrom="from-purple-500"
        gradientTo="to-purple-600"
      />
      <StatsCard
        title="Total Revenue"
        value="₹19,400"
        icon={<DollarSign />}
        gradientFrom="from-orange-500"
        gradientTo="to-orange-600"
      />
    </div>
  );
};