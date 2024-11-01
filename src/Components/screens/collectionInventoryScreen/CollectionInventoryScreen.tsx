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

function CollectionInventoryScreen() {
  const { categories } = useCategories();
  const tableKeys: TableProps<CollectionDataType>["columns"] = [
    {
      title: "nombre",
      dataIndex: "nombre",
      key: "nombre",
      
    },
    {
      title: "categoria",
      dataIndex: "categoria",
      key: "categoria",
      
    },
    {
      title: "año",
      dataIndex: "año",
      key: "año",
      
    },
    {
      title: "locacion",
      dataIndex: "locacion",
      key: "locacion",
      
    },
    {
      title: "EstadodeConservacion",
      dataIndex: "EstadodeConservacion",
      key: "EstadodeConservacion",
      
    },
  ];
  const data: CollectionDataType[] = [
    {
      nombre: "Bogotazo",
      categoria: "Historia",
      año: 1515,
      locacion: "museo",  
      EstadodeConservacion: "Dañado",
    },
    {
      nombre: "Batalla de boyaca",
      categoria: "Historia",
      año: 1515,
      locacion: "museo",
      EstadodeConservacion: "Buen estado",
    },
    {
      nombre: "Guerra de los mil dias ",
      categoria: "Historia",
      año: 1515,
      locacion: "museo",
      EstadodeConservacion: "Regular",
    },
    {
      nombre: "Frente Nacional",
      categoria: "Historia",
      año: 1515,
      locacion: "museo",
      EstadodeConservacion: "Dañado",
    },
    {
      nombre: "La masacre de las bananeras",
      categoria: "Historia",
      año: 1515,
      locacion: "museo",
      EstadodeConservacion: "Buen estado",
    },
    {
      nombre: "La Patria Boba",
      categoria: "Historia",
      año: 1515,
      locacion: "museo",
      EstadodeConservacion: "Dañado",
    },
    {
      nombre: "El Conflicto Armado Interno",
      categoria: "Arqueologia",
      año: 1515,
      locacion: "museo",
      EstadodeConservacion: "Dañado",
    },  
  ];
  return (
    <>
      <select name="" id="">
        {categories.map((categoria) => (
          <option key={categoria.idCategoria}>{categoria.categoria}</option>
        ))}
      </select>
      <Table columns={tableKeys} dataSource={data} />
    </>
  );
}

export default CollectionInventoryScreen;
