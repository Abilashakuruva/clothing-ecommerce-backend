const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const orderCtrl = require("../controllers/orderController");

router.post("/", auth, orderCtrl.placeOrder);

module.exports = router;
