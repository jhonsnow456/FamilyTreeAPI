const mongoose = require("mongoose");
const PlaceSchema = new mongoose.Schema({
  place_id: {
    type: Number,
    unique: true,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  block: {
    type: String,
  },
  subdivision: {
    type: String,
  },
  village: {
    type: String,
  },
  pin_code: {
    type: String,
  },
  polling_station: {
    type: String,
  },
  assemly_constituency: {
    type: String,
  },
  part_number: {
    type: Number,
  },
});

module.exports = Place = mongoose.model("place", PlaceSchema);
