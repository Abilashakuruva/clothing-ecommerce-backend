// seedProducts.js
const mongoose = require("mongoose");
const Product = require("./models/Product"); // adjust path if needed
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch(err => console.log(err));

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton regular fit T-shirt for daily wear.",
    price: 499,
    image: "/images/tshirt2.jpg",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    stock: 50
  },
  {
    name: "Black Graphic T-Shirt",
    description: "Trendy graphic tee with premium cotton.",
    price: 699,
    image: "/images/tshirt2.jpg",
    category: "T-Shirts",
    sizes: ["M", "L", "XL"],
    stock: 40
  },
  {
    name: "Oversized Cotton Hoodie",
    description: "Warm oversized hoodie for winter comfort.",
    price: 1499,
    image: "/images/hoodie3.jpg",
    category: "Hoodies",
    sizes: ["M", "L", "XL"],
    stock: 30
  },
  {
    name: "Basic Grey Hoodie",
    description: "Minimal style hoodie with brushed fleece fabric.",
    price: 1299,
    image: "/images/hoodie4.jpg",
    category: "Hoodies",
    sizes: ["S", "M", "L"],
    stock: 25
  },
  {
    name: "Slim Fit Blue Jeans",
    description: "Stretchable denim jeans for everyday style.",
    price: 1599,
    image: "/images/jeans3.jpg",
    category: "Jeans",
    sizes: ["S", "M", "L", "XL"],
    stock: 45
  },
  {
    name: "Black Skinny Jeans",
    description: "High-rise black denim skinny fit.",
    price: 1699,
    image: "/images/jeans2.jpg",
    category: "Jeans",
    sizes: ["M", "L"],
    stock: 35
  },
  {
    name: "Summer Floral Dress",
    description: "Lightweight floral print dress perfect for outing.",
    price: 1299,
    image: "/images/dress1.jpg",
    category: "Dresses",
    sizes: ["S", "M", "L"],
    stock: 20
  },
  {
    name: "Black Bodycon Dress",
    description: "Elegant bodycon dress with stretchable fabric.",
    price: 1499,
    image: "/images/dress5.jpg",
    category: "Dresses",
    sizes: ["S", "M"],
    stock: 20
  },
  {
    name: "Leather Biker Jacket",
    description: "Premium PU leather biker jacket.",
    price: 2499,
    image: "/images/jacket1.jpg",
    category: "Jackets",
    sizes: ["M", "L", "XL"],
    stock: 15
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket with perfect fit.",
    price: 1999,
    image: "/images/jacket5.jpg",
    category: "Jackets",
    sizes: ["S", "M", "L"],
    stock: 18
  },
  {
    name: "Casual Checked Shirt",
    description: "Cotton checked shirt for regular outings.",
    price: 899,
    image: "/images/shirt1.jpg",
    category: "Shirts",
    sizes: ["M", "L", "XL"],
    stock: 50
  },
  {
    name: "White Formal Shirt",
    description: "Perfect white shirt suitable for office wear.",
    price: 999,
    image: "/images/shirt6.jpg",
    category: "Shirts",
    sizes: ["S", "M", "L"],
    stock: 35
  },
  {
    name: "Cargo Jogger Pants",
    description: "Comfortable joggers with cargo pockets.",
    price: 1199,
    image: "/images/joggers1.jpg",
    category: "Pants",
    sizes: ["M", "L", "XL"],
    stock: 25
  },
  {
    name: "Cotton Sweatpants",
    description: "Soft fleece sweatpants for daily comfort.",
    price: 999,
    image: "/images/joggers4.jpg",
    category: "Pants",
    sizes: ["S", "M", "L"],
    stock: 20
  },
  {
    name: "Men’s Sports Shorts",
    description: "Quick-dry shorts for gym and sports.",
    price: 599,
    image: "/images/shorts3.jpg",
    category: "Shorts",
    sizes: ["M", "L", "XL"],
    stock: 35
  },
  {
    name: "Women’s Cycling Shorts",
    description: "High-waist stretch shorts for comfort.",
    price: 499,
    image: "/images/shorts5.jpg",
    category: "Shorts",
    sizes: ["S", "M", "L"],
    stock: 30
  },
  {
    name: "Winter Sweatshirt",
    description: "Cozy sweatshirt with soft fleece lining.",
    price: 1199,
    image: "/images/sweatshirt3.jpg",
    category: "Sweatshirts",
    sizes: ["M", "L", "XL"],
    stock: 28
  },
  {
    name: "Oversized Black Sweatshirt",
    description: "Trendy oversized drop-shoulder sweatshirt.",
    price: 1399,
    image: "/images/sweatshirt5.jpg",
    category: "Sweatshirts",
    sizes: ["S", "M", "L"],
    stock: 22
  },
  {
    name: "Printed Kurti",
    description: "Indian ethnic wear with premium cotton fabric.",
    price: 799,
    image: "/images/kurti3.jpg",
    category: "Ethnic",
    sizes: ["S", "M", "L", "XL"],
    stock: 40
  },
  {
    name: "Anarkali Kurti",
    description: "Long flare Anarkali kurti for festive wear.",
    price: 1299,
    image: "/images/kurti4.jpg",
    category: "Ethnic",
    sizes: ["M", "L"],
    stock: 25
  },
  {
    name: "Men’s Formal Trousers",
    description: "Slim-fit trousers ideal for office wear.",
    price: 1299,
    image: "/images/trouser3.jpg",
    category: "Trousers",
    sizes: ["M", "L", "XL"],
    stock: 30
  },
  {
    name: "Women’s Palazzo Pants",
    description: "High waist flowy palazzos.",
    price: 799,
    image: "/images/trouser2.jpg",
    category: "Trousers",
    sizes: ["S", "M", "L"],
    stock: 35
  },
  {
    name: "Striped Polo T-shirt",
    description: "Soft cotton striped polo with collar.",
    price: 899,
    image: "/images/polo1.jpg",
    category: "T-Shirts",
    sizes: ["M", "L", "XL"],
    stock: 28
  },
  {
    name: "Black Sleeveless Top",
    description: "Smooth stretchable top perfect for summer.",
    price: 499,
    image: "/images/top2.jpg",
    category: "Tops",
    sizes: ["S", "M"],
    stock: 20
  }
];

// Seed Function
async function seed() {
  try {
    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("Products Seeded Successfully!");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
