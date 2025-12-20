import React from 'react';
import { 
  Shield, LayoutDashboard, Package, ShoppingCart, 
  Users, Star, ChartColumn, UserCog, Settings, LogOut, X, Menu
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// 1. Define the props we are injecting into the cloned icon
interface IconProps {
  className?: string;
  strokeWidth?: number;
}

// --- HELPER COMPONENT ---
const SidebarLink = ({ 
  icon, 
  label, 
  active = false, 
  collapsed = false, 
  onClick 
}: { 
  icon: React.ReactElement; 
  label: string; 
  active?: boolean; 
  collapsed?: boolean;
  onClick: () => void; 
}) => {
  const baseClasses = "flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 text-sm font-light relative group";
  const activeClasses = "bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white shadow-sm";
  const inactiveClasses = "text-gray-600 hover:bg-gray-50";
  
  const layoutClasses = collapsed ? "justify-center w-full" : "w-full";

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses} ${layoutClasses}`}
      title={collapsed ? label : undefined}
    >
      {/* FIX APPLIED HERE: Replaced 'any' with specific 'IconProps' */}
      {React.cloneElement(icon as React.ReactElement<IconProps>, { 
        className: "w-4.5 h-4.5 flex-shrink-0", 
        strokeWidth: 2 
      })}
      
      {!collapsed && <span>{label}</span>}
    </button>
  );
};

// --- MAIN COMPONENT ---
export default function Sidebar({ activePage, onNavigate, isCollapsed, toggleSidebar }: SidebarProps) {
  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

  return (
    <aside className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ${sidebarWidth}`}>
      
      {/* Header */}
      <div className={`h-16 border-b border-gray-100 flex items-center px-5 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#2e7d32] to-[#66bb6a] rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" strokeWidth={2} />
            
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h2 className="text-sm text-gray-800 font-['Arima',sans-serif] font-medium">Admin Portal</h2>
              <p className="text-xs text-gray-500 font-light">Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="py-4 px-3 space-y-1">
        <SidebarLink 
          icon={<LayoutDashboard />} label="Dashboard" 
          active={activePage === 'dashboard'} collapsed={isCollapsed} onClick={() => onNavigate('dashboard')} 
        />
        <SidebarLink 
          icon={<Package />} label="Products" 
          active={activePage === 'products'} collapsed={isCollapsed} onClick={() => onNavigate('products')} 
        />
        <SidebarLink 
          icon={<ShoppingCart />} label="Orders" 
          active={activePage === 'orders'} collapsed={isCollapsed} onClick={() => onNavigate('orders')} 
        />
        <SidebarLink 
          icon={<Users />} label="Customers" 
          active={activePage === 'customers'} collapsed={isCollapsed} onClick={() => onNavigate('customers')} 
        />
        <SidebarLink 
          icon={<Star />} label="Reviews" 
          active={activePage === 'reviews'} collapsed={isCollapsed} onClick={() => onNavigate('reviews')} 
        />
        <SidebarLink 
          icon={<ChartColumn />} label="Reports" 
          active={activePage === 'reports'} collapsed={isCollapsed} onClick={() => onNavigate('reports')} 
        />
        <SidebarLink 
          icon={<UserCog />} label="Admin Users" 
          active={activePage === 'admin-users'} collapsed={isCollapsed} onClick={() => onNavigate('admin-users')} 
        />
        <SidebarLink 
          icon={<Settings />} label="Settings" 
          active={activePage === 'settings'} collapsed={isCollapsed} onClick={() => onNavigate('settings')} 
        />
      </nav>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
        <button className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 text-sm font-light ${isCollapsed ? 'justify-center w-full' : 'w-full'}`}>
          <LogOut className="w-4.5 h-4.5 flex-shrink-0" strokeWidth={2} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Toggle Buttons */}
      {isCollapsed ? (
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-24 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 z-50"
        >
          <Menu className="w-3 h-3 text-gray-600" />
        </button>
      ) : (
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-24 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 z-50"
        >
          <X className="w-3 h-3 text-gray-600" />
        </button>
      )}
    </aside>
  );
};