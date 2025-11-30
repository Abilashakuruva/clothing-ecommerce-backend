const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: ["S", "M", "L", "XL"],
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // so cart can work even when user NOT logged in
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
