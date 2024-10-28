import { Menu } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function Navbar() {
  const itemsNavbar: MenuItem[] = [
    { key: "/", label: <a href="/">home</a> },

    { key: "/Exhibition", label: <a href="/Exhibition">Exhibition</a> },
    {
      key: "/collectInventory",
      label: <a href="/collectInventory">Collections</a>,
    },
    {
      key: "visitorManagement",
      label: <a href="/visitorManagement">visitorManagement</a>,
    },
    { key: "reports", label: <a href="/reports">reports</a> },
    { key: "settings", label: <a href="/settings">settings</a> },
    { key: "login", label: <a href="/login">login</a> },
  ];

  const handleOnClick: MenuProps["onClick"] = (e) => {
    console.log(e);
  };

  return <Menu mode="horizontal" items={itemsNavbar} onClick={handleOnClick} />;
}

export default Navbar;
