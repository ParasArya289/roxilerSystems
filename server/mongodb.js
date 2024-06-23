const mongoose = require("mongoose");

const mongoURI = process.env["MONGODB_URI"];

// Use mongoose to connect
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
