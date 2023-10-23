const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")

const getOrder = async (req, res) => {
  try {
    const userId = req.params.id
    const order = await Order.findOne({ user: userId })

    const cart = await Cart.find({ user: userId })
    const orderProducts = await cart[0].cartProducts

    if (!order) {
      let order = new Order({
        user: userId,
        orders: cart,
        orderItems: orderProducts,
      })
      order.save()
      const deleteCart = await Cart.deleteOne({ user: userId })
      res.send(order)
    } else {
      console.log("heeeeelp" + orderProducts)

      order.orderItems.push(orderProducts[0])
      order.save()
      const deleteCart = await Cart.deleteOne({ user: userId })

      res.send(order)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getOrder,
}
