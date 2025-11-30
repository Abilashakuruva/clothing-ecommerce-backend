const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// =============================
// 1. PLACE ORDER (Checkout)
// =============================
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch user cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // OPTIONAL: Stock validation
    for (let item of cart.items) {
      if (item.product.stock < item.qty) {
        return res
          .status(400)
          .json({ error: `${item.product.name} is out of stock` });
      }
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      size: item.size,
      qty: item.qty,
      price: item.product.price
    }));

    // Calculate total amount
    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );

    // Create order document
    const newOrder = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice
    });

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    // Send email confirmation
    await sendOrderEmail(req.userEmail, newOrder);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// =============================
// 2. SEND EMAIL FUNCTION
// =============================
async function sendOrderEmail(toEmail, order) {
  // SMTP Transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // your gmail
      pass: process.env.MAIL_PASS  // app password
    }
  });

  let itemsHTML = "";

  order.items.forEach((item) => {
    itemsHTML += `
      <tr>
        <td>${item.name} (${item.size})</td>
        <td>${item.qty}</td>
        <td>₹${item.price}</td>
        <td>₹${item.qty * item.price}</td>
      </tr>
    `;
  });

  const htmlContent = `
    <h2>Thank you for your order!</h2>
    <p>Your order has been placed successfully.</p>
    <h3>Order Details</h3>

    <p><b>Order ID:</b> ${order._id}</p>
    <p><b>Date:</b> ${order.orderDate.toDateString()}</p>

    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>

    <h3>Total Amount: ₹${order.totalPrice}</h3>
    <p>We appreciate your business. Have a great day!</p>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: "Order Confirmation",
    html: htmlContent
  });
}
