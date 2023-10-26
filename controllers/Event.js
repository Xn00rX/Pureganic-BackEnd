const Event = require("../models/Event")

exports.event_add_post = (req, res) => {
  console.log(req.body)
  console.log(req.file.filename)
  const event = new Event({
    Name: req.body.Name,
    Price: req.body.Price,
    Longitude: req.body.Longitude,
    Latitude: req.body.Latitude,
    EventImage: req.file.filename,
    EventLocation: req.body.EventLocation,
    EventDate: req.body.EventDate,
  })
  event
    .save()
    .then((event) => {
      res.send(event)
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.event_delete_get = async (req, res) => {
  const eventId = req.params.id

  try {
    const deletedEvent = await Event.findOneAndDelete({ _id: eventId })
    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted successfully" })
    } else {
      res.status(404).json({ message: "Event not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" })
  }
}

exports.event_show_get = (req, res) => {
  Event.find()
    .then((events) => {
      res.send(events)
      // res.json(events)
    })
    .catch((error) => {
      console.error("Error fetching events:", error)
      res.status(500).json({ error: "Error fetching events" })
    })
}
