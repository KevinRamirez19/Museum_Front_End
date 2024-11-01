import React, { useState } from "react";
import { Form, Input, DatePicker, Button } from "antd";

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
  const [fechaDeInicio, setFechaDeInicio] = useState<any>(null); // Puedes usar dayjs o Moment.js
  const [fechaFinal, setFechaFinal] = useState<any>(null);
  const [estado, setEstado] = useState<string>("");

  const handleSubmit = () => {
    const newExhibition: Exhibition = {
      nombre,
      fechaDeInicio: fechaDeInicio ? fechaDeInicio.format("YYYY-MM-DD") : null,
      fechaFinal: fechaFinal ? fechaFinal.format("YYYY-MM-DD") : null,
      estado,
    };

    onAdd(newExhibition); // Llama a la función para agregar la exhibición
    setNombre("");
    setFechaDeInicio(null);
    setFechaFinal(null);
    setEstado("");
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Nombre de la Exhibición">
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item label="Fecha de Inicio">
        <DatePicker
          value={fechaDeInicio}
          onChange={(date) => setFechaDeInicio(date)}
          required
        />
      </Form.Item>
      <Form.Item label="Fecha Final">
        <DatePicker
          value={fechaFinal}
          onChange={(date) => setFechaFinal(date)}
          required
        />
      </Form.Item>
      <Form.Item label="Estado">
        <Input
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Crear Exhibición
      </Button>
    </Form>
  );
};

export default CreateExhibition;
