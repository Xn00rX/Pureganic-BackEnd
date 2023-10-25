const Product = require('../models/Product')
const Category = require('../models/Category')

const GetProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category')
    res.send(products)
  } catch (error) {
    throw error
  }
}

const GetProduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.product_id)
    res.send(products)
  } catch (error) {
    throw error
  }
}

const CreateProduct = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)

    const product = await Product(req.body)
    product.productImage = req.file

    await product.save(req.body)
    console.log(product.category)
    const category = await Category.findById(product.category)
    console.log(category)
    category.product.push(product._id)
    await category.save()

    res.send(product)
  } catch (error) {
    throw error
  }
}

const UpdateProduct = async (req, res) => {
  try {
    console.log('Request Body:', req.body)
    console.log('Uploaded File Name:', req.file.filename)

    const productId = req.params.product_id
    console.log('Product ID:', productId)

    const updatedFields = {
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productPrice: req.body.productPrice,
      productImage: req.file.filename,
    }

    console.log('Updated Fields:', updatedFields)

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    )
    if (!updatedProduct) {
      console.log('Product not found')
      return res.status(404).json({ error: 'Product not found' })
    }

    console.log('Updated Product:', updatedProduct)
    res.json(updatedProduct)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const DeleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.product_id })
    res.send({
      msg: 'Product Removed',
      payload: req.params.product_id,
      status: 'OK'
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
  GetProduct
}
