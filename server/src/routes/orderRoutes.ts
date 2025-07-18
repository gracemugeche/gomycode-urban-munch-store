import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getFinanceSummary,
} from "../controllers/orderController";

import { protect } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";
import { adminOnly } from "../middlewares/authMiddleware";


const router = express.Router();

// Routes for logged-in users
router.post("/", protect, createOrder);               // Place new order
router.get("/my-orders", protect, getMyOrders);        // Get user's own orders

//  Admin-only routes
router.get("/finance/summary", protect, requireRole(["admin"]), getFinanceSummary);
router.get("/", protect, requireRole(["admin"]), getOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, requireRole(["admin"]), updateOrderStatus);
router.delete("/:id", protect, requireRole(["admin"]), deleteOrder);



export default router;
