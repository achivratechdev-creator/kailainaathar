import React, { useEffect, useRef, useState } from 'react';
import { X, Upload, SquarePen } from 'lucide-react';
import { Product } from '@/types';
import Dropdown from '@/components/ui/Dropdown'; 
import axios from "axios";
import { updateProduct } from '@/services/productService';

type ApiProductResponse = {
  success?: boolean;
  message?: string;
  product?: Product;
};
interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Partial<Product>) => void;
  initialData?: Product | null;
  onSuccess?: (product: unknown) => void;
}

// Updated interface to handle the new array fields and status
interface ProductFormData extends Partial<Omit<Product, 'images' | 'ingredients' | 'benifits'>> {
  images: string[];
  benefits: string;
  ingredients: string;
  status: string;
}

const DEFAULT_FORM_DATA: ProductFormData = {
  name: '',
  category: '',
  stock: 0,
  originalPrice: '',
  price: 0,
  description: '',
  benefits: '',
  ingredients: '',
  status: 'Active',
  
  images: [], 
};

const CATEGORIES = ['Health Mix','Lehiyam','Shampoo','Lip Balm','Hair Oil','Soap','Face Wash'];
const STATUS_OPTIONS = ['Active', 'Draft', 'Out of Stock'];

const mapProductToFormData = (product?: Product | null): ProductFormData => {
  if (!product) return { ...DEFAULT_FORM_DATA, images: [...DEFAULT_FORM_DATA.images] };

  const imageUrls = Array.isArray(product.images)
    ? product.images.map((img) => img.url).filter(Boolean)
    : product.image
      ? [product.image]
      : [];

  const benefitsFromProduct = Array.isArray(product.benifits)
    ? product.benifits.join('\n')
    : Array.isArray((product as unknown as { benefits?: string[] }).benefits)
      ? ((product as unknown as { benefits?: string[] }).benefits || []).join('\n')
      : (product as unknown as { benefits?: string }).benefits || '';

  const ingredientsFromProduct = Array.isArray(product.ingredients)
    ? product.ingredients.join(', ')
    : typeof product.ingredients === 'string'
      ? product.ingredients
      : '';

  return {
    ...DEFAULT_FORM_DATA,
    name: product.productname || product.name || '',
    description: product.description || '',
    price: product.offerprice ?? product.price ?? 0,
    originalPrice: product.originalprice?.toString() || product.originalPrice || '',
    category: product.category || '',
    stock: product.stockquantity ?? product.stock ?? 0,
    status: product.status || 'Active',
    benefits: benefitsFromProduct,
    ingredients: ingredientsFromProduct,
    images: imageUrls.length ? imageUrls : [...DEFAULT_FORM_DATA.images],
  };
};

