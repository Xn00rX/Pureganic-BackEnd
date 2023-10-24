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
const controller = require('../controllers/categories')
const router = express.Router()

router.get('/apicategory', controller.GetCategories)
//router.post('/apicategory', controller.CreateCategory)
router.put('/apicategory/:category_id', controller.UpdateCategory)
router.get('/apicategory/:category_id', controller.GetCategory)
router.delete('/apicategory/:category_id', controller.DeleteCategory)

//upload picture new routes
router.post(
  '/apicategory',
  upload.single('catgImage'),
  controller.CreateCategory
)

module.exports = router
