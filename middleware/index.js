const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const APP_SECRET = process.env.APP_SECRET

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals

  try {
    let payload = jwt.verify(token, APP_SECRET)

    if (payload) {
      res.locals.payload = payload 
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 
    'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg:
     'Verify Token Error!' })
  }
}

const stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split
    (' ')[1]
    if (token) {
      res.locals.token = token
      return next()
    }
    res.status(401).send({ status: 'Error', msg:
     'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error',
     msg: 'Strip Token Error!' })
  }
}

module.exports = {
  createToken,
  stripToken,
  verifyToken
}