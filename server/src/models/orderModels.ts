import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: IOrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    phone: string;
  };
  paymentMethod: "cod" | "stripe";
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  currency: "USD" | "KES";
  status: "pending" | "processing" | "delivered" | "cancelled";
  deliveryWorker?: mongoose.Types.ObjectId;
  deliveryStatus?: "pending" | "in_progress" | "delivered" | "failed";
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "stripe"],
      default: "cod",
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },

    currency: {
      type: String,
      enum: ["USD", "KES"],
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancelled"],
      default: "pending",
    },

    //  Delivery assignment
    deliveryWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "in_progress", "delivered", "failed"],
      default: "pending",
    },

    // delivery 
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
