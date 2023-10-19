const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  productName: String,
  productDesc: String,
  productPrice: String
  //productImage: String
  //category: {
  //type: mongoose.Schema.Types.ObjectId,
  //ref: 'Category'
  //}
})

const Product = mongoose.model('Prodruct', productSchema)
module.exports = { Product }
