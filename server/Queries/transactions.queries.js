const Transactions = require("../Models/transaction.model");
// import Transactions from "../Models/transaction.model";
const createTransaction = async (data) => {
  try {
    const newItem = new Transactions(data);
    await newItem.save();
    console.log(`Seeding item: ${data.id || data.name}`);
  } catch (error) {
    throw error;
  }
};
module.exports = {createTransaction}