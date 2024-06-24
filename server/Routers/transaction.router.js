const express = require("express");
const {
  seedDataController,
  getTransactionsController,
  getTransactionStatisticsController,
  getBarChartDataController,
  getPeiChartDataController,
} = require("../Controllers/transaction.controllers");
const transactionRouter = express.Router();

transactionRouter.get("/", getTransactionsController);
transactionRouter.get("/statistics", getTransactionStatisticsController);
transactionRouter.get("/bar-chart", getBarChartDataController);
transactionRouter.get("/pie-chart", getPeiChartDataController);

transactionRouter.post("/seed", seedDataController);

module.exports = transactionRouter;
