const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")

const showOrders = async (req, res) => {
  try {
    const userId = req.params.id
    const order = await Order.find({ user: userId }).populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    // const orderProducts = await cart[0].cartProducts
    // console.log(order)
    res.json(order)
  } catch (error) {
    console.log(error)
  }
}

const Orderisdone = async (req, res) => {
  try {
    const userId = req.params.id
    // const order = await Order.findOne({ user: userId })

    const cart = await Cart.find({ user: userId })
    const orderProducts = await cart[0].cartProducts
    console.log(cart[0].paid)

    let order = new Order({
      user: userId,
      orderItems: orderProducts,
    })
    order.save()
    // cart[0].paid = true
    const deleteCart = await Cart.deleteOne({ user: userId })
    res.send(order)

    //  else {
    //   console.log("heeeeelp" + orderProducts)

    //   order.orderItems.push(orderProducts[0])
    //   order.save()
    //   const deleteCart = await Cart.deleteOne({ user: userId })

    //   res.send(order)
    // }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  showOrders,
  Orderisdone,
}
