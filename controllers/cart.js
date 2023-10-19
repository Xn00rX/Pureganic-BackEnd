const Cart = require("../models/Cart")
const User = require("../models/User")
const { Product } = require("../models/Product")

const AddToCart = async (req, res) => {
  try {
    let user = await User.find({ userId: User._id })
    let product = await Product.findOne({ productId: Product._id })
  } catch (error) {
    console.log(error)
  }
}
