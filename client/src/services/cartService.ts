import axios from "axios";
import type { CartItem } from "../types/cart";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/cart";

interface CartResponse {
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// Get cart
export const fetchCart = async (token: string): Promise<CartResponse> => {
  const res = await axios.get<CartResponse>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add to cart
export const addToCart = async (
  item: CartItem,
  token: string
): Promise<CartResponse> => {
  const res = await axios.post<CartResponse>(API_URL, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Set quantity
export const setItemQuantity = async (
  productId: string,
  quantity: number,
  token: string
): Promise<CartResponse> => {
  const res = await axios.patch<CartResponse>(
    `${API_URL}/${productId}`,
    { quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Remove item
export const removeFromCart = async (
  productId: string,
  token: string
): Promise<CartResponse> => {
  const res = await axios.delete<CartResponse>(`${API_URL}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
