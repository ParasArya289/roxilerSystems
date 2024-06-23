const express = require("express");
const {
  seedDataController,
} = require("../Controllers/transaction.controllers");
const transactionRouter = express.Router();

transactionRouter.post("/seed", seedDataController);

module.exports = transactionRouter;
