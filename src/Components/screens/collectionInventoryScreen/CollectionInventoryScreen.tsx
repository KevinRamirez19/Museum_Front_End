import { useState } from "react";
import { Table, Input, Button, Popconfirm, message, Modal, Form } from "antd";
import useCollections from "../../../hooks/useCollection";
import { useAuth } from "../../../Context/AuthContext";
import "./CollectionInventoryScreen.css";
import { Collection } from "../../../hooks/useCollection";

const CollectionTable = () => {
  const { collections, deleteCollection, updateCollection, addCollection } = useCollections();
  const { state } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  // Filtrar colecciones por nombre
  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Mostrar modal para editar una colección
  const showEditModal = (collection: Collection) => {
    setEditingCollection(collection);
    setIsEditing(true);
    setIsModalOpen(true);
    form.setFieldsValue(collection);
  };

  // Manejar la actualización de una colección
  const handleUpdateCollection = async () => {
    try {
      const updatedCollection = await form.validateFields();
      if (editingCollection) {
        const success = await updateCollection({ ...editingCollection, ...updatedCollection });
        if (success) {
          message.success("Colección actualizada correctamente.");
          closeModal();
        } else {
          message.error("Error al actualizar la colección.");
        }
      }
    } catch {
      message.error("Por favor complete todos los campos requeridos.");
    }
  };

  // Mostrar modal para agregar una nueva colección
  const showModal = () => {
    setIsEditing(false);
    setIsModalOpen(true);
    form.resetFields();
  };

  // Manejar la creación de una nueva colección
  const handleAddCollection = async () => {
    try {
      const newCollection = await form.validateFields();
      const success = await addCollection(newCollection);
      if (success) {
        message.success("Colección agregada correctamente.");
        closeModal();
      } else {
        message.error("Error al agregar la colección.");
      }
    } catch {
      message.error("Por favor complete todos los campos requeridos.");
    }
  };

  // Cerrar modal y resetear formulario
  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingCollection(null);
  };

  // Manejar la eliminación de una colección
  const handleDelete = async (collectionId: number) => {
    const success = await deleteCollection(collectionId);
    if (success) {
      message.success("Colección eliminada correctamente.");
    } else {
      message.error("No se pudo eliminar la colección.");
    }
  };

  // Columnas de la tabla
  const collectionColumns = [
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Descripción", dataIndex: "descriptiom", key: "descriptiom" },
    {
      title: "Acciones",
      key: "actions",
      render: (_: any, record: Collection) => (
        <>
          {/* Permitir acciones solo si el usuario es Admin (tipo 1) */}
          {state.user?.userType === 1 && (
            <>
              <Button type="link" onClick={() => showEditModal(record)}>
                Editar
              </Button>
              <Popconfirm
                title="¿Estás seguro de eliminar esta colección?"
                onConfirm={() => handleDelete(record.collectionId)}
                okText="Sí"
                cancelText="No"
              >
                <Button type="link" danger>
                  Eliminar
                </Button>
              </Popconfirm>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Buscar colección por nombre"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />

      {/* Permitir agregar colección si el usuario es Admin (tipo 1) o de tipo 5 */}
      {(state.user?.userType === 1 || state.user?.userType === 5) && (
        <Button type="primary" onClick={showModal} style={{ marginBottom: 20 }}>
          Agregar Colección
        </Button>
      )}

      <Table
        columns={collectionColumns}
        dataSource={filteredCollections}
        rowKey="collectionId"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? "Editar Colección" : "Agregar Nueva Colección"}
        open={isModalOpen}
        onOk={isEditing ? handleUpdateCollection : handleAddCollection}
        onCancel={closeModal}
        okText={isEditing ? "Actualizar" : "Agregar"}
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingrese el nombre de la colección" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descriptiom"
            label="Descripción"
            rules={[{ required: true, message: "Por favor ingrese la descripción" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CollectionTable;