export default function ProductFormModal({ isOpen, onClose, onSubmit, initialData, onSuccess }: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>(() => mapProductToFormData(initialData));

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(mapProductToFormData(initialData));
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;
  const isEditMode = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('productname', formData.name || '');
      formDataToSend.append('description', formData.description || '');

      const offerPriceValue = Number(formData.price) || 0;
      const originalPriceValue = Number(formData.originalPrice) || 0;
      formDataToSend.append('price', String(offerPriceValue));
      formDataToSend.append('originalprice', String(originalPriceValue));
      formDataToSend.append('offerprice', String(offerPriceValue));

      formDataToSend.append('category', formData.category || '');
      formDataToSend.append('stockquantity', String(formData.stock ?? 0));
      formDataToSend.append('status', formData.status || 'Active');

      const benefitsList = (formData.benefits || '').split('\n').map((b) => b.trim()).filter(Boolean);
      benefitsList.forEach((benefit) => formDataToSend.append('benefits', benefit));

      const ingredientsList = (formData.ingredients || '').split(',').map((i) => i.trim()).filter(Boolean);
      ingredientsList.forEach((ingredient) => formDataToSend.append('ingredients', ingredient));

      for (let idx = 0; idx < formData.images.length; idx += 1) {
        const imageData = formData.images[idx];
        if (imageData.startsWith('data:')) {
          const blob = await fetch(imageData).then((res) => res.blob());
          formDataToSend.append('images', blob, `image_${idx}_${Date.now()}.jpg`);
        } else if (imageData) {
          formDataToSend.append('existingImages', imageData);
        }
      }

      let responseData: ApiProductResponse | undefined;

      if (isEditMode) {
        const productId = initialData?._id || (initialData?.id ? String(initialData.id) : '');
        if (!productId) {
          throw new Error('Missing product id for update');
        }
        responseData = await updateProduct(productId, formDataToSend);
      } else {
        const response = await axios.post<ApiProductResponse>(
          'http://localhost:8080/products/new/add-product',
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        responseData = response.data;
      }

      const productPayload = responseData?.product || null;
      const fallbackPayload = initialData ? { ...initialData, ...formData } : formData;
      const payloadForParent = (productPayload as Product) || (fallbackPayload as unknown as Product);

      onSubmit(payloadForParent);
      onSuccess?.(payloadForParent);

      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save product';
      setError(errorMessage);
      console.error('Error submitting product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock handler for removing an image from the UI list
  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Handle file selection for adding new images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isReplace: boolean = false) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string;
          if (isReplace && editingImageIndex !== null) {
            // Replace specific image
            const newImages = [...formData.images];
            newImages[editingImageIndex] = imageData;
            setFormData({ ...formData, images: newImages });
            setEditingImageIndex(null);
          } else {
            // Add new image
            setFormData({ ...formData, images: [...formData.images, imageData] });
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
  };

  // Trigger file input for adding images
  const triggerFileInput = () => {
    setEditingImageIndex(null);
    fileInputRef.current?.click();
  };

  // Trigger file input for replacing images
  const triggerReplaceImage = (index: number) => {
    setEditingImageIndex(index);
    replaceFileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e, false)}
          className="hidden"
        />
        <input
          ref={replaceFileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, true)}
          className="hidden"
        />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-gray-800 font-['Poppins',sans-serif] font-semibold">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 font-['Poppins',sans-serif]">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Product Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light placeholder:text-gray-400"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Product Images Section (Matches Figma HTML) */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Product Images</label>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-3">
                {/* Existing Images Loop */}
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => triggerReplaceImage(index)}
                        className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                        title="Replace"
                      >
                        <SquarePen className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                        title="Remove"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add More Images Button */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-[#2e7d32] hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-[#2e7d32] font-['Poppins',sans-serif] font-light"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Add</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 font-['Poppins',sans-serif] font-light">
                Click to add image URLs. You can add multiple images for carousel display.
              </p>
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Category</label>
              <Dropdown
                value={formData.category || ''}
                onChange={(val) => setFormData({ ...formData, category: val })}
                options={CATEGORIES}
                placeholder="Select category"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Status</label>
              <Dropdown
                value={formData.status || 'Active'}
                onChange={(val) => setFormData({ ...formData, status: val })}
                options={STATUS_OPTIONS}
                placeholder="Select status"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Stock Quantity</label>
            <input
              type="number"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light placeholder:text-gray-400"
              placeholder="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Original Price (₹)</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light placeholder:text-gray-400"
                placeholder="0.00"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1 font-['Poppins',sans-serif] font-light">MRP (strikethrough)</p>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Offer Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light placeholder:text-gray-400"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
              <p className="text-xs text-gray-500 mt-1 font-['Poppins',sans-serif] font-light">Selling price</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Description</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light resize-none placeholder:text-gray-400 custom-scrollbar"
              placeholder="Enter product description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Benefits - NEW FIELD */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Benefits</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light resize-none placeholder:text-gray-400 custom-scrollbar"
              placeholder="Enter product benefits (one per line)&#10;Example:&#10;Improves digestion&#10;Boosts immunity"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1 font-['Poppins',sans-serif] font-light">Enter each benefit on a new line</p>
          </div>

          {/* Ingredients - NEW FIELD */}
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-['Poppins',sans-serif]">Ingredients</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e7d32] font-['Poppins',sans-serif] font-light resize-none placeholder:text-gray-400 custom-scrollbar"
              placeholder="Enter ingredients (comma-separated)&#10;Example: Turmeric, Ginger, Black Pepper"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1 font-['Poppins',sans-serif] font-light">Separate ingredients with commas</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-['Poppins',sans-serif] font-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white rounded-xl hover:shadow-lg transition-all duration-200 font-['Poppins',sans-serif] font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isEditMode ? 'Updating...' : 'Adding...'}</span>
                </>
              ) : (
                isEditMode ? 'Update Product' : 'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}