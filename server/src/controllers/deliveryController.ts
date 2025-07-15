import { Request, Response } from "express";
import Order from "../models/orderModels";
import User from "../models/userModels";

// ✅ Assign a delivery worker to an order
export const assignDeliveryWorker = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, workerId } = req.body;

    const order = await Order.findById(orderId);
    const worker = await User.findById(workerId);

    if (!order || !worker || worker.role !== "worker") {
      res.status(400).json({ message: "Invalid order or worker" });
      return;
    }

    order.deliveryWorker = workerId;
    order.deliveryStatus = "in_progress";
    await order.save();

    res.status(200).json({ message: "Worker assigned", order });
  } catch (error) {
    console.error("Assign Delivery Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update delivery status
export const updateDeliveryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status, note } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    order.deliveryStatus = status;
    if (status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }
    if (note) order.note = note;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error("Update Delivery Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get deliveries assigned to logged-in worker
export const getMyDeliveries = async (req: Request, res: Response): Promise<void> => {
  try {

    // console.log("🔍 Worker requesting deliveries:", req.user?._id);

    const userId = req.user._id;
    const user = await User.findById(userId);
        if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isAdmin = user.role === "admin";
    const orders = await Order.find( isAdmin ? {} : { deliveryWorker: userId })
    .populate("user", "name email")
    .populate("deliveryWorker", "name");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Deliveries Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
