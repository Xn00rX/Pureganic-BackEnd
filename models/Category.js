const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  catgName: String,
  catgDesc: String
  //catgImage: String,
  // product: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Product'
  //   }
  // ]
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
