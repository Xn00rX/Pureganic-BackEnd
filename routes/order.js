const express = require("express")
const router = express.Router()

const cartCtrl = require("../controllers/orders")

router.post("/orders/:id", cartCtrl.Orderisdone)
router.get("/orders/:id", cartCtrl.showOrders)
// router.post("/orders/:id", cartCtrl.addToCart)

module.exports = router
