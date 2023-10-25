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


//Post Methods
router.post('/signup', upload.single('image'), user_CTRL.user_signup_post)
router.post('/signin',  user_CTRL.user_login_post)
router.post('/updatepassword/:id', user_CTRL.dumyupdatepassword)
router.post('/updateprofile/:id',upload.single('image') , user_CTRL.update_profile_put)

//Use Methods



router.use('/images', express.static(path.join(__dirname, 'public/images')))

//Get Https Methods
router.get('/', (req, res) => {
  res.send('Connected Its Working, Check Your Front End ')
})

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  user_CTRL.CheckSession
)

router.get('/userinfo/:id', user_CTRL.user_info_get)


module.exports = router