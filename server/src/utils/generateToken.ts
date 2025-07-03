import jwt from "jsonwebtoken";

export const generateToken = (id: string, isAdmin: boolean): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not defined");

  return jwt.sign({ id, isAdmin }, secret, {
    expiresIn: "30d",
  });
};
