import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./Pages/Dashboard/Dasboard";
import { BarChartData } from "./Pages/BarChart/BarChart";
import { PieChartData } from "./Pages/PieChart/PieChart";
import { Statistics } from "./Pages/Statistics/Statistics";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/bar-chart" element={<BarChartData />} />
        <Route path="/pie-chart" element={<PieChartData />} />
      </Routes>
    </div>
  );
}

export default App;
