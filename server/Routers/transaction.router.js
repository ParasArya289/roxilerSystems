const express = require("express");
const {
  seedDataController,
  getTransactionsController,
  getTransactionStatisticsController,
  getBarChartDataController,
  getPeiChartDataController,
  getCumulativeDataController
} = require("../Controllers/transaction.controllers");
const transactionRouter = express.Router();

transactionRouter.get("/", getTransactionsController);
transactionRouter.get("/statistics", getTransactionStatisticsController);
transactionRouter.get("/bar-chart", getBarChartDataController);
transactionRouter.get("/pie-chart", getPeiChartDataController);
transactionRouter.get("/cumulative", getCumulativeDataController);

transactionRouter.post("/seed", seedDataController);

module.exports = transactionRouter;
