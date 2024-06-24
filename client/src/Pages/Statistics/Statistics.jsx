import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../../Component/Layout/Layout";
import "./Statistics.css"
export const Statistics = () => {
  const [month, setMonth] = useState(3);
  const [data, setData] = useState(null);
  const fetch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/transactions/statistics?month=${month}`
      );
      setData(res.data.statistics);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, [month]);
  return (
    <Layout>
      <div className="statistics">
        <h3>Statistics</h3>
        <select
          value={month}
          name="month"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <div className="col">
          <div>
            <div>Total Sale Amount</div>
            <div>Total Item Sold</div>
            <div>Total Item Not Sold</div>
          </div>
          <div>
            <b>{data?.totalSaleAmount}</b>
            <b>{data?.soldItems}</b>
            <b>{data?.notSoldItems}</b>
          </div>
        </div>
      </div>
    </Layout>
  );
};
