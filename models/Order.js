const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL"],
      required: true
    },
    qty: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [orderItemSchema],

    totalPrice: {
      type: Number,
      required: true
    },

    orderDate: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
