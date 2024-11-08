import { Menu } from "antd";
import type { MenuProps } from "antd";
import styled from 'styled-components';
import { HomeOutlined, UnorderedListOutlined, AppstoreAddOutlined, UsergroupAddOutlined, FileDoneOutlined, BarsOutlined, LoginOutlined, AppstoreOutlined, TeamOutlined } from '@ant-design/icons'; // Importar TeamOutlined en lugar de EmployeesOutlined

const StyledMenu = styled(Menu)`
  background-color: #fff; /* Fondo blanco */
  border: none; /* Sin borde */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra del menú */

  .ant-menu-item {
    color: #333; /* Color del texto */
    font-weight: bold; /* Texto en negrita */
    transition: transform 0.3s, box-shadow 0.3s; /* Transición para el efecto de flote */

    &:hover {
      transform: translateY(-3px); /* Eleva la pestaña al pasar el mouse */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Sombra más intensa al flotar */
      color: #1890ff; /* Color del texto al pasar el mouse */
    }
  }

  .ant-menu-item a {
    text-decoration: none; /* Sin subrayado en los enlaces */
    display: flex; /* Para alinear icono y texto */
    align-items: center; /* Centrar verticalmente */
  }

  .ant-menu-item svg {
    margin-right: 8px; /* Espaciado entre el ícono y el texto */
  }
`;

type MenuItem = Required<MenuProps>["items"][number];

function Navbar() {
  const itemsNavbar: MenuItem[] = [
    { key: "/", label: <a href="/"><HomeOutlined />Inicio</a> },
    { key: "/Exhibition", label: <a href="/Exhibition"><UnorderedListOutlined />Exhibición</a> },
    { key: "/collectInventory", label: <a href="/collectInventory"><AppstoreAddOutlined />Colección</a> },
    { key: "visitorManagement", label: <a href="/visitorManagement"><UsergroupAddOutlined />Gestión de Visitantes</a> },
    { key: "reports", label: <a href="/reports"><FileDoneOutlined />Reportes</a> },
    { key: "artRooms", label: <a href="/artRooms"><AppstoreOutlined />Cuarto de Arte</a> }, 
    { key: "login", label: <a href="/login"><LoginOutlined />Iniciar Sesión</a> },
    { key: "employees", label: <a href="/employees"><TeamOutlined />Empleados</a> },
  ];

  const handleOnClick: MenuProps["onClick"] = (e) => {
    console.log(e);
  };

  return (
    <StyledMenu mode="horizontal" items={itemsNavbar} onClick={handleOnClick} />
  );
}

export default Navbar;
