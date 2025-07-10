import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController";
import { protect } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware"; 

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// Admin protected routes
router.post("/", protect, requireRole(["admin"]), createProduct);
router.put("/:id", protect, requireRole(["admin"]), updateProduct);
router.delete("/:id", protect, requireRole(["admin"]), deleteProduct);

export default router;
