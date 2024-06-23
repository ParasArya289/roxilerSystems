const Transactions = require("../Models/transaction.model");
const createTransaction = async (data) => {
  try {
    const newItem = new Transactions(data);
    await newItem.save();
    console.log(`Seeding item: ${data.id || data.name}`);
  } catch (error) {
    throw error;
  }
};

const getTransactions = async (query, page = 1, limit = 10) => {
  const skipTransactionsIndex = (page - 1) * limit;
  console.log(page, limit, skipTransactionsIndex);

  try {
    const totalDocuments = await Transactions.countDocuments();
    if (query) {
      const data = await Transactions.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { price: !isNaN(query) ? parseInt(query) : null },
        ],
      }).skip(skipTransactionsIndex);
      const limitedData = data.slice(limit);
      const totalPages = Math.ceil(data.length / limit);

      return {
        totalTransactions: data.length,
        currentPage: page,
        totalPages,
        data: limitedData,
      };
    }
    const data = await Transactions.find().skip(skipTransactionsIndex);
    const limitedData = data.slice(0, limit);
    const totalPages = Math.ceil(data.length / limit);
    return {
      totalTransactions: data.length,
      currentPage: page,
      totalPages,
      data: limitedData,
    };
  } catch (error) {
    throw error;
  }
};
module.exports = { createTransaction, getTransactions };
