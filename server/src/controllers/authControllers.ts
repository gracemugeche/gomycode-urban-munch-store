import { Request, Response } from "express";
import User, { IUser } from "../models/userModels";
import { generateToken } from "../utils/generateToken";

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      token: generateToken(String(user._id), user.isAdmin),
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    res.status(200).json({
      token: generateToken(String(user._id), user.isAdmin),
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get current logged-in user
export const getMe = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as IUser;

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    _id: String(user._id),
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};
