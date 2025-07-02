import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export const admin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};