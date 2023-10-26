const express = require("express")

const path = require("path")

const multer = require("multer")

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

const controller = require("../controllers/products")
const router = express.Router()

router.get("/api/products", controller.GetProducts)
router.get("/apiproduct", controller.GetProducts)
//router.post('/apiproduct', controller.CreateProduct)

router.post(
  "/apiproducttt/:product_id",
  upload.single("productImage"),
  controller.UpdateProduct
)

router.use("/uploads", express.static(path.join(__dirname, "public/uploads")))

/////
router.get("/apiproduct/:product_id", controller.GetProduct)

router.delete("/apiproduct/:product_id", controller.DeleteProduct)

//upload picture new routes
router.post(
  "/apiproduct",
  upload.single("productImage"),
  controller.CreateProduct
)

module.exports = router
