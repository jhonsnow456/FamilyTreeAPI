const express = require("express");
const mongoose = require("mongoose");
const app = express();
const electoralDataRoute = require("./routes/electoral");
const placeDataRoute = require("./routes/place");
const relationRoute = require("./routes/relation");
const { port, mongo_url } = require("./config");
app.use(express.json());
app.use("/api/electoraldata", electoralDataRoute);
app.use("/api/places", placeDataRoute);
app.use("/api/relation", relationRoute);

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err, " pls solve this error");
  });

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
