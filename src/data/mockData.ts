import { 
  Customer, Order, Product, AdminUser, SettingsState, Review, 
  DashboardStat, LowStockItem, RecentOrderSummary, DailyStat,
  ReportSummary, MonthlySalesData, SalesCategory, TopProduct
} from '@/types';

// --- DASHBOARD HOME DATA ---
export const DASHBOARD_STATS: DashboardStat[] = [
  { title: 'Total Revenue', value: '₹2,45,680', change: '+12.5%', isPositive: true, iconName: 'dollar', color: 'green' },
  { title: 'Total Orders', value: '1,247', change: '+8.2%', isPositive: true, iconName: 'cart', color: 'blue' },
  { title: 'Active Products', value: '156', change: '+5', isPositive: true, iconName: 'package', color: 'purple' },
  { title: 'Total Customers', value: '892', change: '-2.3%', isPositive: false, iconName: 'users', color: 'orange' },
];

export const LOW_STOCK_DATA: LowStockItem[] = [
  { name: 'Ashwagandha Powder', currentStock: 12, minStock: 20, percentage: 60 },
  { name: 'Triphala Churnam', currentStock: 8, minStock: 15, percentage: 53 },
  { name: 'Neem Capsules', currentStock: 5, minStock: 10, percentage: 50 },
  { name: 'Brahmi Oil', currentStock: 15, minStock: 25, percentage: 60 },
];

export const RECENT_ORDERS_SUMMARY: RecentOrderSummary[] = [
  { id: '#ORD-1247', customer: 'Rajesh Kumar', product: 'Ashwagandha Powder', amount: '₹450', status: 'Pending' },
  { id: '#ORD-1246', customer: 'Priya Sharma', product: 'Triphala Churnam', amount: '₹320', status: 'Shipped' },
  { id: '#ORD-1245', customer: 'Arun Patel', product: 'Neem Capsules', amount: '₹580', status: 'Delivered' },
  { id: '#ORD-1244', customer: 'Lakshmi Reddy', product: 'Brahmi Oil', amount: '₹280', status: 'Packed' },
  { id: '#ORD-1243', customer: 'Vijay Singh', product: 'Tulsi Drops', amount: '₹150', status: 'Pending' },
];

export const DAILY_STATS: DailyStat[] = [
  { title: "Today's Sales", value: '₹12,450', subtext: 'From 42 orders', color: 'green', iconName: 'trending' },
  { title: 'Pending Orders', value: '28', subtext: 'Need immediate attention', color: 'blue', iconName: 'cart' },
  { title: 'New Customers', value: '15', subtext: 'This week', color: 'purple', iconName: 'users' },
];

// --- PRODUCTS DATA (Extended) ---
export const PRODUCTS_DATA: Product[] = [
  { 
    id: 1, 
    name: 'Neelibringadi Kera Thailam', 
    category: 'Herbal Oils', 
    price: '790', 
    originalPrice: '3446',
    stock: 160,
    stockStatus: '160 units',
    status: 'Active',
    image: '/api/placeholder/40/40',
    description: 'A traditional Ayurvedic hair oil for promoting hair growth and preventing hair fall.',
    benefits: 'Promotes hair growth\nPrevents premature greying\nCooling effect on head',
    ingredients: 'Neeli, Bringaraja, Amla, Coconut Oil'
  },
  { 
    id: 2, 
    name: 'Triphala Choornam', 
    category: 'Powders', 
    price: '180',
    originalPrice: '250',
    stock: 43,
    stockStatus: '43 units',
    status: 'Active',
    image: '/api/placeholder/40/40',
    description: 'A powerful antioxidant and digestive aid.',
    benefits: 'Improves digestion\nDetoxifies body\nBoosts immunity',
    ingredients: 'Amla, Haritaki, Bibhitaki'
  },
  { 
    id: 3, 
    name: 'Ashwagandha Tablets', 
    category: 'Medicines', 
    price: '320', 
    originalPrice: '400',
    stock: 27,
    stockStatus: '27 units',
    status: 'Active',
    image: '/api/placeholder/40/40',
    description: 'Stress relief and vitality supplement.',
    benefits: 'Reduces stress\nIncreases energy\nImproves focus',
    ingredients: 'Ashwagandha root extract'
  },
  { 
    id: 4, 
    name: 'Sukku Kaapi Powder', 
    category: 'Powders', 
    price: '220', 
    originalPrice: '280',
    stock: 104,
    stockStatus: '104 units',
    status: 'Active',
    image: '/api/placeholder/40/40',
    description: 'Traditional dry ginger coffee powder.',
    benefits: 'Relieves cold and cough\nAids digestion\nRefreshing drink',
    ingredients: 'Dry Ginger, Coriander, Black Pepper'
  },
  { 
    id: 5, 
    name: 'Kumkumadi Thailam', 
    category: 'Herbal Oils', 
    price: '580', 
    originalPrice: '750',
    stock: 37,
    stockStatus: '37 units',
    status: 'Active',
    image: '/api/placeholder/40/40',
    description: 'Miraculous beauty fluid for skin brightening.',
    benefits: 'Improves skin complexion\nReduces dark circles\nTreats acne marks',
    ingredients: 'Saffron, Sandalwood, Lotus pollen'
  },
  { 
    id: 6, 
    name: 'Chyawanprash', 
    category: 'Medicines', 
    price: '380', 
    originalPrice: '450',
    stock: 45,
    stockStatus: '45 units',
    status: 'Active',
    image: '/api/placeholder/40/40',
    description: 'Immunity boosting herbal jam.',
    benefits: 'Boosts immunity\nImproves digestion\nIncreases strength',
    ingredients: 'Amla, Ghee, Sugar, Honey, Spices'
  },
];

