import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

interface ArtRoom {
  numeroSala: string;
  descripcion: string;
}

interface CreateArtRoomProps {
  onAdd: (artRoom: ArtRoom) => void;
}

const CreateArtRoom: React.FC<CreateArtRoomProps> = ({ onAdd }) => {
  const [numeroSala, setNumeroSala] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");

  const handleSubmit = () => {
    const newArtRoom: ArtRoom = {
      numeroSala,
      descripcion,
    };

    onAdd(newArtRoom);
    setNumeroSala("");
    setDescripcion("");
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
        Agregar Nueva Sala de Arte
      </Title>
      <Form.Item label="Número de Sala" required>
        <Input
          value={numeroSala}
          onChange={(e) => setNumeroSala(e.target.value)}
          placeholder="Ingrese el número de la sala"
        />
      </Form.Item>
      <Form.Item label="Descripción de la Sala" required>
        <Input.TextArea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese una descripción de la sala"
        />
        </Form.Item>
      <Form.Item label="Nombre de la Sala" required>
        <Input.TextArea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese el nombre de la sala"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        Crear Sala de Arte
      </Button>
    </Form>
  );
};

export default CreateArtRoom;
