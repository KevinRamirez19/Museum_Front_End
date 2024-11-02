import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Typography } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

interface Exhibition {
  nombre: string;
  fechaDeInicio: string | null;
  fechaFinal: string | null;
  estado: string;
}

interface CreateExhibitionProps {
  onAdd: (exhibition: Exhibition) => void;
}

const CreateExhibition: React.FC<CreateExhibitionProps> = ({ onAdd }) => {
  const [nombre, setNombre] = useState<string>("");
  const [fechaDeInicio, setFechaDeInicio] = useState<any>(null);
  const [fechaFinal, setFechaFinal] = useState<any>(null);
  const [estado, setEstado] = useState<string>("");

  const handleSubmit = () => {
    const newExhibition: Exhibition = {
      nombre,
      fechaDeInicio: fechaDeInicio ? fechaDeInicio.format("YYYY-MM-DD") : null,
      fechaFinal: fechaFinal ? fechaFinal.format("YYYY-MM-DD") : null,
      estado,
    };

    onAdd(newExhibition);
    setNombre("");
    setFechaDeInicio(null);
    setFechaFinal(null);
    setEstado("");
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
      <Form.Item label="Fecha de Inicio" required>
        <DatePicker
          value={fechaDeInicio ? dayjs(fechaDeInicio) : null}
          onChange={(date) => setFechaDeInicio(date)}
          placeholder="Seleccione la fecha de inicio"
        />
      </Form.Item>
      <Form.Item label="Fecha Final" required>
        <DatePicker
          value={fechaFinal ? dayjs(fechaFinal) : null}
          onChange={(date) => setFechaFinal(date)}
          placeholder="Seleccione la fecha final"
        />
      </Form.Item>
      <Form.Item label="Estado" required>
        <Input
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          placeholder="Ingrese el estado (ej. Nuevo, Antiguo)"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
        Crear Exhibición
      </Button>
    </Form>
  );
};

export default CreateExhibition;
