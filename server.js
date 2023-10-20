//Load express module
const express = require('express')
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//import routes
const productRouter = require('./routes/ProductRoute')
const categoryRouter = require('./routes/CategoryRoute')
const userRouter = require ('./routes/user')
const dumyRouter = require ('./routes/dumy')
const imageRouter = require ('./routes/imageUpload')

//mount route

app.use('/', productRouter)
app.use('/', categoryRouter)
app.use('/', userRouter)
app.use('/', dumyRouter)
app.use('/', imageRouter)

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
