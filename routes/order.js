const express = require("express")
const router = express.Router()

const cartCtrl = require("../controllers/orders")

router.get("/orders/:id", cartCtrl.getOrder)
// router.post("/orders/:id", cartCtrl.addToCart)

module.exports = router
