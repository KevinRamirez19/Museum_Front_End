import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import useCategories from "../../../hooks/useCategories";
import useGenderData from "../../../hooks/useGender"; // Importamos el hook
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CollectionDataType {
  nombre: string;
  categoria: "Historia" | "Arqueologia" | "Biologia";
  año: number;
  locacion: string;
  EstadodeConservacion: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function CollectionInventoryScreen() {
  const { categories } = useCategories();
  const genderData = useGenderData(); // Usamos el hook para obtener los datos de género

  // Datos de ejemplo para la primera gráfica de "Estado de Conservación"
  const data: CollectionDataType[] = [
    { nombre: "Bogotazo", categoria: "Historia", año: 1515, locacion: "museo", EstadodeConservacion: "Dañado" },
    { nombre: "Batalla de boyaca", categoria: "Historia", año: 1515, locacion: "museo", EstadodeConservacion: "Buen estado" },
    { nombre: "Guerra de los mil dias", categoria: "Historia", año: 1515, locacion: "museo", EstadodeConservacion: "Regular" },
    { nombre: "Frente Nacional", categoria: "Historia", año: 1515, locacion: "museo", EstadodeConservacion: "Dañado" },
    { nombre: "La masacre de las bananeras", categoria: "Historia", año: 1515, locacion: "museo", EstadodeConservacion: "Buen estado" },
    { nombre: "La Patria Boba", categoria: "Historia", año: 1515, locacion: "museo", EstadodeConservacion: "Dañado" },
    { nombre: "El Conflicto Armado Interno", categoria: "Arqueologia", año: 1515, locacion: "museo", EstadodeConservacion: "Dañado" },
  ];

  // Crear datos para la gráfica de pastel "Estado de Conservación"
  const conservationStatusCounts = data.reduce((acc, item) => {
    acc[item.EstadodeConservacion] = (acc[item.EstadodeConservacion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.keys(conservationStatusCounts).map((status) => ({
    name: status,
    value: conservationStatusCounts[status],
  }));

  // Configuración de columnas para la tabla
  const tableKeys: TableProps<CollectionDataType>["columns"] = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Categoría", dataIndex: "categoria", key: "categoria" },
    { title: "Año", dataIndex: "año", key: "año" },
    { title: "Locación", dataIndex: "locacion", key: "locacion" },
    { title: "Estado de Conservación", dataIndex: "EstadodeConservacion", key: "EstadodeConservacion" },
  ];

  return (
    <>
      <h1>Reporte del estado de las colecciones</h1>

      {/* Dropdown de categorías */}
      <select name="categorias" id="categorias">
        {categories.map((categoria) => (
          <option key={categoria.idCategoria}>{categoria.categoria}</option>
        ))}
      </select>

      {/* Tabla de inventario */}
      <Table columns={tableKeys} dataSource={data} />

      {/* Gráfica de pastel para Estado de Conservación */}
      <h3>Estado de Conservación</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Gráfica de pastel para División por Géneros */}
      <h3>División por Géneros</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={genderData} // Usamos los datos de género aquí
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default CollectionInventoryScreen;
