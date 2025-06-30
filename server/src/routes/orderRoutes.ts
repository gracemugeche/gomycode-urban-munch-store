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
import { admin } from "../middlewares/adminMiddleware";

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order (any logged-in user)
router.post("/", protect, createOrder);

// @route   GET /api/orders
// @desc    Get all orders (admin only)
router.get("/", protect, admin, getOrders);

// @route   GET /api/orders/myorders
// @desc    Get logged-in user's own orders
router.get("/myorders", protect, getMyOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID (user or admin)
router.get("/:id", protect, getOrderById);

// @route   PUT /api/orders/:id
// @desc    Update order payment/delivery status (admin only)
router.put("/:id", protect, admin, updateOrderStatus);

// @route   DELETE /api/orders/:id
// @desc    Delete an order (admin only)
router.delete("/:id", protect, admin, deleteOrder);

export default router;
