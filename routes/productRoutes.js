const router = require("express").Router();
const productCtrl = require("../controllers/productController");
const upload = require("../middlewares/imageUpload");

// Create with image upload
router.post("/", upload.single("image"), productCtrl.createProduct);

// Get all products (search + filtering + sorting)
router.get("/", productCtrl.getAllProducts);

// Get by ID
router.get("/:id", productCtrl.getProductById);

// Update with image upload
router.put("/:id", upload.single("image"), productCtrl.updateProduct);

// Delete
router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
