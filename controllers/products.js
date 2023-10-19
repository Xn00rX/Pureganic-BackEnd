const Product = require("../models/Product")

const GetProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    throw error
  }
}

const CreateProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  } catch (error) {
    throw error
  }
}

const UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.product_id,
      req.body,
      { new: true }
    )
    res.send(product)
  } catch (error) {
    throw error
  }
}

const DeleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.product_id })
    res.send({
      msg: "Product Removed",
      payload: req.params.product_id,
      status: "OK",
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetProducts,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
}
