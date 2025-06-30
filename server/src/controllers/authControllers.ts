import { Request, Response } from "express";
import User, { IUser } from "../models/userModels";
import { generateToken } from "../utils/generateToken";

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
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const typedUser = user as IUser;
    const isMatch = await typedUser.matchPassword(password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    res.status(200).json({
      _id: typedUser._id,
      name: typedUser.name,
      email: typedUser.email,
      token: generateToken(typedUser._id.toString()),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore — req.user is added by auth middleware
  const user = req.user;

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};
