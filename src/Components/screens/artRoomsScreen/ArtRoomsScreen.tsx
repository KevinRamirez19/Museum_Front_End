import { useState } from "react";
import { Table, Button, message, Modal, Input, Form } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import useArtObjects from "../../../hooks/useArtObject";

const { Column } = Table;
const { Search } = Input;

const ArtObjectsScreen = () => {
  const { artObjects, loading, error, updateArtObject, deleteArtObject } = useArtObjects();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  // Función para iniciar la edición
  const startEditing = (record: any) => {
    setEditingKey(record.artObjectId);
    form.setFieldsValue({ ...record });
  };

  // Función para cancelar la edición
  const cancelEditing = () => {
    setEditingKey(null);
    form.resetFields();
  };

  // Función para guardar los cambios
  const save = async (record: any) => {
    try {
      const updatedRecord = await form.validateFields();
      const updatedArtObject = {
        ...record,
        ...updatedRecord,
        exhibition_Id: record.exhibition.exhibitionId,
        category_Id: record.category.categoryId,
        state_Id: record.state.stateId,
        exhibition: {
          ...record.exhibition,
          artRoom: {
            ...record.exhibition.artRoom,
            location_Id: record.exhibition.artRoom.location_Id, 
            collection_Id: record.exhibition.artRoom.collection_Id, 
          }
        }
      };
      await updateArtObject(updatedArtObject);
      message.success("Objeto de arte actualizado exitosamente.");
      setEditingKey(null);
    } catch (err) {
      message.error("Error al guardar los cambios.");
    }
  };
  
  
  // Función para confirmar la eliminación
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

  // Filtrado de objetos de arte por nombre
  const filteredArtObjects = artObjects.filter((artObject) =>
    artObject.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Renderizado de la pantalla
  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Gestión de Objetos de Arte</h3>
      <Search
        placeholder="Buscar por nombre"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Form form={form} component={false}>
        <Table dataSource={filteredArtObjects} rowKey="artObjectId" pagination={{ pageSize: 5 }}>
          <Column title="Nombre" dataIndex="name" key="name"
            render={(text, record: any) => {
              return editingKey === record.artObjectId ? (
                <Form.Item name="name" style={{ margin: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                text
              );
            }}
          />
          <Column title="Descripción" dataIndex="description" key="description"
            render={(text, record: any) => {
              return editingKey === record.artObjectId ? (
                <Form.Item name="description" style={{ margin: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                text
              );
            }}
          />
          <Column title="Artista" dataIndex="artist" key="artist" />
          <Column title="Fecha de Creación" dataIndex="creationDate" key="creationDate" />
          <Column title="Origen" dataIndex="origin" key="origin" />
          <Column title="Estado" dataIndex={["state", "state"]} key="state" />
          <Column title="Categoría" dataIndex={["category", "category"]} key="category" />
          <Column
            title="Acciones"
            key="actions"
            render={(text, record: any) => {
              const editable = editingKey === record.artObjectId;
              return editable ? (
                <>
                  <Button onClick={() => save(record)} icon={<SaveOutlined />} />
                  <Button onClick={cancelEditing} icon={<CloseOutlined />} />
                </>
              ) : (
                <>
                  <Button onClick={() => startEditing(record)} icon={<EditOutlined />} />
                  <Button onClick={() => confirmDelete(record)} icon={<DeleteOutlined />} danger />
                </>
              );
            }}
          />
        </Table>
      </Form>
    </div>
  );
};

export default ArtObjectsScreen;
