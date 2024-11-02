import { useState } from "react";
import { Table, TableProps, Select, Button, Input, Form, notification, Space, Modal } from "antd";
import { BookOutlined, CalendarOutlined, CheckCircleOutlined, PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
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
      estado: "Antiguo",
    },
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

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto", backgroundColor: "#f0f2f5" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1890ff" }}>
        Exhibiciones Disponibles
      </h2>
      <Select
        placeholder="Selecciona una categoría"
        style={{ width: "100%", marginBottom: "20px" }}
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
        style={{ marginBottom: "20px", backgroundColor: "#52c41a", borderColor: "#52c41a" }}
        icon={<PlusCircleOutlined />}
      >
        Crear Nueva Exhibición
      </Button>

      <Modal
        title={<span style={{ color: "#1890ff" }}><PlusCircleOutlined /> Agregar Nueva Exhibición</span>}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingresa el nombre de la exhibición' }]}
          >
            <Input placeholder="Nombre" style={{ borderRadius: "8px" }} />
          </Form.Item>
          <Form.Item
            label="Fecha de Inicio"
            name="fechaDeInicio"
            rules={[{ required: true, message: 'Por favor ingresa la fecha de inicio' }]}
          >
            <Input placeholder="Fecha de Inicio" type="number" style={{ borderRadius: "8px" }} />
          </Form.Item>
          <Form.Item
            label="Fecha Final"
            name="fechaFinal"
            rules={[{ required: true, message: 'Por favor ingresa la fecha final' }]}
          >
            <Input placeholder="Fecha Final" type="number" style={{ borderRadius: "8px" }} />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="estado"
            rules={[{ required: true, message: 'Por favor ingresa el estado' }]}
          >
            <Input placeholder="Estado" style={{ borderRadius: "8px" }} />
          </Form.Item>
          <Space>
            <Button type="primary" onClick={handleAddExhibition} style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}>
              Agregar
            </Button>
            <Button onClick={() => setIsModalVisible(false)} style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }} icon={<CloseCircleOutlined />}>
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
        style={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      />
    </div>
  );
}

export default ExhibitionsScreens;
