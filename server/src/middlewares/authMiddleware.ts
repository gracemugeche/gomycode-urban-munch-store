import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "@clerk/clerk-sdk-node";
import User from "../models/userModels";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

interface ClerkJwtPayload {
  sub: string;
  email?: string;
  role?: string;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // ✅ Correct Clerk issuer and public key
    const payload = await verifyJwt(token, {
      issuer: "https://modern-fox-18.clerk.accounts.dev",
      key: process.env.CLERK_JWT_KEY!,
    });

    const { sub: clerkId } = payload as ClerkJwtPayload;

    if (!clerkId) {
      res.status(401).json({ message: "Clerk ID missing from token" });
      return;
    }

    const user = await User.findOne({ clerkId: clerkId.trim() });

    if (!user) {
      res.status(401).json({ message: "No user found for Clerk ID" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Clerk token verification failed:", error);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
