// src/components/RegisterForm.tsx
import React from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { z } from 'zod';
import { registerSchema } from '../../../assets/lib/zod/Register';

const { Option } = Select;

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    try {
      // Validar los datos con Zod
      registerSchema.parse(values);
      console.log('Formulario enviado:', values);
      message.success("Registro exitoso");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          message.error(err.message);
        });
      }
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Nombres" name="nombres" rules={[{ required: true, message: "Por favor ingrese sus nombres" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Apellidos" name="apellidos" rules={[{ required: true, message: "Por favor ingrese sus apellidos" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Género" name="genero" rules={[{ required: true, message: "Por favor seleccione su género" }]}>
        <Select placeholder="Seleccione su género">
          <Option value="masculino">Masculino</Option>
          <Option value="femenino">Femenino</Option>
          <Option value="No binario">No binario</Option>
          <Option value="Prefiero no decirlo">Prefiero no decirlo</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Tipo de Identificación" name="tipoIdentificacion" rules={[{ required: true, message: "Por favor seleccione su tipo de identificación" }]}>
        <Select placeholder="Seleccione su tipo de identificación">
          <Option value="cc">Cédula de Ciudadanía</Option>
          <Option value="Ti">Tarjeta de Identidad</Option>
          <Option value="Lda">Licencia de Conducir</Option>
          <Option value="Id Militar">Identificación Militar</Option>
          <Option value="TIE">Tarjeta de Residencia</Option>
          <Option value="Carnet Estudiantil">Carnet Estudiantil</Option>
          <Option value="Tarjeta Profesional">Tarjeta Profesional</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Número de Identificación" name="noIdentificacion" rules={[{ required: true, message: "Por favor ingrese su número de identificación" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tipo de Usuario" name="tipoUsuario" rules={[{ required: true, message: "Seleccione su tipo de usuario" }]}>
        <Select placeholder="Seleccione su tipo de usuario">
          <Option value="visitante">Visitante</Option>
          <Option value="administrador">Administrador</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Fecha de Nacimiento" name="fechaNacimiento" rules={[{ required: true, message: "Por favor ingrese su fecha de nacimiento" }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: "Por favor ingrese un correo válido" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: "Por favor ingrese una contraseña segura" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item label="Contacto" name="contacto" rules={[{ required: true, message: "Por favor ingrese su número de contacto" }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
