const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order
