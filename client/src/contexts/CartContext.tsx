import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/cart";
import {
  fetchCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  setItemQuantity as apiSetItemQuantity, 
} from "../services/cartService";
import { useUser, useAuth } from "@clerk/clerk-react";

// 🛒 Context type
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  increaseQuantity: (productId: string) => Promise<void>;
  decreaseQuantity: (productId: string) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const loadCart = useCallback(async () => {
    if (!isSignedIn) return;
    const token = await getToken();
    if (!token) return;
    try {
      const cart = await fetchCart(token);
      setCartItems(cart.items);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }, [isSignedIn, getToken]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addItem = async (item: CartItem) => {
    const token = await getToken();
    if (!token) return;
    const updatedCart = await apiAddToCart(item, token);
    setCartItems(updatedCart.items);
  };

  const removeItem = async (productId: string) => {
    const token = await getToken();
    if (!token) return;
    const updatedCart = await apiRemoveFromCart(productId, token);
    setCartItems(updatedCart.items);
  };

  const increaseQuantity = async (productId: string) => {
    const token = await getToken();
    if (!token) return;
    const item = cartItems.find((i) => i.product === productId);
    if (!item) return;
    const updatedCart = await apiSetItemQuantity(productId, item.quantity + 1, token);
    setCartItems(updatedCart.items);
  };

  const decreaseQuantity = async (productId: string) => {
    const token = await getToken();
    if (!token) return;
    const item = cartItems.find((i) => i.product === productId);
    if (!item || item.quantity <= 1) return;
    const updatedCart = await apiSetItemQuantity(productId, item.quantity - 1, token);
    setCartItems(updatedCart.items);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
