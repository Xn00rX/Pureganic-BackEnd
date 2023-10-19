const { Product } = require('../models/Product')
const { Category } = require('../models/Category')

const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.send(categories)
  } catch (error) {
    throw error
  }
}

const CreateCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.send(category)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCategories,
  CreateCategory
}
