import React from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import { Product } from '@/types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

// FIX: Changed default align to 'left' and enforced text-left class
const TableHeaderCell = ({ label, align = "left" }: { label: string; align?: "left" | "right" }) => (
  <th className={`px-6 py-4 text-${align} text-xs font-medium text-gray-600 uppercase tracking-wider`}>
    {label}
  </th>
);

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <TableHeaderCell label="Product" />
              <TableHeaderCell label="Category" />
              <TableHeaderCell label="Price" />
              <TableHeaderCell label="Stock" />
              <TableHeaderCell label="Status" />
              <TableHeaderCell label="Actions" align="right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              // Support both old and new data structure
              const productName = product.productname || product.name || 'N/A';
              const productId = product._id || product.id;
              const productImage = product.images?.[0]?.url || product.image || '/api/placeholder/40/40';
              const productStock = product.stockquantity ?? product.stock ?? 0;
              const offerPrice = product.offerprice || 0;
              const originalPriceValue = product.originalprice || product.price || 0;
              
              return (
                <tr key={productId} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={productImage} 
                        alt={productName} 
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-200" 
                      />
                      <div>
                        <p className="text-sm text-gray-800 font-light">{productName}</p>
                        <p className="text-xs text-gray-500 font-light">ID: {productId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 font-light">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-800 font-light">₹{offerPrice}</span>
                      {originalPriceValue > offerPrice && (
                        <span className="text-xs text-gray-500 font-light line-through">₹{originalPriceValue}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-light ${productStock < 20 ? 'text-red-600' : 'text-gray-700'}`}>
                      {productStock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-light ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      product.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEdit(product)} 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(product)} 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}