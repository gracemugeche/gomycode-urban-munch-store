import { Request, Response } from "express";
import User, { RoleType } from "../models/userModels";
import Order from "../models/orderModels";

// ✅ Save or update Clerk user after login
export const saveClerkUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, firstName, lastName, email, imageUrl, role } = req.body;

  if (!email || !id) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const existingUser = await User.findOne({ clerkId: id });

    // ✅ Sanitize and validate role
    const safeRole = typeof role === "string" ? role.trim() : "user";
    const validRoles: RoleType[] = ["user", "worker", "admin"];

    if (!validRoles.includes(safeRole as RoleType)) {
      res.status(400).json({ message: `Invalid role: ${safeRole}` });
      return;
    }

    if (!existingUser) {
      const newUser = await User.create({
        name: `${firstName || ""} ${lastName || ""}`.trim(),
        email,
        clerkId: id,
        imageUrl,
        role: safeRole as RoleType,
      });

      res.status(201).json({ message: "User saved", user: newUser });
    } else {
      existingUser.name = `${firstName || ""} ${lastName || ""}`.trim();
      existingUser.email = email;
      existingUser.imageUrl = imageUrl;

      // Optionally update role if it changed
      if (existingUser.role !== safeRole) {
        existingUser.role = safeRole as RoleType;
      }

      await existingUser.save();

      console.log("✅ Existing user updated:", existingUser.role);
      res.status(200).json({ message: "User updated", user: existingUser });
    }
  } catch (err) {
    console.error("❌ Error saving Clerk user", err);
    res.status(500).json({ message: "Failed to save user" });
  }
};

// Admin-only route: Get all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-__v");
    res.status(200).json(users);
  } catch (err) {
    console.error("Failed to fetch users", err);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// Admin-only route: Get all users with order count
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

// Admin-only route: Update user role
export const updateUserRole = async (
  req: Request,
  res: Response
): Promise<void> => {
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

// Admin-only route: Toggle isActive
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

// Get MongoDB user by Clerk ID
export const getClerkUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { clerkId } = req.params;

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching Clerk user:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
