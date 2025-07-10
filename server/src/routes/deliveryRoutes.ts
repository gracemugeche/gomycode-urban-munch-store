import express from "express";
import {
  assignDeliveryWorker,
  updateDeliveryStatus,
  getMyDeliveries,
} from "../controllers/deliveryController";
import { protect } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/assign", protect, requireRole(["admin"]), assignDeliveryWorker);
router.put("/:orderId/status", protect, requireRole(["worker", "admin"]), updateDeliveryStatus);
router.get("/mine", protect, requireRole(["worker" , "admin"]), getMyDeliveries);

export default router;
