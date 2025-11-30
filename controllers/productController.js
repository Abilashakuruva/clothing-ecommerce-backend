const Product = require("../models/Product");

// ---------------------------
// CREATE Product (with image)
// ---------------------------
exports.createProduct = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------
// GET Products (search + filter + size + price + pagination)
// ---------------------------
exports.getAllProducts = async (req, res) => {
  try {
    let { search, category,size, minPrice, maxPrice, sort, page, limit } = req.query;

    let query = {};

    // 🔍 Search
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 🎯 Category filter
    if (category){ query.category = category;}

     // 👕 Size Filter (Array in DB → match any size)
    if (size) {
      query.sizes = size; // sizes: ["S","M","L","XL"]
    }

    // 💰 Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 📄 Pagination
    page = Number(page) || 1;
    limit = Number(limit) || 12;
    const skip = (page - 1) * limit;

    // ↕ Sorting
    let sortOption = {};
    // if (sort === "price_asc") sortOption.price = 1;
    // if (sort === "price_desc") sortOption.price = -1;
    // if (sort === "newest") sortOption.createdAt = -1;

     switch (sort) {
      case "price_asc":
        sortOption.price = 1;
        break;
      case "price_desc":
        sortOption.price = -1;
        break;
      case "newest":
        sortOption.createdAt = -1;
        break;
      default:
        break;
    }

    // 📦 Fetch products

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET By ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });

    if (!updated)
      return res.status(404).json({ message: "Product not found" });

    res.json({
      success: true,
      message: "Product updated",
      product: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
