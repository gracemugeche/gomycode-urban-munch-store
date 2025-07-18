import axios from "axios";
import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/products";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

// Fetch single product
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

// Create a new product
export const createProduct = async (
  data: Partial<Product>,
  token: string
): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// DELETE product
export const deleteProduct = async (
  id: string,
  token: string
): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// UPDATE product
export const updateProduct = async (
  id: string,
  data: Partial<Product>,
  token: string
): Promise<Product> => {
  const response = await axios.put<Product>(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
