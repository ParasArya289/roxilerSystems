import "./Layout.css";
import { Navbar } from "../Navbar/Navbar";

export const Layout = ({ children }) => {
  return (
    <main className="layout">
      <section className="sidebar">
        <Navbar />
      </section>
      <section className="page">{children}</section>
    </main>
  );
};
