const axios = require("axios");
const Transactions = require("../Models/transaction.model");
const { createTransaction } = require("../Queries/transactions.queries");

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
module.exports = { seedDataController };
