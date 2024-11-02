import "./App.css";
import { Outlet } from "react-router-dom";
import { MoonFilled, UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import Navbar from "./Components/navbar/Navbar";

function App() {
  return (
    <section className="layout">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer> Museo Nacional </footer>

      <div className="icon-container">
        <MoonFilled style={{ fontSize: "25px" }} />
        <UserOutlined style={{ fontSize: "25px" }} />
        <PoweroffOutlined style={{ fontSize: "25px" }} />
      </div>
    </section>
  );
}

export default App;
