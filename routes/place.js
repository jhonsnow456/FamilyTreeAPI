const express = require("express");
const Place = require("../models/place");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const place_data = await Place.find();
    if (!place_data) {
      return res.status(404).json({
        msg: "no data found",
      });
    }
    res.json(place_data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
