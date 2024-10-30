
import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import {MoonFilled, UserOutlined, PoweroffOutlined} from"@ant-design/icons";
function App() {
  return (
    <section className="layout">
      <header>
        <Navbar />
      </header>
      <main>
      <MoonFilled style={{fontSize : '25px',  display: 'flex', gap: '15px',flexDirection : 'column'  }}/>
      <UserOutlined style={{fontSize : '25px', display: 'flex', gap: '10px',flexDirection : 'column'  }}/>
      <PoweroffOutlined style={{fontSize : '25px', display: 'flex', gap: '10px',flexDirection : 'column' }}/>
        <Outlet />
      </main>
      <footer>Museo</footer>
    </section>
  );
}

export default App;