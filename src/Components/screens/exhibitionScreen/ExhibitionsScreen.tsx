import { Table, TableProps, Select } from "antd";
import { BookOutlined, CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import useCategories from "../../../hooks/useCategories";


const { Option } = Select;

interface ExhibitionDataType {
  nombre: string;
  fechaDeInicio: number; 
  fechaFinal: number;
  estado: string;
}

function ExhibitionsScreens() {
  const { categories } = useCategories();

  const tableColumns: TableProps<ExhibitionDataType>["columns"] = [
    {
      title: (
        <>
          <BookOutlined style={{ marginRight: 8 }} />
          Título
        </>
      ),
      dataIndex: "nombre",
      key: "nombre",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
      width: "30%",
    },
    {
      title: (
        <>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Fecha de Inicio
        </>
      ),
      dataIndex: "fechaDeInicio",
      key: "fechaDeInicio",
      render: (text) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: (
        <>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Fecha Final
        </>
      ),
      dataIndex: "fechaFinal",
      key: "fechaFinal",
      render: (text) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: (
        <>
          <CheckCircleOutlined style={{ marginRight: 8 }} />
          Estado
        </>
      ),
      dataIndex: "estado",
      key: "estado",
      render: (text) => (
        <span
          style={{
            color: text === "Nuevo" ? "green" : "gray",
            fontWeight: "500",
          }}
        >
          {text}
        </span>
      ),
      width: "20%",
    },
  ];

  const data: ExhibitionDataType[] = [
    {
      nombre: "Bogotazo",
      fechaDeInicio: 2005,
      fechaFinal: 2006,
      estado: "Nuevo",
    },
    {
      nombre: "Jim Green",
      fechaDeInicio: 2010,
      fechaFinal: 2012,
      estado: "Concluido",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Exhibiciones Disponibles
      </h2>
      <Select
        placeholder="Selecciona una categoría"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        {categories.map((categoria) => (
          <Option key={categoria.idCategoria} value={categoria.idCategoria}>
            {categoria.categoria}
          </Option>
        ))}
      </Select>
      <Table
        columns={tableColumns}
        dataSource={data}
        bordered
        rowKey="nombre"
        pagination={{ pageSize: 5 }}
        style={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      />
    </div>
  );
}

export default ExhibitionsScreens;
