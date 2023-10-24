const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartProducts: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      event:{type: mongoose.Schema.Types.ObjectId, ref: "Event"}
    },
  ],
})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart
