import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@clerk/backend";
import User from "../models/userModels";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token using Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    const clerkId = payload.sub;

    // Look up MongoDB user by Clerk ID
    const user = await User.findOne({ clerkId });

    if (!user) {
      res.status(401).json({ message: "No user found for Clerk ID" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Clerk token verification failed:", error);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
