const express = require('express')
const controller = require('../controllers/categories')
const router = express.Router()

router.get('/apicategory', controller.GetCategories)
router.post('/apicategory', controller.CreateCategory)
router.put('/apicategory/:category_id', controller.UpdateCategory)
router.delete('/apicategory/:category_id', controller.DeleteCategory)

module.exports = router
