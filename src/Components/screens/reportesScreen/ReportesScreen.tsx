import { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import useCategories from "../../../hooks/useCategories";
import "./ReportesScreen.css"
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

function ReportesScreen() {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");

  const data: CollectionDataType[] = [
    { nombre: "Bogotazo", categoria: "Historia", año: 1515, locacion: "museo", EstadodeConservacion: "Dañado" },
    { nombre: "Batalla de Boyacá", categoria: "Historia", año: 1819, locacion: "museo", EstadodeConservacion: "Buen estado" },
    { nombre: "Guerra de los mil días", categoria: "Historia", año: 1899, locacion: "museo", EstadodeConservacion: "Regular" },
    { nombre: "Frente Nacional", categoria: "Historia", año: 1958, locacion: "museo", EstadodeConservacion: "Dañado" },
    { nombre: "La masacre de las bananeras", categoria: "Historia", año: 1928, locacion: "museo", EstadodeConservacion: "Buen estado" },
    { nombre: "La Patria Boba", categoria: "Historia", año: 1810, locacion: "museo", EstadodeConservacion: "Dañado" },
    { nombre: "El Conflicto Armado Interno", categoria: "Arqueologia", año: 1960, locacion: "museo", EstadodeConservacion: "Dañado" },
  ];

  // Filtrar datos por categoría seleccionada
  const filteredData = selectedCategory
    ? data.filter(item => item.categoria === selectedCategory)
    : data;

  // Crear datos para la gráfica de pastel
  const conservationStatusCounts = filteredData.reduce((acc, item) => {
    acc[item.EstadodeConservacion] = (acc[item.EstadodeConservacion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.keys(conservationStatusCounts).map((status) => ({
    name: status,
    value: conservationStatusCounts[status],
  }));

  const tableKeys: TableProps<CollectionDataType>["columns"] = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Categoría", dataIndex: "categoria", key: "categoria" },
    { title: "Año", dataIndex: "año", key: "año" },
    { title: "Locación", dataIndex: "locacion", key: "locacion" },
    { title: "Estado de Conservación", dataIndex: "EstadodeConservacion", key: "EstadodeConservacion" },
  ];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <h1>Reporte de estado de las colecciones</h1>

      <label htmlFor="categorySelect">Selecciona una categoría:</label>
      <select id="categorySelect" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Todas</option>
        {categories.map((categoria) => (
          <option key={categoria.idCategoria} value={categoria.categoria}>
            {categoria.categoria}
          </option>
        ))}
      </select>

      <Table columns={tableKeys} dataSource={filteredData} rowKey="nombre" />

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
            {pieChartData.map((_, index) => (  // Solo usar el índice aquí
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

export default ReportesScreen;