// --- CUSTOMERS DATA ---
// ... other mock data

export const CUSTOMERS_DATA: Customer[] = [
  { 
    id: 1, 
    name: 'Rajesh Kumar', 
    email: 'rajesh@example.com', 
    phone: '+91 98765 43210', 
    orders: 12, 
    spent: '₹5,400', 
    joinDate: '2024-01-15', 
    status: 'Active',
    address: '123, MG Road, Bangalore, Karnataka - 560001'
  },
  { 
    id: 2, 
    name: 'Priya Sharma', 
    email: 'priya@example.com', 
    phone: '+91 98765 43211', 
    orders: 8, 
    spent: '₹3,200', 
    joinDate: '2024-02-20', 
    status: 'Active',
    address: 'Flat 4B, Ocean View Apts, Chennai, TN - 600028'
  },
  // ... other customers (add generic addresses if needed)
  { id: 3, name: 'Arun Patel', email: 'arun@example.com', phone: '+91 98765 43212', orders: 15, spent: '₹7,800', joinDate: '2023-11-10', status: 'Active', address: '45, Civil Lines, Jaipur, RJ - 302006' },
  { id: 4, name: 'Lakshmi Reddy', email: 'lakshmi@example.com', phone: '+91 98765 43213', orders: 5, spent: '₹2,100', joinDate: '2024-05-08', status: 'Active', address: 'Plot 88, Jubilee Hills, Hyderabad, TS - 500033' },
  { id: 5, name: 'Vijay Singh', email: 'vijay@example.com', phone: '+91 98765 43214', orders: 3, spent: '₹900', joinDate: '2024-07-12', status: 'Inactive', address: 'Sector 17, Chandigarh - 160017' },
];
// --- ORDERS DATA ---
export const ORDERS_DATA: Order[] = [
  { id: '#ORD-1247', customerName: 'Rajesh Kumar', customerEmail: 'rajesh@example.com', date: '2024-11-25', total: '₹900', status: 'Pending' },
  { id: '#ORD-1246', customerName: 'Priya Sharma', customerEmail: 'priya@example.com', date: '2024-11-24', total: '₹320', status: 'Shipped', tracking: { carrier: 'BlueDart', number: 'BD123456789', url: '#' } },
  { id: '#ORD-1245', customerName: 'Arun Patel', customerEmail: 'arun@example.com', date: '2024-11-22', total: '₹1740', status: 'Shipped', tracking: { carrier: 'Delhivery', number: 'DL987654321', url: '#' } },
  { id: '#ORD-1244', customerName: 'Lakshmi Reddy', customerEmail: 'lakshmi@example.com', date: '2024-11-25', total: '₹280', status: 'Pending' },
  { id: '#ORD-1243', customerName: 'Vijay Singh', customerEmail: 'vijay@example.com', date: '2024-11-25', total: '₹300', status: 'Pending' },
];

// --- ADMIN USERS DATA ---
export const ADMIN_USERS_DATA: AdminUser[] = [
  { id: 1, name: 'Main Administrator', email: 'admin@siddhaclinic.com', role: 'Main Administrator', initial: 'M', createdDate: 'Jan 1, 2024', lastLogin: '2 hours ago', status: 'Active' },
  { id: 2, name: 'Ramesh Kumar', email: 'ramesh@siddhaclinic.com', role: 'Order-Management', initial: 'R', createdDate: 'Feb 15, 2024', lastLogin: '1 day ago', status: 'Active' },
  { id: 3, name: 'Priya Sharma', email: 'priya@siddhaclinic.com', role: 'Full-Control Admin', initial: 'P', createdDate: 'Mar 10, 2024', lastLogin: '3 hours ago', status: 'Active' },
];

