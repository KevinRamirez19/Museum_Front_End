import React, { useState } from "react";
import { Table, Input, Button, Popconfirm, message, Modal, Form } from "antd";
import axios from "axios";
import useCollections from "../../../hooks/useCollection";
import "./CollectionInventoryScreen.css";
import { Collection } from "../../../hooks/useCollection";

const CollectionTable = () => {
  const { collections, deleteCollection, updateCollection, addCollection } = useCollections();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCollection, setNewCollection] = useState<Collection>({ collectionId: 0, name: "", descriptiom: "" });
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showEditModal = (collection: Collection) => {
    setEditingCollection(collection);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleUpdateCollection = async () => {
    if (editingCollection) {
      const success = await updateCollection(editingCollection);
      if (success) {
        message.success("Colección actualizada correctamente.");
        setIsModalVisible(false);
        setEditingCollection(null);
        setIsEditing(false);
      } else {
        message.error("Error al actualizar la colección.");
      }
    }
  };

  const showModal = () => {
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleAddCollection = async () => {
    const success = await addCollection(newCollection); // Usar el hook para agregar la colección
    if (success) {
      message.success("Colección agregada correctamente.");
      setIsModalVisible(false);
      setNewCollection({ collectionId: 0, name: "", descriptiom: "" });
    } else {
      message.error("Error al agregar la colección.");
    }
  };

  const collectionColumns = [
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Descripción", dataIndex: "descriptiom", key: "descriptiom" },
    {
      title: "Acciones",
      key: "actions",
      render: (text: any, record: any) => (
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
      ),
    },
  ];

  const handleDelete = async (collectionId: number) => {
    const success = await deleteCollection(collectionId);
    if (success) {
      message.success("Colección eliminada correctamente.");
    } else {
      message.error("No se pudo eliminar la colección.");
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

  <Modal
    title={isEditing ? "Editar Colección" : "Agregar Nueva Colección"}
    visible={isModalVisible}
    onOk={isEditing ? handleUpdateCollection : handleAddCollection}
    onCancel={() => setIsModalVisible(false)}
    okText={isEditing ? "Actualizar" : "Agregar"}
    cancelText="Cancelar"
  >
    <Form layout="vertical">
      <Form.Item label="Nombre">
        <Input
          value={isEditing ? editingCollection?.name : newCollection.name}
          onChange={(e) =>
            isEditing
              ? setEditingCollection({ ...editingCollection, name: e.target.value } as Collection)
              : setNewCollection({ ...newCollection, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Descripción">
        <Input
          value={isEditing ? editingCollection?.descriptiom : newCollection.descriptiom}
          onChange={(e) =>
            isEditing
              ? setEditingCollection({ ...editingCollection, descriptiom: e.target.value } as Collection)
              : setNewCollection({ ...newCollection, descriptiom: e.target.value })
          }
        />
      </Form.Item>
    </Form>
  </Modal>

      </div>
  );
};

export default CollectionTable;
