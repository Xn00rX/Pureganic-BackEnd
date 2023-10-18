const mongoose = require("mongoose")

const productSchema = mongoose.Schema({})

const Product = mongoose.model("Prodruct", productSchema)
module.exports = Product
