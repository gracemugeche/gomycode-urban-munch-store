import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type RoleType = "user" | "worker" | "admin";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  clerkId: string;
  role: RoleType;
  imageUrl?: string;
  isActive: boolean;
  phone?: string;
  createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    clerkId: { type: String, required: true, unique: true }, // Clerk ID from Clerk
    role: { type: String, enum: ["user", "worker", "admin"], default: "user" },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
