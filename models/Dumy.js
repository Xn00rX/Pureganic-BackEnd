const mongoose = require("mongoose")

const dumySchema = mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 50 
  },
  lastName: {
    type: String,
    minlength: 2, 
    maxlength: 50 
  },
  email: {
    type: String,
    minlength: 5, 
    maxlength: 255 
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 255 
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
    minlength: 12, 
    maxlength: 12 
  }
}
,{
  timestamps: true 
}
)

const Dumy = mongoose.model("Dumy", dumySchema)
module.exports = Dumy
