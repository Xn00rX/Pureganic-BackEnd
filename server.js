const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const ProductRouter = require('./routes/ProductRoute')

const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', ProductRouter)

app.use('/', (req, res) => {
  res.send(`connected`)
})

app.listen(PORT, () => {
  console.log(`Running on ${PORT} . . .`)
})
