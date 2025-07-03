import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController";
import { protect } from "../middlewares/authMiddleware";
import { admin } from "../middlewares/adminMiddleware"; // ✅ you're already using this

const router = express.Router();

// Public
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Admin protected
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
