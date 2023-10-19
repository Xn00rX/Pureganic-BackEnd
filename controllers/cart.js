const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")

const addToCart = async (req, res) => {
  try {
    const userId = req.params.id
    const productId = req.body.id
    console.log(userId, productId)
    let cart = await Cart.findOne({ user: userId })
    let product = await Product.findById(productId)
    if (!cart) {
      console.log("Create")
      let cart = new Cart({
        user: req.params.id,
        product: req.body.id,
      })
      cart.save()
      res.send(cart)
    } else {
      console.log("Update")
      cart.product.push(productId)
      cart.save()
      res.send(cart)
    }

    // let price = product.productPrice
    // let name = product.productName
  } catch (error) {
    console.log(error)
  }
}

const getCart = async (req, res) => {
  try {
    const userId = req.params.id
    let cart = await Cart.findOne({ userId })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addToCart,
  getCart,
}
