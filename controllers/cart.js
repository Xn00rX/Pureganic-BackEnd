const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")

const getCart = async (req, res) => {
  try {
    const userId = req.params.id

    const cart = await Cart.findOne({ user: userId })
    const product = cart.cartProducts[0].product
    // let p = cart.cartProducts.populate("product")
    // res.json(product)
    console.log("heereee", cart.populate("product"))
    console.log(product)
    // res.json(cart)
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
        cartProducts: [{ product: req.body.id }],
      })
      cart.save()
      res.send(cart)
    } else {
      console.log("Update")
      let productExit = await cart.cartProducts.find(
        (p) => p.product == productId
      )
      if (productExit) {
        productExit.quantity++
      } else {
        cart.cartProducts.push({ product: req.body.id })
      }

      cart.save()
      res.send(cart)
    }
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
    let productIndex = cart.cartProducts.findIndex(
      (p) => p.product == productId
    )
    let deletedProduct = cart.cartProducts[productIndex]
    if (deletedProduct.quantity > 1) {
      deletedProduct.quantity--
    } else {
      cart.cartProducts.splice(productIndex, 1)
    }
    // let cproduct = cart.product.find(productId)
    // console.log("item id" + productItem)
    // console.log("deletedprod" + productItem)
    console.log("test" + productIndex)

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
