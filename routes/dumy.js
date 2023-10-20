const express = require('express')
const controller = require('../controllers/Dumy')
const router = express.Router()

const multer = require('multer')

const path = require('path')

router.use('/images', express.static(path.join(__dirname, 'public/images')))

const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

router.post('/dumy', upload.single('image'), controller.dumyregister)
router.get('/', (req, res) => {
  res.send('connected')
})
router.post('/apilogin',  controller.dumyLogin)
router.post('/apiupdate', controller.dumyupdatepassword)



module.exports = router
