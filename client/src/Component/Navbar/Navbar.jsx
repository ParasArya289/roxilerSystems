import { NavLink } from "react-router-dom";
import { RxDashboard, RxActivityLog, RxBarChart } from "react-icons/rx";
import { BiCategory } from "react-icons/bi";
import "./Navbar.css";

export const Navbar = () => {
  // const activeNavLink = {(active)}
  return (
    <nav className="navbar">
      <div>
        <NavLink className="links" to="/">
          <RxBarChart className="link__icons" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink className="links" to="/departments">
          <RxDashboard className="link__icons" />
          <span>Departments</span>
        </NavLink>
        <NavLink className="links" to="/products">
          <RxActivityLog className="link__icons" />
          <span>Products</span>
        </NavLink>
      </div>
    </nav>
  );
};