// --- REVIEWS DATA ---
export const REVIEWS_DATA: Review[] = [
  { id: 1, productName: 'Ashwagandha Powder', userName: 'Rajesh Kumar', date: '2024-11-20', rating: 5, comment: 'Excellent quality! Noticed significant improvement in my energy levels within 2 weeks.', status: 'Approved' },
  { id: 2, productName: 'Triphala Churnam', userName: 'Priya Sharma', date: '2024-11-22', rating: 4, comment: 'Good product but takes time to show results. Packaging could be better.', status: 'Rejected' },
  { id: 3, productName: 'Neem Capsules', userName: 'Arun Patel', date: '2024-11-24', rating: 5, comment: 'Amazing for skin health! Highly recommend this product.', status: 'Approved' },
  { id: 4, productName: 'Brahmi Oil', userName: 'Lakshmi Reddy', date: '2024-11-25', rating: 3, comment: 'Average product. Expected better quality for the price.', status: 'Pending' }
];

// --- REPORTS DATA ---
export const REPORT_SUMMARY_DATA: ReportSummary[] = [
  { title: 'Total Revenue', value: '₹7,73,000', change: '12.5%', isPositive: true, icon: 'dollar', color: 'green' },
  { title: 'Total Orders', value: '2,210', change: '8.2%', isPositive: true, icon: 'package', color: 'blue' },
  { title: 'Avg Order Value', value: '₹350', change: '3.8%', isPositive: true, icon: 'trending', color: 'purple' },
  { title: 'New Customers', value: '342', change: '15.3%', isPositive: true, icon: 'users', color: 'orange' },
];

export const MONTHLY_SALES_DATA: MonthlySalesData[] = [
  { month: 'Jan', sales: 30000, orders: 120 },
  { month: 'Feb', sales: 45000, orders: 180 },
  { month: 'Mar', sales: 48000, orders: 135 },
  { month: 'Apr', sales: 60000, orders: 190 },
  { month: 'May', sales: 55000, orders: 150 },
  { month: 'Jun', sales: 75000, orders: 220 },
  { month: 'Jul', sales: 82000, orders: 240 },
  { month: 'Aug', sales: 68000, orders: 200 },
  { month: 'Sep', sales: 90000, orders: 280 },
  { month: 'Oct', sales: 95000, orders: 300 },
  { month: 'Nov', sales: 88000, orders: 270 },
  { month: 'Dec', sales: 110000, orders: 350 },
];

export const SALES_BY_CATEGORY: SalesCategory[] = [
  { name: 'Herbal Powders', value: 35, color: '#2e7d32' },
  { name: 'Oils & Ghee', value: 25, color: '#66bb6a' },
  { name: 'Churnam', value: 20, color: '#81c784' },
  { name: 'Capsules', value: 15, color: '#a5d6a7' },
  { name: 'Others', value: 5, color: '#c8e6c9' },
];

export const TOP_PRODUCTS_DATA: TopProduct[] = [
  { name: 'Ashwagandha Powder', unitsSold: 156, revenue: '₹70,200', popularity: 100 },
  { name: 'Triphala Churnam', unitsSold: 142, revenue: '₹45,440', popularity: 91 },
  { name: 'Neem Capsules', unitsSold: 128, revenue: '₹74,240', popularity: 82 },
  { name: 'Brahmi Oil', unitsSold: 98, revenue: '₹27,440', popularity: 62 },
  { name: 'Tulsi Drops', unitsSold: 87, revenue: '₹13,050', popularity: 55 },
];

// --- SETTINGS DATA ---
export const INITIAL_SETTINGS: SettingsState = {
  general: {
    storeName: 'Thiru Kailainaadhar Siddha Clinic',
    storeEmail: 'info@siddhaclinic.com',
    storePhone: '+91 98765 43210',
    storeAddress: '123 Main Street, Chennai, Tamil Nadu - 600001',
  },
  shipping: {
    freeShippingAbove: 1000,
    standardShipping: 50,
    estimatedDelivery: '5-7 days',
  },
  payment: {
    cod: true,
    upi: true,
    card: true,
    netBanking: false,
  },
  email: {
    orderConfirmation: true,
    shippingUpdate: true,
    deliveryConfirmation: true,
    lowStockAlert: true,
  },
  tax: {
    gstNumber: '29XXXXX1234X1ZX',
    taxRate: 18,
    includeTax: true,
  },
};