const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      // enum: ["Men", "Women", "Kids"]
      enum: [
  "T-Shirts",
  "Hoodies",
  "Jeans",
  "Dresses",
  "Jackets",
  "Shirts","Pants","Shorts",
  "Sweatshirts","Ethnic","Trousers","Tops"
]
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL"],   // only valid sizes allowed
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
