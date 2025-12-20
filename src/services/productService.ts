import axios, { AxiosError } from 'axios';
import { Product } from '@/types';

const API_BASE_URL = 'http://localhost:8080';

type ApiProductResponse = {
  success?: boolean;
  message?: string;
  product?: Product;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return ((error as AxiosError<{ message?: string }>).response?.data?.message) || fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

export const deleteProduct = async (productId: string): Promise<ApiProductResponse> => {
  try {
    const response = await axios.delete<ApiProductResponse>(`${API_BASE_URL}/products/delete/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.data?.success === false) {
      throw new Error(response.data.message || 'Failed to delete product');
    }

    return response.data;
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    throw new Error(getErrorMessage(error, 'Failed to delete product'));
  }
};

export const updateProduct = async (productId: string, payload: FormData): Promise<ApiProductResponse> => {
  try {
    const response = await axios.put<ApiProductResponse>(`${API_BASE_URL}/products/update/${productId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    if (response.data?.success === false) {
      throw new Error(response.data.message || 'Failed to update product');
    }

    return response.data;
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    throw new Error(getErrorMessage(error, 'Failed to update product'));
  }
};
