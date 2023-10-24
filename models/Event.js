const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({

  Name: String,
  Price: Number,
  EventImage: String,
  EventLocation: String,
  
  Date:Date,
  Latitude:Number,
  Longitude:Number,

},{
  timestamp:true
})

const Event = mongoose.model("Event", EventSchema)
module.exports = Event
