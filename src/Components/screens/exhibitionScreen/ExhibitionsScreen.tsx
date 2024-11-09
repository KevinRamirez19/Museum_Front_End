import { useState,} from "react";
import { Table, Button, message, Modal, Input, Form } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import useExhibitions from "../../../hooks/useExhibition";
import "./ExhibitionsScreen.css"; // Asegúrate de que el archivo CSS esté vinculado correctamente
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Column } = Table;
const { Search } = Input;

const ExhibitionsScreen = () => {
  const { exhibitions, artRooms, loading, error, updateExhibition, updateArtRoom, deleteExhibition, deleteArtRoom } = useExhibitions();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [searchTextExhibition, setSearchTextExhibition] = useState("");
  const [searchTextArtRoom, setSearchTextArtRoom] = useState("");
  const {state} = useAuth()
  const navigate = useNavigate()
  if (!state.user) {
    navigate("/login")
  }
  const startEditing = (record: any) => {
    setEditingKey("exhibitionId" in record ? record.exhibitionId : record.artRoomId);
    form.setFieldsValue({ ...record });
  };

  const cancelEditing = () => {
    setEditingKey(null);
    form.resetFields();
  };

  const save = async (record: any) => {
    try {
      const updatedRecord = await form.validateFields();
      if ("exhibitionId" in record) {
        await updateExhibition({ ...record, ...updatedRecord });
        message.success("Exposición actualizada exitosamente.");
      } else if ("artRoomId" in record) {
        await updateArtRoom({ ...record, ...updatedRecord });
        message.success("Sala de arte actualizada exitosamente.");
      }
      setEditingKey(null);
    } catch (error) {
      message.error("Error al guardar los cambios.");
    }
  };

  const confirmDelete = (record: any) => {
    Modal.confirm({
      title: `¿Está seguro de que desea eliminar este ${"exhibitionId" in record ? "exposición" : "sala de arte"}?`,
      okText: "Sí",
      cancelText: "No",
      onOk: async () => {
        if ("exhibitionId" in record) {
          await deleteExhibition(record.exhibitionId);
          message.success("Exposición eliminada exitosamente.");
        } else if ("artRoomId" in record) {
          await deleteArtRoom(record.artRoomId);
          message.success("Sala de arte eliminada exitosamente.");
        }
      },
    });
  };

  const filteredExhibitions = exhibitions.filter((exhibition) =>
    exhibition.name.toLowerCase().includes(searchTextExhibition.toLowerCase()) ||
    exhibition.artRoom.artRoomId.toString().includes(searchTextExhibition)
  );

  const filteredArtRooms = artRooms.filter((artRoom) =>
    artRoom.name.toLowerCase().includes(searchTextArtRoom.toLowerCase()) ||
    artRoom.artRoomId.toString().includes(searchTextArtRoom)
  );

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="exhibitions-container">
      <h3 className="exhibitions-title">Gestión de Exposiciones y Salas de Arte</h3>
      
      {/* Sección de Exposiciones */}
      <h4>Exposiciones</h4>
      <Search
        placeholder="Buscar exposición por nombre o número de sala"
        onChange={(e) => setSearchTextExhibition(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Form form={form} component={false}>
        <Table 
          className="exhibition-table" 
          dataSource={filteredExhibitions} 
          rowKey="exhibitionId" 
          pagination={{ pageSize: 5 }}
        >
          <Column title="Nombre de la Exposición" dataIndex="name" key="name"
            render={(text, record: any) => {
              return editingKey === record.exhibitionId ? (
                <Form.Item name="name" style={{ margin: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                text
              );
            }}
          />
          <Column title="Descripción de la Exposición" dataIndex="description" key="description"
            render={(text, record: any) => {
              return editingKey === record.exhibitionId ? (
                <Form.Item name="description" style={{ margin: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                text
              );
            }}
          />
          <Column title="Sala a la que pertenece" dataIndex={["artRoom", "artRoomId"]} key="artRoomId" />
          <Column
            title="Acciones"
            key="actions"
            render={(_, record: any) => {
              const editable = editingKey === record.exhibitionId;
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

      {/* Sección de Salas de Arte */}
      <h4>Salas de Arte</h4>
      <Search
        placeholder="Buscar sala de arte por nombre o número"
        onChange={(e) => setSearchTextArtRoom(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Form form={form} component={false}>
        <Table 
          className="exhibition-table" 
          dataSource={filteredArtRooms} 
          rowKey="artRoomId" 
          pagination={{ pageSize: 5 }}
        >
          <Column title="Nº Sala" dataIndex="artRoomId" key="artRoomId" />
          <Column title="Nombre de la Sala" dataIndex="name" key="name"
            render={(text, record: any) => {
              return editingKey === record.artRoomId ? (
                <Form.Item name="name" style={{ margin: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                text
              );
            }}
          />
          <Column title="Descripción de la Sala" dataIndex="description" key="description"
            render={(text, record: any) => {
              return editingKey === record.artRoomId ? (
                <Form.Item name="description" style={{ margin: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                text
              );
            }}
          />
          <Column
            title="Acciones"
            key="actions"
            render={(_, record: any) => {
              const editable = editingKey === record.artRoomId;
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

export default ExhibitionsScreen;
