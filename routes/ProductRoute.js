const router = require('express').Router()
const controller = require('../controllers/products')

router.get('/', controller.GetProducts)
router.post('/', controller.CreateProduct)
router.put('/:product_id', controller.UpdateProduct)
router.delete('/:product_id', controller.DeleteProduct)

module.exports = router
