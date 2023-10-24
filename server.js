//Load express module
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

//Load dotenv module
require('dotenv').config()

//Load Mongoose module
const mongoose = require('mongoose')

//Invoke express functionality
const app = express()

//Look for static file here (CSS/JS/Image/Video)
app.use(express.static('public'))

//Port configuration
const port = process.env.PORT
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//import routes
const productRouter = require('./routes/ProductRoute')
const categoryRouter = require('./routes/CategoryRoute')
const userRouter = require('./routes/UserRouter')

//mount route

app.use('/', productRouter)
app.use('/', categoryRouter)
app.use('/', userRouter)

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

//MongoDB Connection
mongoose
  .connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.log('MongoDB is not connected' + err)
  })
