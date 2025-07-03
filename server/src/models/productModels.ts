import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: ["groceries", "meals", "drinks"], // ✅ limit to specific categories
  },

  inStock: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Product", productSchema);
