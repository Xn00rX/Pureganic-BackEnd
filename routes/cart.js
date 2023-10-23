const express = require("express")
// const controller = require("../controllers")
const router = express.Router()

const cartCtrl = require("../controllers/cart")

router.get("/cart/:id", cartCtrl.getCart)
router.post("/cart/:id", cartCtrl.addToCart)
// router.delete("/cart/:id", cartCtrl.deleteFromCart)

module.exports = router
