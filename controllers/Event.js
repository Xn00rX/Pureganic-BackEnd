const Event = require('../models/Event')

exports.event_add_post= (req,res)=>{
console.log(req.body)
console.log(req.file.filename)
const event = new Event({
  Name: req.body.Name,
  Price: req.body.Price,
  Longitude: req.body.Longitude,
  Latitude:req.body.Latitude,
  EventImage:req.file.filename
})
event.save()


}

exports.event_show_get= (req,res)=>{
  const event = Event
  res.json(event)
}