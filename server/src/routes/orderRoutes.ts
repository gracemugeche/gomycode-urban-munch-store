import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController";

import { protect } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const router = express.Router();

// 🔐 Routes for logged-in users
router.post("/", protect, createOrder);               // Place new order
router.get("/my-orders", protect, getMyOrders);        // Get user's own orders

// 🔐 Admin-only routes
router.get("/", protect, requireRole(["admin"]), getOrders);           // View all orders
router.get("/:id", protect, getOrderById);                             // View order by ID (admin or owner)
router.put("/:id", protect, requireRole(["admin"]), updateOrderStatus); // Update order (paid/delivered)
router.delete("/:id", protect, requireRole(["admin"]), deleteOrder);   // Delete order

export default router;
