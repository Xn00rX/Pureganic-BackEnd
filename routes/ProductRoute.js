const express = require("express")
const controller = require("../controllers/products")
const router = express.Router()

//To take the values from the body
router.use(express.urlencoded({ extended: true }))

router.get("/apiproduct", controller.GetProducts)
router.post("/apiproduct", controller.CreateProduct)
router.put("/:product_id", controller.UpdateProduct)
router.delete("/:product_id", controller.DeleteProduct)

module.exports = router
