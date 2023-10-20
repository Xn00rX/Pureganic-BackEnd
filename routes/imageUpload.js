const express = require('express')
const controller = require('../controllers/imageUpload')
const router = express.Router()
const multer = require('multer')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
})

const upload = multer({ storage });

router.post('/upload', upload.single('image'), controller.imageUpload)




module.exports = router