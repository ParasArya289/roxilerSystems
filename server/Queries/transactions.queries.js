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

const getTransactions = async (query, page = 1, limit = 10, month) => {
  const skipTransactionsIndex = (page - 1) * limit;
  try {
    if (query) {
      const data = await Transactions.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { price: !isNaN(query) ? parseInt(query) : null },
        ],
        ...(month && { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } }),
      }).skip(skipTransactionsIndex);

      const totalPages = Math.ceil(data.length / limit);

      return {
        totalTransactions: data.length,
        currentPage: page,
        totalPages,
        data: data.slice(0, limit),
      };
    }
    const data = await Transactions.find({
      ...(month && { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } }),
    }).skip(skipTransactionsIndex);

    const totalPages = Math.ceil(data.length / limit);

    return {
      totalTransactions: data.length,
      currentPage: page,
      totalPages,
      data: data.slice(0, limit),
    };
  } catch (error) {
    throw error;
  }
};

const getTransactionStatistics = async (month) => {
  const filter = {
    ...(month ? { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } } : {}),
  };
  try {
    const data = await Transactions.find(filter);
    console.log(data);
    // if(!data){
    //   throw new Error("No statistics available for this month")
    // }
    const createdStats = data.reduce(
      (acc, { price, sold }) => {
        if (sold) {
          return {
            ...acc,
            totalSaleAmount: acc.totalSaleAmount + price,
            soldItems: ++acc.soldItems,
          };
        }
        return { ...acc, notSoldItems: ++acc.notSoldItems };
      },
      { totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 }
    );
    return createdStats;
  } catch (error) {
    throw error;
  }
};
const getBarChartData = async (month) => {
  const priceRanges = [
    { range: "0-100", min: 0, max: 100, count: 0 },
    { range: "101-200", min: 101, max: 200, count: 0 },
    { range: "201-300", min: 201, max: 300, count: 0 },
    { range: "301-400", min: 301, max: 400, count: 0 },
    { range: "401-500", min: 401, max: 500, count: 0 },
    { range: "501-600", min: 501, max: 600, count: 0 },
    { range: "601-700", min: 601, max: 700, count: 0 },
    { range: "701-800", min: 701, max: 800, count: 0 },
    { range: "801-900", min: 801, max: 900, count: 0 },
    { range: "901-above", min: 901, max: Infinity, count: 0 },
  ];
  try {
    const transactions = await Transactions.find({
      ...(month && { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } }),
    });

    transactions.forEach((transaction) => {
      const price = transaction.price;
      for (let range of priceRanges) {
        if (price >= range.min && price <= range.max) {
          range.count++;
          break;
        }
      }
    });

    return priceRanges;
  } catch (error) {
    throw error;
  }
};
const getPieChartData = async (month) => {
  try {
    const transactions = await Transactions.find({
      ...(month && { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } }),
    });

    const numberOfProductsInUniqueCategory = transactions.reduce(
      (acc, { category }) =>
        acc[category] ? (acc[category] += 1,acc) : (acc[category] = 1,acc),
      {}
    );

    return numberOfProductsInUniqueCategory;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createTransaction,
  getTransactions,
  getTransactionStatistics,
  getBarChartData,
  getPieChartData,
};
