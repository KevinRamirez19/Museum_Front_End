import { useState } from "react";
import { Table, TableProps, Select, Button, Input, Form, notification, Space, Modal } from "antd";
import { BookOutlined, CalendarOutlined, CheckCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import useCategories from "../../../hooks/useCategories";
import "./ExhibitionsScreen.css";

const { Option } = Select;

interface ExhibitionDataType {
  nombre: string;
  fechaDeInicio: number; 
  fechaFinal: number;
  estado: string;
}

function ExhibitionsScreens() {
  const { categories } = useCategories();
  const [data, setData] = useState<ExhibitionDataType[]>([
    { nombre: "Bogotazo", fechaDeInicio: 2005, fechaFinal: 2006, estado: "Nuevo" },
    { nombre: "Jim Green", fechaDeInicio: 2010, fechaFinal: 2012, estado: "Antiguo" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleAddExhibition = async () => {
    try {
      const values = await form.validateFields();
      const newExhibition: ExhibitionDataType = { ...values };
      setData([...data, newExhibition]);
      setIsModalVisible(false);
      form.resetFields();
      notification.success({
        message: 'Exhibición Agregada',
        description: `Se ha agregado la exhibición "${newExhibition.nombre}".`,
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const tableColumns: TableProps<ExhibitionDataType>["columns"] = [
    {
      title: <><BookOutlined style={{ marginRight: 8 }} /> Título</>,
      dataIndex: "nombre",
      key: "nombre",
      render: (text) => <span className="bold-text">{text}</span>,
      width: "30%",
    },
    {
      title: <><CalendarOutlined style={{ marginRight: 8 }} /> Fecha de Inicio</>,
      dataIndex: "fechaDeInicio",
      key: "fechaDeInicio",
      render: (text) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: <><CalendarOutlined style={{ marginRight: 8 }} /> Fecha Final</>,
      dataIndex: "fechaFinal",
      key: "fechaFinal",
      render: (text) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: <><CheckCircleOutlined style={{ marginRight: 8 }} /> Estado</>,
      dataIndex: "estado",
      key: "estado",
      render: (text) => (
        <span className={text === "Nuevo" ? "exhibition-status-new" : "exhibition-status-old"}>
          {text}
        </span>
      ),
      width: "20%",
    },
  ];

  return (
    <div className="exhibitions-container">
      <h2 className="exhibitions-title">Exhibiciones Disponibles</h2>
      <Select
        placeholder="Selecciona una categoría"
        className="category-select"
        dropdownStyle={{ backgroundColor: "#ffffff" }}
      >
        {categories.map((categoria) => (
          <Option key={categoria.idCategoria} value={categoria.idCategoria}>
            {categoria.categoria}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        className="add-exhibition-button"
        icon={<PlusCircleOutlined />}
      >
        Crear Nueva Exhibición
      </Button>

      <Modal
        title={<span style={{ color: "#4caf50" }}><PlusCircleOutlined /> Agregar Nueva Exhibición</span>}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="exhibition-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingresa el nombre de la exhibición' }]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item
            label="Fecha de Inicio"
            name="fechaDeInicio"
            rules={[{ required: true, message: 'Por favor ingresa la fecha de inicio' }]}
          >
            <Input placeholder="Fecha de Inicio" type="number" />
          </Form.Item>
          <Form.Item
            label="Fecha Final"
            name="fechaFinal"
            rules={[{ required: true, message: 'Por favor ingresa la fecha final' }]}
          >
            <Input placeholder="Fecha Final" type="number" />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="estado"
            rules={[{ required: true, message: 'Por favor ingresa el estado' }]}
          >
            <Input placeholder="Estado" />
          </Form.Item>
          <Space>
            <Button type="primary" onClick={handleAddExhibition}>
              Agregar
            </Button>
            <Button onClick={() => setIsModalVisible(false)} danger>
              Cancelar
            </Button>
          </Space>
        </Form>
      </Modal>

      <Table
        columns={tableColumns}
        dataSource={data}
        bordered
        rowKey="nombre"
        pagination={{ pageSize: 5 }}
        className="exhibition-table"
      />
    </div>
  );
}

export default ExhibitionsScreens;
