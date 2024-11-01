import { Menu } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function Navbar() {
  const itemsNavbar: MenuItem[] = [
    { key: "/", label: <a href="/">Inicio</a> },

    { key: "/Exhibition", label: <a href="/Exhibition">Exhibicion</a> },
    {
      key: "/collectInventory",
      label: <a href="/collectInventory">Coleccion</a>,
    },
    {
      key: "visitorManagement",
      label: <a href="/visitorManagement">Visitante de gestión</a>,
    },
    {
      key: "reports",
      label: <a href="/reports">Reportes</a>,
    },
    { key: "settings", label: <a href="/settings">Ajustes</a> },
    { key: "login", label: <a href="/login">Iniciar Sesion</a> },
  ];

  const handleOnClick: MenuProps["onClick"] = (e) => {
    console.log(e);
  };

  return <Menu mode="horizontal" items={itemsNavbar} onClick={handleOnClick} />;
}

export default Navbar;
