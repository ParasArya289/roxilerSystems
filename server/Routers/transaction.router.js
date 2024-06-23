const express = require("express");
const {
  seedDataController,
  getTransactionsController,
} = require("../Controllers/transaction.controllers");
const transactionRouter = express.Router();

transactionRouter.get("/", getTransactionsController);

transactionRouter.post("/seed", seedDataController);

module.exports = transactionRouter;
