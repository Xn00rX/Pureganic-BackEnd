const express = require('express')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

const controller = require('../controllers/products')
const router = express.Router()

router.get('/apiproduct', controller.GetProducts)
//router.post('/apiproduct', controller.CreateProduct)
router.put('/apiproduct/:product_id', controller.UpdateProduct)
router.delete('/apiproduct/:product_id', controller.DeleteProduct)

//upload picture new routes
router.post(
  '/apiproduct',
  upload.single('productImage'),
  controller.CreateProduct
)

module.exports = router
