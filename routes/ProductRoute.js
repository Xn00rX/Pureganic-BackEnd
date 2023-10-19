const express = require("express")
const controller = require("../controllers/products")
const router = express.Router()

router.get("/api/products", controller.GetProducts)
router.post("/apiproduct", controller.CreateProduct)
router.put("/apiproduct/:product_id", controller.UpdateProduct)
router.delete("/apiproduct/:product_id", controller.DeleteProduct)

module.exports = router
