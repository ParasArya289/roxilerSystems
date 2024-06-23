const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./mongodb");
const transactionRouter = require("./Routers/transaction.router");
const app = express();
const PORT = process.env["PORT"];

async function startServer() {
  app.use(cors());
  app.use(express.json());

  //routers in use
  app.use("/transactions", transactionRouter);

  app.get("/", (req, res) => {
    res.send("Roxiler assignment backend");
  });

  //global error handler
  app.use((err, req, res, next) => {
    res.status(500).json({ error: "Something Went wrong!!" });
  });

  //handle non existent enpoints
  app.use((req, res) => {
    res.status(404).json({ error: "Requested API endpoint does not exist" });
  });

  app.listen(PORT, () => {
    console.log("Server started at port", PORT);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
