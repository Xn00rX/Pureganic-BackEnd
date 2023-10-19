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
// app.use(express.static("public"))

//Require Multer
// const multer = require("multer")

//Port configuration
const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//import routes
const productRouter = require('./routes/ProductRoute')

//mount route
app.use('/', productRouter)

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
