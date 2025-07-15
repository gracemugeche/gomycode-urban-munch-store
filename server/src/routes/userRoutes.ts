import express from "express";
import {
  getAllUsers,
  getAllUsersWithStats,
  updateUserRole,
  toggleUserStatus,
  getMe,
  updateMe,
} from "../controllers/userControllers";
import {
  getMyOrders,
} from "../controllers/orderController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = express.Router();

// ✅ User self info route
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.get("/my-orders", protect, getMyOrders);


// ✅ Admin-only routes
router.get("/", protect, adminOnly, getAllUsers);
router.get("/stats", protect, adminOnly, getAllUsersWithStats);
router.patch("/role", protect, adminOnly, updateUserRole);
router.patch("/status/:userId", protect, adminOnly, toggleUserStatus);

export default router;
