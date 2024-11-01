import { Table } from "antd";
import type { TableProps } from "antd";
import useCategories from "../../../hooks/useCategories";


interface CollectionDataType {
  nombre: string;
  categoria: "Historia" | "Arqueologia" | "Biologia";
  año: number;
  locacion: string;
  EstadodeConservacion: string;
}

const ReportesScreen: React.FC = () => {
  const { categories } = useCategories();

  const tableKeys: TableProps<CollectionDataType>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Año",
      dataIndex: "año",
      key: "año",
    },
    {
      title: "Locacion",
      dataIndex: "locacion",
      key: "locacion",
    },
    {
      title: "Estado de Conservacion",
      dataIndex: "EstadodeConservacion",
      key: "EstadodeConservacion",
    },
  ];

  const data: CollectionDataType[] = [
    {
      nombre: "Bogotazo",
      categoria: "Historia",
      año: 1515,
      locacion: "Museo",
      EstadodeConservacion: "Dañado",
    },
    {
      nombre: "Batalla de Boyacá",
      categoria: "Historia",
      año: 1515,
      locacion: "Museo",
      EstadodeConservacion: "Buen estado",
    },
    {
      nombre: "Guerra de los mil días",
      categoria: "Historia",
      año: 1515,
      locacion: "Museo",
      EstadodeConservacion: "Regular",
    },
    {
      nombre: "Frente Nacional",
      categoria: "Historia",
      año: 1515,
      locacion: "Museo",
      EstadodeConservacion: "Dañado",
    },
    {
      nombre: "La masacre de las bananeras",
      categoria: "Historia",
      año: 1515,
      locacion: "Museo",
      EstadodeConservacion: "Buen estado",
    },
    {
      nombre: "La Patria Boba",
      categoria: "Historia",
      año: 1515,
      locacion: "Museo",
      EstadodeConservacion: "Dañado",
    },
    {
      nombre: "El Conflicto Armado Interno",
      categoria: "Arqueologia",
      año: 1515,
      locacion: "Museo",
      EstadodeConservacion: "Dañado",
    },
  ];

  return (
    <>
      <select name="categories" id="categories">
        {categories.map((categoria) => (
          <option key={categoria.idCategoria} value={categoria.categoria}>
            {categoria.categoria}
          </option>
        ))}
      </select>
      <Table columns={tableKeys} dataSource={data} />
    </>
  );
};

export default ReportesScreen;
