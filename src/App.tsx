
import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import { Outlet } from "react-router-dom";
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
    </section>
  );
}

export default App;