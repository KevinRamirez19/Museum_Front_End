import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { MoonFilled, UserOutlined, PoweroffOutlined } from "@ant-design/icons";

function App() {
  return (
    <section className="layout">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Museo</footer>

      {/* Contenedor de íconos */}
      <div className="icon-container">
        <MoonFilled style={{ fontSize: "25px" }} />
        <UserOutlined style={{ fontSize: "25px" }} />
        <PoweroffOutlined style={{ fontSize: "25px" }} />
      </div>
    </section>
  );
}

export default App;
