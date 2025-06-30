import { Request, Response } from "express";
import User, { IUser } from "../models/userModels";
import { generateToken } from "../utils/generateToken";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Log in a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Type assertion to fix _id unknown issue
    const typedUser = user as IUser;

    const isMatch = await typedUser.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      _id: typedUser._id,
      name: typedUser.name,
      email: typedUser.email,
      token: generateToken(typedUser._id.toString()),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};
