import React, { useState } from "react";
import { Form, Input, Button, Typography, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

interface Exhibition {
  nombre: string;
  descripcion: string;
  salaId: string | null;
}

interface Room {
  id: string;
  name: string;
}

interface CreateExhibitionProps {
  onAdd: (exhibition: Exhibition) => void;
  rooms: Room[]; // Lista de salas
}

export const CreateExhibition: React.FC<CreateExhibitionProps> = ({ onAdd, rooms }) => {
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [salaId, setSalaId] = useState<string | null>(null);

  const handleSubmit = () => {
    const newExhibition: Exhibition = {
      nombre,
      descripcion,
      salaId,
    };

    onAdd(newExhibition);
    setNombre("");
    setDescripcion("");
    setSalaId(null);
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      style={{
        padding: "20px",
        background: "#fafafa",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Agregar Nueva Exhibición
      </Title>
      <Form.Item label="Nombre de la Exhibición" required>
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese el nombre de la exhibición"
        />
      </Form.Item>
      <Form.Item label="Descripción de la Exhibición" required>
        <Input.TextArea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese una descripción de la exhibición"
        />
      </Form.Item>
      <Form.Item label="Sala a la que pertenece" required>
        <Select
          value={salaId}
          onChange={(value) => setSalaId(value)}
          placeholder="Seleccione la sala"
        >
          {rooms.map((room) => (
            <Option key={room.id} value={room.id}>
              {room.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        Crear Exhibición
      </Button>
    </Form>
  );
};

export default CreateExhibition;
