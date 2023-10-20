const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  seller: {
    type: String,
    default: 'buyer'
  },
  image: {
    type: String,

  },
  gender: {
    type: String,
    default: 'male'
  },
  firstName: {
    type: String,
    required: true,
    minLength: [3, "Your first name should be longer than 3 characters"],
    maxLength: [70, "First name is too long"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Your last name should be longer than 3 characters"],
    maxLength: [70, "Last name is too long"],
  },
  image: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minLength: [8, "number does not exist"],
    maxLength: [30, "number does not exist"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "password is weak"],
  },
  dateOfBirth: {
    type: Date, 
  }
})

const User = mongoose.model("User", userSchema)
module.exports = User
