import { Request, Response } from "express";
import Product from "../models/productModels";

// Get all products (public)
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get single product by ID (public)
export const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Create a new product (admin only)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

// Update a product by ID (admin only)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete a product by ID (admin only)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
