const Product = require('../models/Product')
const Category = require('../models/Category')

const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate('product')
    res.send(categories)
  } catch (error) {
    throw error
  }
}

const GetCategory = async (req, res) => {
  try {
    const categories = await Category.findById(req.params.category_id)
    res.send(categories)
  } catch (error) {
    throw error
  }
}
const CreateCategory = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)

    const category = Category(req.body)

    category.catgImage = '/uploads/' + req.file.filename
    await category.save(req.body)

    res.send(category)
  } catch (error) {
    throw error
  }
}

const UpdateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.category_id,
      req.body,
      { new: true }
    )
    res.send(category)
  } catch (error) {
    throw error
  }
}

const DeleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.category_id })
    res.send({
      msg: 'Category Removed',
      payload: req.params.category_id,
      status: 'OK'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  GetCategory
}
