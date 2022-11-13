const mongoose = require("mongoose");
const ElectoralSchema = new mongoose.Schema({
  place_id: {
    type: Number,
    unique: true,
  },
  data: [
    {
      id: {
        type: Number,
      },
      VoterId: {
        type: String,
        unique: true,
      },
      Name: {
        type: String,
      },
      "Father Name": {
        type: String,
        default: "-",
      },
      "Husband Name": {
        type: String,
        default: "-",
      },
      "House Number": {
        type: Number,
      },
      Age: {
        type: Number,
      },
      Gender: {
        type: String,
      },
    },
  ],
});

module.exports = Electoral = mongoose.model("electoral", ElectoralSchema);
