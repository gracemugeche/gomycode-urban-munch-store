import express from "express";
import { body } from "express-validator";
import {
  loginUser,
  registerUser,
  getMe,
} from "../controllers/authControllers";
import { protect } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

// User registration with validation
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  registerUser
);

router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
