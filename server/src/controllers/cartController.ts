import { Request, Response } from "express";
import Cart from "../models/cartModels";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { ICartItem } from "../types/cart";

// Get user's cart
export const getCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    // Create empty cart
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add or update item in cart
export const addToCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const item: ICartItem = req.body;
    const { product, name, price, quantity, image } = item;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [item] });
    } else {
      const existingItem = cart.items.find(
        (i) => i.product.toString() === product
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push(item);
      }
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Set item quantity directly
export const setItemQuantity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) {
      res.status(404).json({ message: "Item not found in cart" });
      return;
    }

    item.quantity = quantity;

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error("Set item quantity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
export const removeFromCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.productId;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.set(
      "items",
      cart.items.filter((item) => item.product.toString() !== productId)
    );
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear entire cart
export const clearCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.set("items", []);
    await cart.save();
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
