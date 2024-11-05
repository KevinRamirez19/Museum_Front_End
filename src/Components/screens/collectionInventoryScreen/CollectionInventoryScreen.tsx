import React, { useState } from "react";
import { Table, Input, Button, Popconfirm, message, Modal, Form } from "antd";
import axios from "axios";
import useCollections from "../../../hooks/useCollection";
import "./CollectionInventoryScreen.css";

const CollectionTable = () => {
  const { collections, deleteCollection } = useCollections();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCollection, setNewCollection] = useState({ name: "", descriptiom: "" });

  // Filtrar datos de colecciones por nombre
  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Configuración de columnas de la tabla
  const collectionColumns = [
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Descripción", dataIndex: "descriptiom", key: "descriptiom" },
    {
      title: "Acciones",
      key: "actions",
      render: (text: any, record: any) => (
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
      ),
    },
  ];

  // Función para eliminar la colección
  const handleDelete = async (collectionId: number) => {
    const success = await deleteCollection(collectionId);
    if (success) {
      message.success("Colección eliminada correctamente.");
    } else {
      message.error("No se pudo eliminar la colección.");
    }
  };

  // Función para mostrar el modal de agregar colección
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Función para manejar el envío del formulario y agregar la colección
  const handleAddCollection = async () => {
    try {
      const response = await axios.post("https://nationalmuseum2.somee.com/api/Collection", newCollection, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      message.success("Colección agregada correctamente.");
      setIsModalVisible(false);
      setNewCollection({ name: "", descriptiom: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(`Error al agregar la colección: ${error.response?.data?.message || error.message}`);
      } else {
        message.error("Error desconocido.");
      }
      console.error("Error al agregar la colección:", error);
    }
  };

  return (
    <div>
      <Input
        placeholder="Buscar colección por nombre"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Button type="primary" onClick={showModal} style={{ marginBottom: 20 }}>
        Agregar Colección
      </Button>
      <Table
        columns={collectionColumns}
        dataSource={filteredCollections}
        rowKey="collectionId"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal para agregar colección */}
      <Modal
        title="Agregar Nueva Colección"
        visible={isModalVisible}
        onOk={handleAddCollection}
        onCancel={() => setIsModalVisible(false)}
        okText="Agregar"
        cancelText="Cancelar"
      >
        <Form layout="vertical">
          <Form.Item label="Nombre">
            <Input
              value={newCollection.name}
              onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Descripción">
            <Input
              value={newCollection.descriptiom}
              onChange={(e) => setNewCollection({ ...newCollection, descriptiom: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CollectionTable;
