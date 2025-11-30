const nodemailer = require("nodemailer");

module.exports = async function sendOrderEmail(order, userEmail) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Order items list HTML
    const itemRows = order.items
      .map(
        (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.qty}</td>
        <td>₹${item.price}</td>
      </tr>
    `
      )
      .join("");

    const mailHtml = `
      <h2>Thank you for your order!</h2>
      <p>Your order has been placed successfully.</p>

      <h3>Order Details:</h3>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Date:</strong> ${order.orderDate}</p>
      <p><strong>Status:</strong> ${order.status}</p>

      <table border="1" cellspacing="0" cellpadding="8">
        <tr>
          <th>Product</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        ${itemRows}
      </table>

      <h3>Total Amount: ₹${order.totalPrice}</h3>

      <p>We appreciate your business!</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Order Confirmation",
      html: mailHtml,
    });

    console.log("Order Email Sent Successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};
