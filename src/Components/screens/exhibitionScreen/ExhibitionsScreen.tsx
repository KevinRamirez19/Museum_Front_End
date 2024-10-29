import { Table, TableProps } from "antd";
import useCategories from "../../../hooks/useCategories";


interface ExhibitionDataType {
  nombre : string;
  FechaDeInicio : number 
  fechaFinal : number;
  estado : string
}

function ExhibitionsScreens() {
  const { categories } = useCategories();
  const tablekeys: TableProps<ExhibitionDataType>["columns"] = [
    {
      title: "Titulo",
    dataIndex: "Titulo",
    key: "Titulo",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "FechaDeInicio",
    key: "FechaDeInicio",
    dataIndex: "FechaDeInicio",
    render: (text) => <a>{text}</a>,

  },
  {
    title: "FechaFinal",
    key: "FechaFinal",
    dataIndex: "FechaFinal",
    render: (text) => <a>{text}</a>,

  },
  {
    title: "Estado",
    key: "Estado",
    dataIndex: "Estado",
    render: (text) => <a>{text}</a>,
  },
  ];
  const  data: ExhibitionDataType[] = [
    {
  
    nombre: "Bogotazo",
    FechaDeInicio: 2005,
    fechaFinal: 2004,
    estado: "Nuevo",
  },
  {
    
    nombre: "Jim Green",
    FechaDeInicio: 42,
    fechaFinal: 42,
    estado: "London No. 1 Lake Park",
  },
  {
    
    nombre: "asdasda",
    FechaDeInicio: 42,
    fechaFinal: 42,
    estado: "asdasd",
  },
  {
    
    nombre: "Jim Green",
    FechaDeInicio: 42,
    fechaFinal: 42,
    estado: "London No. 1 Lake Park",
  },
  ]
    return(
    <>
    <select name="" id="">
      {categories.map((categoria) => (
        <option key={categoria.idCategoria}>{categoria.categoria}</option>
      ))}
    </select>
    <Table columns={tablekeys} dataSource={data} />
  </>
);
}

export default ExhibitionsScreens;