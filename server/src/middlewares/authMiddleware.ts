import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModels";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Protect routes (auth middleware)
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin Only Middleware
export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
