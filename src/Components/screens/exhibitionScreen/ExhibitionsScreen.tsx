import { useState, useEffect } from "react";
import { Table, Button, message, Modal } from "antd";
import useExhibitions from "../../../hooks/useExhibition";


interface ArtRoomType {
  artRoomId: number; 
  name: string;
  description: string;
  collection_Id: number; 
}

interface ExhibitionType {
  exhibitionId: number;
  name: string;
  description: string;
  artRoomId: number;
}

function ExhibitionsScreens() {
  const { exhibitions, addExhibition, deleteExhibition, loading } = useExhibition();
  
  // Verificar el contenido de 'exhibitions' proveniente del backend
  console.log("Datos de exhibitions:", exhibitions);

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

  // Verificar el contenido de exhibitionsData
  console.log("Datos de exhibitionsData después de mapear:", exhibitionsData);

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
    Modal.confirm({
      title: "¿Está seguro de que desea eliminar esta exposición?",
      onOk: async () => {
        const success = await deleteExhibition(exhibitionId);
        if (success) {
          message.success("Exposición eliminada exitosamente");
        } else {
          message.error("Error al eliminar la exposición");
        }
      },
      onCancel: () => {
        message.info("La exposición no fue eliminada");
      },
    });
  };

  const handleEditExhibition = (record: ExhibitionDataType) => {
    form.setFieldsValue(record);
    setSelectedExhibition(record);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleShowDetails = (record: ExhibitionDataType) => {
    setSelectedExhibition(record);  // Asigna la exhibición seleccionada al estado
    setDetailsModalVisible(true);  // Muestra el modal de detalles
  };

  // Columnas de las exposiciones
  const exhibitionColumns = [
    { title: "Nombre de la Exposición", dataIndex: "name", key: "name" },
    { title: "Descripción de la Exposición", dataIndex: "description", key: "description" },
    {
      title: "Sala a la que pertenece",
      dataIndex: "artRoom",
      key: "artRoomId",
      render: (artRoom: ArtRoomType) => artRoom?.artRoomId, // Mostrar artRoomId
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: ExhibitionType) => (
        <Button onClick={() => handleDeleteExhibition(record.exhibitionId)} danger>
          Eliminar
        </Button>
      ),
    },
  ];

  // Columnas de las salas de arte (artRoom)
  const artRoomColumns = [
    {
      title: "Nº Sala",
      dataIndex: "artRoomId",
      key: "artRoomId",
    },
    { title: "Nombre de la Sala", dataIndex: "name", key: "name" },
    { title: "Descripción de la Sala", dataIndex: "description", key: "description" },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: ArtRoomType) => (
        <Button onClick={() => handleDeleteArtRoom(record.artRoomId)} danger>
          Eliminar
        </Button>
      ),
    },
  ];

  if (loading) return <div>Cargando exposiciones...</div>;
  if (error) return <div>{error}</div>;

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

      {/* Modal para agregar o actualizar una exhibición */}
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
            rules={[{ required: true, message: 'Por favor ingresa el nombre de la exhibición' }]} >
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item
            label="Fecha de Inicio"
            name="fechaDeInicio"
            rules={[{ required: true, message: 'Por favor ingresa la fecha de inicio' }]} >
            <Input placeholder="Fecha de Inicio" type="text" />
          </Form.Item>
          <Form.Item
            label="Fecha Final"
            name="fechaFinal"
            rules={[{ required: true, message: 'Por favor ingresa la fecha final' }]} >
            <Input placeholder="Fecha Final" type="text" />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="estado"
            rules={[{ required: true, message: 'Por favor ingresa el estado' }]} >
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

      {/* Modal para ver detalles de la exhibición */}
      <Modal
        title="Detalles de la Exhibición"
        visible={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={null}
        className="exhibition-details-modal"
      >
        {selectedExhibition ? (
          <div>
            <p><strong>Nombre:</strong> {selectedExhibition.nombre}</p>
            <p><strong>Fecha de Inicio:</strong> {selectedExhibition.fechaDeInicio}</p>
            <p><strong>Fecha Final:</strong> {selectedExhibition.fechaFinal}</p>
            <p><strong>Estado:</strong> {selectedExhibition.estado}</p>
            <p><strong>Descripción:</strong> {selectedExhibition.description}</p>
            <p><strong>Sala:</strong> {selectedExhibition.artRoom.name}</p>
          </div>
        ) : (
          <p>No se han seleccionado detalles de la exhibición.</p>
        )}
      </Modal>

      <Table
        columns={tableColumns}
        dataSource={exhibitionsData}
        rowKey="exhibitionId"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ExhibitionManagementScreen;
