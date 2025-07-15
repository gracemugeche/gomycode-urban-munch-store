import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type RoleType = "user" | "worker" | "admin";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: RoleType;
  isActive: boolean;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "worker", "admin"], default: "user" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
