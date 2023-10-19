const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  productName: String,
  productDesc: String,
<<<<<<< HEAD
  productPrice: String
  //productImage: String
  //category: {
  //type: mongoose.Schema.Types.ObjectId,
  //ref: 'Category'
  //}
=======
  productPrice: String,
  productImage: String,
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  // },
>>>>>>> eec6ad3bf1dab5dcf4c0969967bdf92b43c61202
})

const Product = mongoose.model("Prodruct", productSchema)
module.exports = { Product }
