const User = require('../models/User')
const bcrypt = require("bcrypt")


const middleware = require('../middleware')

const salt = 10

exports.user_signup_post = async (req, res) => {
  try {
    console.log('Received data:', req.body)
    console.log('File', req.file.path)

    const email = req.body.email
    const password = req.body.password
    const hash = bcrypt.hashSync(password, salt)
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      image: req.file ? req.file.filename : null,
      gender: req.body.gender,
      role: req.body.role,
      phonenumber: req.body.phonenumber,
    })

    user
      .save()
      .then(() => {
        console.log('Data saved successfully')
        res.json(user)
      })
      .catch((error) => {
        console.error('Error:', error)
        res.status(500).send('Error while saving data')
      })

    
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}



  exports.user_login_post = async (req, res) => {
    console.log('Received data for login:', req.body)
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).send('User not found')
      }
      const passwordMatch = await bcrypt.compare(password, user.password)
      console.log(user.image)
      if(passwordMatch){
        let payload={
          id: user.id,
          email: user.email,
          userimage: user.image
        }
        if (!passwordMatch) {
          return res.status(401).send('Incorrect password')
        }
        let token = middleware.createToken(payload)
        console.log(token)
        return res.send({user:payload , token})

      }
    
    } catch (error) {
      console.error('Error:', error)
      res.status(500).send('Login failed')
    }
  }


  exports.dumyupdatepassword = async (req, res) => {
    console.log('Received data for password update:', req.body)
    const { email, password, newpassword } = req.body
    
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).send('User not found')
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password)
      
      if (!passwordMatch) {
        return res.status(401).send('Incorrect password')
      } else {
        const hash = bcrypt.hashSync(newpassword, saltRounds)
        user.password = hash
        user.save()
        res.status(200).json({ message: 'Password updated successfully' })
      }
    } catch (error) {
      console.error('Error:', error)
      res.status(500).send('Password update failed')
    }
  }


  exports.CheckSession = async (req, res) => {
    const { payload } = res.locals
    console.log(res.locals)
    res.send(payload)
  }