const Cart = require("../models/Cart");
const Product = require("../models/Product");

// -----------------------------------------
// 1. GET USER CART
// -----------------------------------------
exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;

    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------------------
// 2. ADD TO CART
// -----------------------------------------
exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId; // user may be null (guest)
    const { productId, size, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // If user NOT logged in → return item (frontend stores in localStorage)
    if (!userId) {
      return res.status(200).json({
        guest: true,
        message: "Guest cart item (store in localStorage)",
        item: { productId, size, qty }
      });
    }

    // Logged-in user → update DB cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].qty += qty;
    } else {
      // Add new item
      cart.items.push({ product: productId, size, qty });
    }

    await cart.save();

    res.status(200).json({ success: true, cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------------------
// 3. UPDATE ITEM QTY
// -----------------------------------------
exports.updateQty = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, size, qty } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );

    if (!item) return res.status(404).json({ error: "Item not in cart" });

    item.qty = qty;

    await cart.save();

    res.status(200).json({ success: true, cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------------------
// 4. REMOVE ITEM
// -----------------------------------------
exports.removeItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, size } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        !(item.product.toString() === productId && item.size === size)
    );

    await cart.save();

    res.status(200).json({ success: true, cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------------------
// 5. MERGE GUEST CART AFTER LOGIN
// -----------------------------------------
exports.mergeGuestCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { guestItems } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    guestItems.forEach((guestItem) => {
      const { productId, size, qty } = guestItem;

      const existing = cart.items.find(
        (i) => i.product.toString() === productId && i.size === size
      );

      if (existing) {
        existing.qty += qty;
      } else {
        cart.items.push({ product: productId, size, qty });
      }
    });

    await cart.save();

    res.status(200).json({ success: true, cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
