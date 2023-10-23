const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  orderItems: [],
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order
