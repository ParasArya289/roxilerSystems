import { NavLink } from "react-router-dom";
import { RxActivityLog, RxBarChart, RxPieChart } from "react-icons/rx";
import "./Navbar.css";

export const Navbar = () => {
  // const activeNavLink = {(active)}
  return (
    <nav className="navbar">
      <div>
        <NavLink className="links" to="/">
          <RxActivityLog className="link__icons" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink className="links" to="/statistics">
          <RxBarChart className="link__icons" />
          <span>Statistics</span>
        </NavLink>
        <NavLink className="links" to="/bar-chart">
          <RxBarChart className="link__icons" />
          <span>Bar Chart</span>
        </NavLink>
        <NavLink className="links" to="/pie-chart">
          <RxPieChart className="link__icons" />
          <span>Pie Chart</span>
        </NavLink>
      </div>
    </nav>
  );
};
