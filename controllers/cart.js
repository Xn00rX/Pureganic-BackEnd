const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")

const getCart = async (req, res) => {
  try {
    const userId = req.params.id
    const cart = await Cart.findOne({ user: userId })
    res.json(cart)
  } catch (error) {
    console.log(error)
  }
}

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
      // let productExit = await product.findById(productId)
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

const deleteFromCart = async (req, res) => {
  try {
    const userId = req.params.id
    const productId = req.body.id
    console.log(userId, productId)
    let cart = await Cart.findOne({ user: userId })
    let productIndex = cart.product.findIndex((p) => p._id == productId)
    let productItem = cart.product[productIndex]
    // let cproduct = cart.product.find(productId)
    console.log("item id" + productItem)
    cart.product.splice(productIndex, 1)
    // cart.product.splice(productIndex, 1)
    cart.save()
    res.send(cart)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addToCart,
  getCart,
  deleteFromCart,
}
