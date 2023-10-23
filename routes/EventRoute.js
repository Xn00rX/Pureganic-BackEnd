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

const controller = require('../controllers/Event')
const router = express.Router()

router.post('/addevent', upload.single('EventImage'),controller.event_add_post)
router.get('/showevents', controller.event_show_get)


module.exports = router
