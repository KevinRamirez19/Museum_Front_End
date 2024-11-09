import { useState } from "react";
import { Table, Button, message, Modal, Input, Form, Select } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useArtObjects from "../../../hooks/useArtObject";

const { Column } = Table;
const { Search } = Input;

const ArtObjectsScreen = () => {
  const { artObjects, loading, error, deleteArtObject, createArtObject, exhibitions, categories, states } = useArtObjects();
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState(""); // Filtro por nombre
  const [artistText, setArtistText] = useState(""); // Filtro por artista
  const [creationDateText, setCreationDateText] = useState(""); // Filtro por fecha de creación
  const [stateText, setStateText] = useState(""); // Filtro por estado
  const [originText, setOriginText] = useState(""); // Filtro por origen
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const newArtObject = await form.validateFields();
      await createArtObject(newArtObject);
      message.success("Objeto de arte creado exitosamente.");
      closeModal();
    } catch (err) {
      message.error("Error al crear el objeto de arte.");
    }
  };

  const confirmDelete = (record: any) => {
    Modal.confirm({
      title: `¿Está seguro de que desea eliminar el objeto de arte "${record.name}"?`,
      okText: "Sí",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteArtObject(record.artObjectId);
          message.success("Objeto de arte eliminado exitosamente.");
        } catch (err) {
          message.error("Error al eliminar el objeto de arte.");
        }
      },
    });
  };

  // Filtrar por nombre, artista, fecha de creación, estado y origen
  const filteredArtObjects = artObjects.filter(
    (artObject) =>
      artObject.name.toLowerCase().includes(searchText.toLowerCase()) && // Filtro por nombre
      artObject.artist.toLowerCase().includes(artistText.toLowerCase()) && // Filtro por artista
      artObject.creationDate.toLowerCase().includes(creationDateText.toLowerCase()) && // Filtro por fecha de creación
      (states.find((state) => state.stateId === artObject.state_Id)?.state.toLowerCase().includes(stateText.toLowerCase()) || true) && // Filtro por estado
      artObject.origin.toLowerCase().includes(originText.toLowerCase()) // Filtro por origen
  );

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Gestión de Objetos de Arte</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", width: "100%" }}>
          <Search
            placeholder="Buscar por nombre"
            onChange={(e) => setSearchText(e.target.value)} // Filtro por nombre
            style={{ width: "48%", marginRight: "4%" }}
          />
          <Search
            placeholder="Buscar por origen"
            onChange={(e) => setOriginText(e.target.value)} // Filtro por origen
            style={{ width: "48%" }}
          />
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Agregar Objeto de Arte
        </Button>
      </div>

      <Table dataSource={filteredArtObjects} rowKey="artObjectId" pagination={{ pageSize: 5 }}>
        <Column title="Nombre" dataIndex="name" key="name" />
        <Column title="Descripción" dataIndex="description" key="description" />
        <Column title="Artista" dataIndex="artist" key="artist" />
        <Column title="Fecha de Creación" dataIndex="creationDate" key="creationDate" />
        <Column title="Origen" dataIndex="origin" key="origin" />
        <Column
          title="Estado"
          key="state_Id"
          render={(_, record) => {
            const state = states.find((state) => state.stateId === record.state_Id);
            return state ? state.state : "Sin Estado";
          }}
        />
        <Column
          title="Acciones"
          key="actions"
          render={(_, record) => (
            <Button onClick={() => confirmDelete(record)} icon={<DeleteOutlined />} danger />
          )}
        />
      </Table>

      <Modal
        title="Agregar Nuevo Objeto de Arte"
        open={isModalOpen} // Cambiado de `visible` a `open`
        onCancel={closeModal}
        onOk={handleCreate}
        okText="Crear"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nombre" rules={[{ required: true, message: "Por favor ingrese el nombre" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Descripción" rules={[{ required: true, message: "Por favor ingrese la descripción" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="artist" label="Artista" rules={[{ required: true, message: "Por favor ingrese el artista" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="creationDate" label="Fecha de Creación" rules={[{ required: true, message: "Por favor ingrese la fecha de creación" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="origin" label="Origen" rules={[{ required: true, message: "Por favor ingrese el origen" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cost" label="Costo" rules={[{ required: true, message: "Por favor ingrese el costo" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="exhibition_Id" label="Exhibición" rules={[{ required: true, message: "Por favor seleccione la exhibición" }]}>
            <Select>
              {exhibitions.map((exhibition) => (
                <Select.Option key={exhibition.exhibitionId} value={exhibition.exhibitionId}>
                  {exhibition.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="categoryId" label="Categoría" rules={[{ required: true, message: "Por favor seleccione la categoría" }]}>
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.categoryId} value={category.categoryId}>
                  {category.category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="state_Id" label="Estado" rules={[{ required: true, message: "Por favor seleccione el estado" }]}>
            <Select>
              {states.map((state) => (
                <Select.Option key={state.stateId} value={state.stateId}>
                  {state.state}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ArtObjectsScreen;
