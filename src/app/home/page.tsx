"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';

// Layout
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import SearchBar from '@/components/ui/SearchBar';
import Dropdown from '@/components/ui/Dropdown'; // Global Standard Dropdown

// Dashboard
import StatsCards from '@/components/dashboard-home/StatsCards';
import RecentOrders from '@/components/dashboard-home/RecentOrders';
import LowStock from '@/components/dashboard-home/LowStock';
import DailyStats from '@/components/dashboard-home/DailyStats';

// Products
import ProductTable from '@/components/products/ProductTable';
import ProductFormModal from '@/components/products/modals/ProductFormModal';
import DeleteConfirmationModal from '@/components/products/modals/DeleteConfirmationModal';

// Orders
import OrderTable from '@/components/orders/OrderTable';
import OrderDetailsModal from '@/components/orders/modals/OrderDetailsModal';
import AssignTrackingModal from '@/components/orders/modals/AssignTrackingModal';

// Customers
import StatsGrid from '@/components/dashboard/StatsGrid'; 
import CustomerTable from '@/components/dashboard/CustomerTable';
import CustomerDetailsModal from '@/components/customers/CustomerDetailsModal';

// Reviews
import ReviewStats from '@/components/reviews/ReviewStats';
import ReviewCard from '@/components/reviews/ReviewCard';

// Admin Users
import AdminUserTable from '@/components/admin_users/AdminUserTable';
import AdminStatsGrid from '@/components/admin_users/AdminStatsGrid';
import AdminFormModal from '@/components/admin_users/modals/AdminFormModal';
import DeleteAdminModal from '@/components/admin_users/modals/DeleteAdminModal';

// Reports
import ReportSummaryCards from '@/components/reports/ReportSummaryCards';
import SalesChart from '@/components/reports/SalesChart';
import CategoryPieChart from '@/components/reports/CategoryPieChart';
import TopProductsList from '@/components/reports/TopProductsList';

// Settings
import SettingsView from '@/components/settings/SettingsView';

