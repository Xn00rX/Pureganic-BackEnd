const mongoose = require("mongoose")

const dumySchema = mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2, // Minimum length of 2 characters
    maxlength: 50 // Maximum length of 50 characters
  },
  lastName: {
    type: String,
    minlength: 2, // Minimum length of 2 characters
    maxlength: 50 // Maximum length of 50 characters
  },
  email: {
    type: String,
    minlength: 5, // Minimum length of 5 characters
    maxlength: 255 // Maximum length of 255 characters
  },
  password: {
    type: String,
    minlength: 6, // Minimum length of 6 characters
    maxlength: 255 // Maximum length of 255 characters
  },
  image: {
    type: String
  },
  gender: {
    type: String,
    default: 'No Comments'
  },
  role: {
    type: String,
    default: 'buyer'
  },
  phonenumber: {
    type: Number,
    minlength: 12, // Minimum length of 10 digits
    maxlength: 12 // Maximum length of 15 digits
  }
})

const Dumy = mongoose.model("Dumy", dumySchema)
module.exports = Dumy
