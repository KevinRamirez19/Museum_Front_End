import { useState } from "react";
import { Table, Select, Button, Input, Form, notification, Space, Modal } from "antd";
import { BookOutlined, CalendarOutlined, CheckCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./ExhibitionsScreen.css";
import { useExhibition } from "../../../hooks/useExhibition";

const { Option } = Select;

interface ArtRoomType {
  artRoomId: number;
  location_Id: number;
  collection_Id: number;
  name: string;
  description: string;
  numberExhibitions: string;
}

interface ExhibitionDataType {
  exhibitionId: number;
  nombre: string;
  fechaDeInicio: string;
  fechaFinal: string;
  estado: string;
  artRoom: ArtRoomType;
  name: string;
  description: string;
  artRoomId: number;
}

function ExhibitionsScreens() {
  const { exhibitions, addExhibition, deleteExhibition, loading } = useExhibition();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [selectedExhibition, setSelectedExhibition] = useState<ExhibitionDataType | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Mapea los datos para asegurar el tipo ExhibitionDataType
  const exhibitionsData: ExhibitionDataType[] = exhibitions.map(exhibition => ({
    exhibitionId: exhibition.exhibitionId,
    nombre: exhibition.nombre || "Nombre predeterminado",
    fechaDeInicio: exhibition.fechaDeInicio || "Fecha de inicio predeterminada",
    fechaFinal: exhibition.fechaFinal || "Fecha final predeterminada",
    estado: exhibition.estado || "Estado predeterminado",
    artRoom: exhibition.artRoom || {
      artRoomId: 1,
      location_Id: 1,
      collection_Id: 1,
      name: "Sala predeterminada",
      description: "Descripción predeterminada",
      numberExhibitions: "0",
    },
    name: exhibition.name || "Nombre predeterminado",
    description: exhibition.description || "Descripción predeterminada",
    artRoomId: exhibition.artRoomId || 1,
  }));

  const handleAddOrUpdateExhibition = async () => {
    try {
      const values = await form.validateFields();
      const newExhibition: ExhibitionDataType = { 
        ...values, 
        exhibitionId: Date.now(),
        artRoom: {
          artRoomId: 1,
          location_Id: 1,
          collection_Id: 1,
          name: "Sala Principal",
          description: "Sala principal del museo",
          numberExhibitions: "10",
        },
        name: values.nombre,
        description: values.description || "Descripción de la exhibición",
        artRoomId: 1,
      };

      if (isEditing && selectedExhibition) {
        notification.success({
          message: 'Exhibición Actualizada',
          description: `Se ha actualizado la exhibición "${newExhibition.nombre}".`,
        });
      } else {
        addExhibition(newExhibition);
        notification.success({
          message: 'Exhibición Agregada',
          description: `Se ha agregado la exhibición "${newExhibition.nombre}".`,
        });
      }

      setIsModalVisible(false);
      form.resetFields();
      setSelectedExhibition(null);
      setIsEditing(false);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleDeleteExhibition = (exhibitionId: number) => {
    deleteExhibition(exhibitionId);
    notification.success({
      message: 'Exhibición Eliminada',
      description: `Se ha eliminado la exhibición.`,
    });
  };

  const handleEditExhibition = (record: ExhibitionDataType) => {
    form.setFieldsValue(record);
    setSelectedExhibition(record);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleShowDetails = (record: ExhibitionDataType) => {
    setSelectedExhibition(record);
    setDetailsModalVisible(true);
  };

  const tableColumns = [
    {
      title: <><BookOutlined style={{ marginRight: 8 }} /> Título</>,
      dataIndex: "nombre",
      key: "nombre",
      render: (text: string) => <span className="bold-text">{text}</span>,
      width: "30%",
    },
    {
      title: <><CalendarOutlined style={{ marginRight: 8 }} /> Fecha de Inicio</>,
      dataIndex: "fechaDeInicio",
      key: "fechaDeInicio",
      render: (text: string) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: <><CalendarOutlined style={{ marginRight: 8 }} /> Fecha Final</>,
      dataIndex: "fechaFinal",
      key: "fechaFinal",
      render: (text: string) => <span>{text}</span>,
      width: "20%",
    },
    {
      title: <><CheckCircleOutlined style={{ marginRight: 8 }} /> Estado</>,
      dataIndex: "estado",
      key: "estado",
      render: (text: string) => (
        <span className={text === "Nuevo" ? "exhibition-status-new" : "exhibition-status-old"}>
          {text}
        </span>
      ),
      width: "20%",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: any, record: ExhibitionDataType) => (
        <Space>
          <Button type="primary" onClick={() => handleShowDetails(record)}>Detalles</Button>
          <Button onClick={() => handleEditExhibition(record)}>Editar</Button>
          <Button danger onClick={() => handleDeleteExhibition(record.exhibitionId)}>Eliminar</Button>
        </Space>
      ),
      width: "30%",
    },
  ];

  return (
    <div className="exhibitions-container">
      <h2 className="exhibitions-title">Exhibiciones Disponibles</h2>
      <Select
        placeholder="Selecciona una exhibición"
        className="category-select"
        dropdownStyle={{ backgroundColor: "#ffffff" }}
      >
        {exhibitionsData.map((exhibition) => (
          <Option key={exhibition.exhibitionId} value={exhibition.exhibitionId}>
            {exhibition.name}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        onClick={() => { setIsModalVisible(true); setIsEditing(false); form.resetFields(); }}
        className="add-exhibition-button"
        icon={<PlusCircleOutlined />}
      >
        Crear Nueva Exhibición
      </Button>

      <Modal
        title={<span style={{ color: "#4caf50" }}>{isEditing ? "Actualizar Exhibición" : "Agregar Nueva Exhibición"}</span>}
        visible={isModalVisible}
        onCancel={() => { setIsModalVisible(false); setIsEditing(false); form.resetFields(); }}
        footer={null}
        className="exhibition-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingresa el nombre de la exhibición' }]}>
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item
            label="Fecha de Inicio"
            name="fechaDeInicio"
            rules={[{ required: true, message: 'Por favor ingresa la fecha de inicio' }]}>
            <Input placeholder="Fecha de Inicio" type="text" />
          </Form.Item>
          <Form.Item
            label="Fecha Final"
            name="fechaFinal"
            rules={[{ required: true, message: 'Por favor ingresa la fecha final' }]}>
            <Input placeholder="Fecha Final" type="text" />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="estado"
            rules={[{ required: true, message: 'Por favor ingresa el estado' }]}>
            <Input placeholder="Estado" />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="description">
            <Input.TextArea placeholder="Descripción de la exhibición" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleAddOrUpdateExhibition}
              block>
              {isEditing ? "Actualizar" : "Agregar"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table<ExhibitionDataType>
        columns={tableColumns}
        dataSource={exhibitionsData}  // Usa exhibitionsData en lugar de exhibitions
        loading={loading}
        rowKey="exhibitionId"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ExhibitionsScreens;
