import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";
import { IUser } from "../models/userModels";

// Allow only users with one of the specified roles
export const requireRole = (roles: ("admin" | "worker" | "user")[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const user = req.user as IUser;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Access denied. Insufficient permissions." });
      return;
    }

    next();
  };
};
