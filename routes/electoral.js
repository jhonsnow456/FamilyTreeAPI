const express = require("express");
const Electoral = require("../models/electoral");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const electoral_data = await Electoral.find();
    if (!electoral_data) {
      return res.status(404).json({
        msg: "no data found",
      });
    }
    res.json(electoral_data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});


module.exports = router;
