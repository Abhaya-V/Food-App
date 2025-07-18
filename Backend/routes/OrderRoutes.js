const express = require("express");
const router = express.Router();
const { createOrder,getUserOrder, getLatestShippingInfo} = require("../controllers/OrderController");
const verifyToken = require("../Middleware/authmidddleware")

router.post("/create",verifyToken, createOrder)
router.get("/getMyOrder",verifyToken,getUserOrder)
router.get("/latest-shipping", verifyToken, getLatestShippingInfo);

module.exports = router;
