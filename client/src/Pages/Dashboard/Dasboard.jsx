import { useNavigate } from "react-router-dom";
import { Layout } from "../../Component/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import useDebounce from "../../Hooks/useDebounce";

export const Table = ({ data }) => {
  return (
    <table className="snack-table">
      <thead>
        <tr>
          <th>Image </th>

          <th>Id</th>

          <th>Title</th>

          <th>Description</th>

          <th>Price</th>

          <th>Sold</th>

          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id}>
            <td>
              <img src={item.image} />
            </td>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.sold}</td>
            <td>{item.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [month, setMonth] = useState(3);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);
  const debouncedString = useDebounce(searchQuery, 300);
  const fetch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/transactions?search=${debouncedString}&month=${month}&limit=5&page=${page}`
      );
      setTransactions(res.data.data);
      setPageData({
        totalTransactions: res.data.totalTransactions,
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, [debouncedString, month,page]);

  return (
    <Layout>
      <div>
        <h3>Transactions</h3>
        <header className="filterheader">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
        </header>
        <Table data={transactions} />
        {transactions.length > 0 && (
          <div className="pagination">
            <div>Page: {page}</div>
            <div>
              <button
                disabled={pageData?.currentPage <= 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <button
                disabled={pageData?.totalPages <= page}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
            <div>Limit: 5</div>
          </div>
        )}
      </div>
    </Layout>
  );
};
