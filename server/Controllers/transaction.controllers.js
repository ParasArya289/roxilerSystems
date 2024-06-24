const axios = require("axios");
const {
  createTransaction,
  getTransactions,
  getTransactionStatistics,
  getBarChartData,
  getPieChartData,
} = require("../Queries/transactions.queries");

async function seedDataController(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required to seed data" });
  }

  try {
    const response = await axios.get(url);
    const data = response.data;

    for (let transaction of data) {
      await createTransaction(transaction);
    }

    res.status(201).json({ message: "Data seeded successfully" });
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({ error: `Error seeding data: ${error.message}` });
  }
}
async function getTransactionsController(req, res) {
  const { search, page = 1, limit = 10, month = 1 } = req.query;

  try {
    const result = await getTransactions(
      search,
      parseInt(page),
      parseInt(limit),
      month
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getTransactionStatisticsController(req, res) {
  const { month = 1 } = req.query;
  try {
    const statistics = await getTransactionStatistics(month);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getBarChartDataController(req, res) {
  const { month = 1 } = req.query;
  try {
    const data = await getBarChartData(parseInt(month));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getPeiChartDataController(req, res) {
  const { month = 1 } = req.query;
  try {
    const data = await getPieChartData(parseInt(month));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  seedDataController,
  getTransactionsController,
  getTransactionStatisticsController,
  getBarChartDataController,
  getPeiChartDataController,
};
