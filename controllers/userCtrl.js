const User = require('../models/User')
const bcrypt = require("bcrypt")


const middleware = require('../middleware')

const salt = 10


exports.user_info_get = async (req,res) =>{
  console.log('a')
  const userId = req.params.id
  const updatedUserData = req.body
  const user = await User.findById(userId)
  console.log(user)
  res.json(user)
  
  


}


exports.user_signup_post = async (req, res) => {
  console.log('b')
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
        res.send('Error while saving data')
      })

    
  } catch (error) {
    console.log(error)
    res.send('Internal Server Error')
  }
}



  exports.user_login_post = async (req, res) => {
    console.log('cc')
    console.log('Received data for login:', req.body)
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.send('User not found')
      }
      const passwordMatch = await bcrypt.compare(password, user.password)
      console.log(user.image)
      if(passwordMatch){
        let payload={
          id: user.id,
          email: user.email,
          userimage: user.image,
          username:user.firstName,
          phonenumber:user.phonenumber
        }
        if (!passwordMatch) {
          return res.send('Incorrect password')
        }
        let token = middleware.createToken(payload)
        console.log(token)
        return res.send({user:payload , token})

      }
    
    } catch (error) {
      console.error('Error:', error)
      res.send('Login failed')
    }
  }


  exports.dumyupdatepassword = async (req, res) => {
      console.log('nn')
    const userId = req.params.id
    const updatedUserData = req.body
  
    const { currentPassword, newPassword } = updatedUserData
  
    try {
      const user = await User.findById(userId)
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      const passwordMatch = await bcrypt.compare(currentPassword, user.password)
  
      if (!passwordMatch) {
        return res.json({ message: 'Incorrect password' })
      } else {
        const hash = await bcrypt.hash(newPassword, salt)
        user.password = hash
        await user.save()
        res.json({ message: 'Password updated successfully' })
      }
    } catch (error) {
      console.error('Error:', error)
      res.json({ message: 'Password update failed' })
    }
  }


  exports.CheckSession = async (req, res) => {
    const { payload } = res.locals
    console.log(res.locals)
    res.send(payload)
  }



  exports.update_profile_put = async (req, res) => {
    console.log('ccc')
    try {
      const userId = req.params.id
      const updatedUserData = req.body

      console.log(userId)
      console.log(updatedUserData)

      if (req.file) {
        updatedUserData.image = req.file.filename
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData)
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      return res.json(updatedUser)
    } catch (error) {
      console.error(error)
      return res.json({ message: 'Internal server error' })
    }
  }
