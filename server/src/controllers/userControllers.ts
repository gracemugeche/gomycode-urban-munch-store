import { Request, Response } from "express";
import User, { RoleType } from "../models/userModels";
import Order from "../models/orderModels";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-__v -password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Failed to fetch users", err);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

export const getAllUsersWithStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().lean();
    const userIds = users.map((u) => u._id);

    const orders = await Order.aggregate([
      { $match: { user: { $in: userIds }, isPaid: true } },
      { $group: { _id: "$user", count: { $sum: 1 } } },
    ]);

    const orderMap: Record<string, number> = {};
    orders.forEach((o) => (orderMap[o._id.toString()] = o.count));

    const enriched = users.map((u) => ({
      ...u,
      orderCount: orderMap[u._id.toString()] || 0,
    }));

    res.status(200).json(enriched);
  } catch (err) {
    console.error("Failed to fetch users with stats", err);
    res.status(500).json({ message: "Error fetching user stats" });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const { userId, role } = req.body;

  if (!["user", "admin", "worker"].includes(role)) {
    res.status(400).json({ message: "Invalid role" });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.role = role as RoleType;
    await user.save();

    res.status(200).json({ message: "User role updated", user });
  } catch (err) {
    console.error("Error updating user role", err);
    res.status(500).json({ message: "Failed to update role" });
  }
};

export const toggleUserStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${user.isActive ? "enabled" : "disabled"}`,
      isActive: user.isActive,
    });
  } catch (err) {
    console.error("Error toggling user status", err);
    res.status(500).json({ message: "Failed to toggle user status" });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching current user", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { name, phone, address } = req.body;
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error updating user", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};



