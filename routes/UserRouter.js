const express = require('express')
const user_CTRL = require('../controllers/userCTRL')
const router = express.Router()

const middleware = require('../middleware')


const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

router.post('/signup', upload.single('image'), user_CTRL.user_signup_post)
router.post('/signin',  user_CTRL.user_login_post)
router.post('/userupdate', user_CTRL.dumyupdatepassword)


router.use('/images', express.static(path.join(__dirname, 'public/images')))
router.post('/updateprofile/:id',upload.single('image') , user_CTRL.update_profile_put)




router.get('/', (req, res) => {
  res.send('connected')
})
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  user_CTRL.CheckSession
)
module.exports = router
