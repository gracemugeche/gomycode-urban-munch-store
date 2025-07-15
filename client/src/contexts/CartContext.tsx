import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/cart";

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
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
  // ✅ Load from localStorage on first load
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.product === item.product);
      if (exists) {
        return prev.map((p) =>
          p.product === item.product
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, { ...item }];
    });
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

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
