const router = require("express").Router();
const cartCtrl = require("../controllers/cartController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, cartCtrl.getCart);
router.post("/add",auth, cartCtrl.addToCart); // Auth optional
router.put("/update", auth, cartCtrl.updateQty);
router.delete("/remove", auth, cartCtrl.removeItem);
router.post("/merge", auth, cartCtrl.mergeGuestCart);

module.exports = router;
