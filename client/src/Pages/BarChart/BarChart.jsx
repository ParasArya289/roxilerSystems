import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./BarChart.css";
import axios from "axios";
import { Layout } from "../../Component/Layout/Layout";

export const BarChartData = () => {
  const [month, setMonth] = useState(3);
  const [data, setData] = useState(null);
  const fetch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/transactions/bar-chart?month=${month}`
      );
      setData(res.data.barChartData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, [month]);
  return (
    <Layout>
      <h3>Bar Chart</h3>
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
      <div className="barChartData">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              name="Products sold"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};
