import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./Pages/Dashboard/Dasboard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/departments" element={<Departments />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} /> */}
      </Routes>
    </div>
  );
}

export default App;