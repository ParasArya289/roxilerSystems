const axios = require("axios");
const {
  createTransaction,
  getTransactions,
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
  const { search, page, limit } = req.query;

  try {
    const result = await getTransactions(
      search,
      parseInt(page) || 1,
      parseInt(limit) || 10
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = { seedDataController, getTransactionsController };