import { 
  Customer, Order, Product, AdminUser, SettingsState, Review, 
  DashboardStat, LowStockItem, RecentOrderSummary, DailyStat,
  ReportSummary, MonthlySalesData, SalesCategory, TopProduct
} from '@/types';
import axios from 'axios';
import { deleteProduct } from '@/services/productService';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [reviewFilter, setReviewFilter] = useState('All');
  const [orderFilter, setOrderFilter] = useState('All');

  // Data
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [settings, setSettings] = useState<SettingsState | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dashStats, setDashStats] = useState<DashboardStat[]>([]);
  const [lowStock, setLowStock] = useState<LowStockItem[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrderSummary[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [reportSummary, setReportSummary] = useState<ReportSummary[]>([]);
  const [monthlySales, setMonthlySales] = useState<MonthlySalesData[]>([]);
  const [salesCategory, setSalesCategory] = useState<SalesCategory[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<AdminUser | null>(null);
  const [isDeleteAdminOpen, setIsDeleteAdminOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await import('@/data/mockData');
        setCustomers(data.CUSTOMERS_DATA); setOrders(data.ORDERS_DATA); setAdminUsers(data.ADMIN_USERS_DATA); setSettings(data.INITIAL_SETTINGS); setReviews(data.REVIEWS_DATA); setDashStats(data.DASHBOARD_STATS); setLowStock(data.LOW_STOCK_DATA); setRecentOrders(data.RECENT_ORDERS_SUMMARY); setDailyStats(data.DAILY_STATS); setReportSummary(data.REPORT_SUMMARY_DATA); setMonthlySales(data.MONTHLY_SALES_DATA); setSalesCategory(data.SALES_BY_CATEGORY); setTopProducts(data.TOP_PRODUCTS_DATA);
      } catch (error) { console.error("Error", error); } finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/all-products', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        
        const data = response.data;
        console.log('Fetched products data:', data);
        if (data.success && data.products) {
          setProducts(data.products);
          console.log('Products loaded successfully:', data.products.length);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        console.log('Failed to fetch products from backend. Make sure the server is running on port 8080.');
        // Fallback to mock data if API fails
        import('@/data/mockData').then((data) => {
          if (data.PRODUCTS_DATA) {
            setProducts(data.PRODUCTS_DATA);
          }
        });
      }
    };
    fetchProducts();
  }, []);

  const handleNavigation = (page: string) => { setActivePage(page); setSearchTerm(''); };

  // Handlers
  const handleAddProduct = () => { setEditingProduct(null); setIsProductModalOpen(true); };
  const handleEditProduct = (p: Product) => { setEditingProduct(p); setIsProductModalOpen(true); };
  const handleDeleteClick = (p: Product) => { setDeletingProduct(p); setIsDeleteModalOpen(true); };
  const handleProductSubmit = (data: Partial<Product>) => {
    if (!data) return;

    const submittedId = data._id || data.id;

    setProducts(prev => {
      if (submittedId) {
        const exists = prev.some(p => (p._id || p.id) === submittedId);
        if (exists) {
          return prev.map(p => (p._id || p.id) === submittedId ? { ...p, ...data } as Product : p);
        }
      }

      return [...prev, { ...data } as Product];
    });

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };
  const confirmDeleteProduct = async () => {
    if (deletingProduct) {
      try {
        const productId = deletingProduct._id || deletingProduct.id;
        if (!productId) {
          throw new Error('Product ID is not available');
        }
        await deleteProduct(String(productId));
        
        // Remove product from state after successful deletion
        setProducts(prev => prev.filter(p => (p._id || p.id) !== productId));
        setIsDeleteModalOpen(false);
        console.log('Product deleted successfully');
      } catch (error: unknown) {
        console.error('Error deleting product:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete product. Please try again.';
        alert(errorMessage);
      }
    }
  };

  const handleViewOrder = (order: Order) => { setSelectedOrder(order); setIsOrderModalOpen(true); };
  const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Packed') => { setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o)); };
  const handleAssignTracking = (order: Order) => { setTrackingOrder(order); setIsTrackingModalOpen(true); };
  const saveTrackingInfo = (orderId: string, trackingData: { carrier: string; number: string }) => { setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Shipped', tracking: { ...trackingData, url: '#' } } : o)); };
  
  const handleViewCustomer = (c: Customer) => { setSelectedCustomer(c); setIsCustomerModalOpen(true); };

  const handleAddAdmin = () => { setEditingAdmin(null); setIsAdminModalOpen(true); };
  const handleEditAdmin = (u: AdminUser) => { setEditingAdmin(u); setIsAdminModalOpen(true); };
  const handleDeleteAdminClick = (u: AdminUser) => { setDeletingAdmin(u); setIsDeleteAdminOpen(true); };
  const handleAdminSubmit = (data: Partial<AdminUser>) => {
    if (editingAdmin) setAdminUsers(prev => prev.map(u => u.id === editingAdmin.id ? { ...u, ...data } as AdminUser : u));
    else setAdminUsers(prev => [...prev, { id: adminUsers.length + 1, initial: data.name ? data.name.charAt(0).toUpperCase() : 'U', createdDate: new Date().toLocaleDateString(), lastLogin: 'Never', ...data } as AdminUser]);
    setIsAdminModalOpen(false);
  };
  const confirmDeleteAdmin = () => { if(deletingAdmin) { setAdminUsers(prev => prev.filter(u => u.id !== deletingAdmin.id)); setIsDeleteAdminOpen(false); } };

  const approveReview = (id: number) => setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  const rejectReview = (id: number) => setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  const deleteReview = (id: number) => setReviews(prev => prev.filter(r => r.id !== id));

  // Renderers
  const renderDashboardHome = () => (
    <div className="space-y-6"><StatsCards stats={dashStats} /><div className="grid grid-cols-1 lg:grid-cols-3 gap-5"><RecentOrders orders={recentOrders} /><LowStock items={lowStock} /></div><DailyStats stats={dailyStats} /></div>
  );

  const renderProducts = () => {
    const filtered = products.filter(p => 
      (p.productname || p.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3 justify-between"><div className="flex-1 max-w-md"><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search products..." /></div><button onClick={handleAddProduct} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white text-sm rounded-lg hover:shadow-lg transition-all font-light"><Plus className="w-4 h-4" /><span>Add New Product</span></button></div>
        <ProductTable products={filtered} onEdit={handleEditProduct} onDelete={handleDeleteClick} />
      </div>
    );
  };

  const renderOrders = () => {
    const filtered = orders.filter(o => {
      const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = orderFilter === 'All' || o.status === orderFilter;
      return matchesSearch && matchesFilter;
    });
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between"><div className="flex-1 w-full max-w-md"><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search orders..." /></div><div className="flex gap-3"><Dropdown value={orderFilter} onChange={setOrderFilter} options={['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled']} placeholder="All Orders" /></div></div>
        <OrderTable orders={filtered} onViewDetails={handleViewOrder} onUpdateStatus={handleUpdateStatus} onAssignTracking={handleAssignTracking} />
      </div>
    );
  };

  const renderCustomers = () => (
    <div className="space-y-6"><StatsGrid /><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search customers..." /><CustomerTable customers={customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))} onViewDetails={handleViewCustomer} /></div>
  );

  const renderReviews = () => {
    const filtered = reviews.filter(r => {
      const matchesSearch = r.productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = reviewFilter === 'All' || r.status === reviewFilter;
      return matchesSearch && matchesFilter;
    });
    return (
      <div className="space-y-6">
        <ReviewStats total={reviews.length} approved={reviews.filter(r => r.status === 'Approved').length} pending={reviews.filter(r => r.status === 'Pending').length} averageRating={4.5} />
        <div className="flex justify-between items-center"><div className="relative min-w-[180px]"><Dropdown value={reviewFilter} onChange={setReviewFilter} options={['All', 'Approved', 'Pending', 'Rejected']} placeholder="All Reviews" /></div></div>
        <div className="space-y-3">{filtered.map(r => <ReviewCard key={r.id} review={r} onApprove={approveReview} onReject={rejectReview} onDelete={deleteReview} />)}</div>
      </div>
    );
  };

  const renderReports = () => (
    <div className="space-y-6"><ReportSummaryCards data={reportSummary} /><div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100"><SalesChart data={monthlySales} /></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-5"><CategoryPieChart data={salesCategory} /><TopProductsList products={topProducts} /></div></div>
  );

  const renderAdminUsers = () => {
    const filtered = adminUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalUsers = adminUsers.length;
    const fullControlCount = adminUsers.filter(u => u.role === 'Full-Control Admin').length;
    const orderManagerCount = adminUsers.filter(u => u.role === 'Order-Management').length;
    return (
      <div className="space-y-6">
        <div className="flex justify-between"><div><h2 className="text-gray-900 font-semibold text-xl">Admin User Management</h2><p className="text-gray-600 text-sm font-light">Manage admin users</p></div></div>
        <AdminStatsGrid totalUsers={totalUsers} fullControlCount={fullControlCount} orderManagerCount={orderManagerCount} />
        <div className="flex flex-col sm:flex-row gap-3 justify-between"><div className="flex-1 max-w-md"><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search users..." /></div><button onClick={handleAddAdmin} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white text-sm rounded-lg hover:shadow-lg transition-all font-light"><Plus className="w-4 h-4" /><span>Add New Admin</span></button></div>
        <AdminUserTable users={filtered} onEdit={handleEditAdmin} onDelete={handleDeleteAdminClick} />
      </div>
    );
  };

  if (isLoading) return <div className="flex h-screen w-full items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-[#2e7d32] animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins',sans-serif]">
      <style jsx global>{` @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Arima:wght@400;500;600;700&display=swap'); body { font-family: 'Poppins', sans-serif; } `}</style>
      <Sidebar activePage={activePage} onNavigate={handleNavigation} isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header title={activePage.charAt(0).toUpperCase() + activePage.slice(1).replace('-', ' ')} subtitle={`Manage your ${activePage.replace('-', ' ')}`} />
        <div className="p-8">
          {activePage === 'dashboard' && renderDashboardHome()}
          {activePage === 'products' && renderProducts()}
          {activePage === 'orders' && renderOrders()}
          {activePage === 'customers' && renderCustomers()}
          {activePage === 'reviews' && renderReviews()}
          {activePage === 'reports' && renderReports()}
          {activePage === 'admin-users' && renderAdminUsers()}
          {activePage === 'settings' && settings && <SettingsView initialSettings={settings} />}
        </div>
      </main>

      {/* GLOBAL POPUPS / MODALS - Rendered OUTSIDE Main to prevent clipping */}
        {isProductModalOpen && <ProductFormModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} onSubmit={handleProductSubmit} initialData={editingProduct} />}
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} productName={deletingProduct?.name || ''} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeleteProduct} />
      <OrderDetailsModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} order={selectedOrder} />
      <AssignTrackingModal isOpen={isTrackingModalOpen} onClose={() => setIsTrackingModalOpen(false)} order={trackingOrder} onSubmit={saveTrackingInfo} />
      <CustomerDetailsModal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} customer={selectedCustomer} />
      {isAdminModalOpen && <AdminFormModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} onSubmit={handleAdminSubmit} initialData={editingAdmin} />}
      <DeleteAdminModal isOpen={isDeleteAdminOpen} adminName={deletingAdmin?.name || 'User'} role={deletingAdmin?.role || 'Admin'} onClose={() => setIsDeleteAdminOpen(false)} onConfirm={confirmDeleteAdmin} />
    </div>
  );
}
