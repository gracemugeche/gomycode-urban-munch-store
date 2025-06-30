// src/utils/generateToken.ts

import jwt from "jsonwebtoken";

/**
 * Generates a JWT token with the given user ID.
 * @param id - The MongoDB _id of the user.
 * @returns A signed JWT token string.
 */
export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign({ id }, secret, {
    expiresIn: "30d", 
  });
};
