import express from "express";
import {
  saveClerkUser,
  getAllUsers,
  getAllUsersWithStats,
  updateUserRole,
  toggleUserStatus,
  getClerkUserById,
} from "../controllers/userControllers";

import { protect } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const router = express.Router();

// ✅ Public: Save or update Clerk user after login
router.post("/clerk", saveClerkUser);

// ✅ Public: Get MongoDB user by Clerk ID
router.get("/clerk/:clerkId", getClerkUserById);

// ✅ Admin: Get all users (basic)
router.get("/", protect, requireRole(["admin"]), getAllUsers);

// ✅ Admin: Get users + stats (order count)
router.get("/stats", protect, requireRole(["admin"]), getAllUsersWithStats);

// ✅ Admin: Update user role
router.put("/update-role", protect, requireRole(["admin"]), updateUserRole);

// ✅ Admin: Enable/Disable user
router.put("/:userId/status", protect, requireRole(["admin"]), toggleUserStatus);

export default router;
