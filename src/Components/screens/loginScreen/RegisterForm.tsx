import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, message, Checkbox, Modal } from 'antd';
import { z } from 'zod';
import { registerSchema } from '../../../assets/lib/zod/Register';
import axios from 'axios';

const { Option } = Select;

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [termsModalVisible, setTermsModalVisible] = useState(false); // Estado para controlar el modal de términos y condiciones
  const [acceptedTerms, setAcceptedTerms] = useState(false); // Estado para controlar si el usuario aceptó los términos
  const [genders, setGenders] = useState<any[]>([]); // Estado para almacenar los géneros
  const [identificationTypes, setIdentificationTypes] = useState<any[]>([]); // Estado para almacenar los tipos de identificación
  const [userTypes, setUserTypes] = useState<any[]>([]); // Estado para almacenar los tipos de usuario

  // Cargar los datos de las APIs cuando el componente se monte
  useEffect(() => {
    // Obtener Géneros
    axios.get('https://nationalmuseum2.somee.com/api/Gender')
      .then(response => setGenders(response.data))
      .catch(() => message.error("Error al cargar los géneros"));

    // Obtener Tipos de Identificación
    axios.get('https://nationalmuseum2.somee.com/api/IdentificationType')
      .then(response => setIdentificationTypes(response.data))
      .catch(() => message.error("Error al cargar los tipos de identificación"));

    // Obtener Tipos de Usuario
    axios.get('https://nationalmuseum2.somee.com/api/UserType')
      .then(response => setUserTypes(response.data))
      .catch(() => message.error("Error al cargar los tipos de usuario"));
  }, []);

  const onFinish = async (values: any) => {
    try {
      // Convertir los valores de los Select a cadenas antes de pasar a Zod
      const adjustedValues = {
        ...values,
        genero: String(values.genero), // Convertir a string
        tipoIdentificacion: String(values.tipoIdentificacion), // Convertir a string
        tipoUsuario: String(values.tipoUsuario), // Convertir a string
        fechaNacimiento: values.fechaNacimiento ? values.fechaNacimiento.format("YYYY-MM-DD") : "",
      };
  
      // Validar los datos con Zod (con los valores ajustados)
      await registerSchema.parseAsync(adjustedValues);
      console.log('Formulario enviado:', adjustedValues);
  
      // Mapeo de los valores para ajustarlos al formato esperado por la API
      const userData = {
        gender_Id: adjustedValues.genero, // Usamos el valor convertido
        identificationType_Id: adjustedValues.tipoIdentificacion, // Usamos el valor convertido
        user_Type_Id: adjustedValues.tipoUsuario, // Usamos el valor convertido
        names: adjustedValues.nombres,
        lastNames: adjustedValues.apellidos,
        identificationNumber: adjustedValues.noIdentificacion,
        birthDate: adjustedValues.fechaNacimiento, // Ya está convertido
        email: adjustedValues.email,
        password: adjustedValues.password,
        contact: adjustedValues.contacto,
      };
  
      console.log('Datos que se van a enviar a la API:', userData); // Verifica los datos que se van a enviar
  
      // Enviar los datos a la API
      const response = await axios.post('https://nationalmuseum2.somee.com/api/User', userData);
      
      // Verificación de la respuesta
      console.log('Respuesta de la API:', response.data);
      message.success("Registro exitoso");
    } catch (error) {
      console.error('Error en la función onFinish:', error); // Mostrar error completo
      if (error instanceof z.ZodError) {
        // Si el error es de Zod, mostrar errores detallados
        error.errors.forEach(err => {
          message.error(err.message); // Muestra cada error de Zod
        });
      } else if (axios.isAxiosError(error)) {
        // Si es un error de Axios, mostrar el error de la respuesta
        message.error(`Error en la solicitud: ${error.response?.data?.message || error.message}`);
      } else {
        // Otros errores generales
        message.error("Error en el registro. Intente nuevamente.");
      }
    }
  };
  
  
  

  // Función para mostrar el modal de términos y condiciones
  const showTermsModal = () => {
    setTermsModalVisible(true); // Muestra el modal
  };

  // Función para cerrar el modal de términos y condiciones
  const handleTermsModalCancel = () => {
    setTermsModalVisible(false); // Cierra el modal
  };

  // Función para manejar el cambio en el checkbox de aceptación de términos
  const handleAcceptTermsChange = (e: any) => {
    setAcceptedTerms(e.target.checked); // Actualiza el estado del checkbox
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Nombres" name="nombres" rules={[{ required: true, message: "Por favor ingrese sus nombres" }]} >
        <Input />
      </Form.Item>

      <Form.Item label="Apellidos" name="apellidos" rules={[{ required: true, message: "Por favor ingrese sus apellidos" }]} >
        <Input />
      </Form.Item>

      <Form.Item label="Género" name="genero" rules={[{ required: true, message: "Por favor seleccione su género" }]}>
        <Select placeholder="Seleccione su género">
          {genders.map((gender) => (
            <Option key={gender.genderId} value={gender.genderId}>
              {gender.gender}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Tipo de Identificación" name="tipoIdentificacion" rules={[{ required: true, message: "Por favor seleccione su tipo de identificación" }]}>
        <Select placeholder="Seleccione su tipo de identificación">
          {identificationTypes.map((identification) => (
            <Option key={identification.identificationTypeId} value={identification.identificationTypeId}>
              {identification.identification_Type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Número de Identificación" name="noIdentificacion" rules={[{ required: true, message: "Por favor ingrese su número de identificación" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tipo de Usuario" name="tipoUsuario" rules={[{ required: true, message: "Seleccione su tipo de usuario" }]}>
        <Select placeholder="Seleccione su tipo de usuario">
          {userTypes.map((userType) => (
            <Option key={userType.userTypeId} value={userType.userTypeId}>
              {userType.userType}
            </Option>
          ))}
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

      {/* Campo de Términos y Condiciones */}
      <Form.Item name="terminos" valuePropName="checked" rules={[{ required: true, message: "Debe aceptar los términos y condiciones" }]}>
        <Checkbox onChange={handleAcceptTermsChange}>
          Acepto los <a onClick={showTermsModal} style={{ cursor: 'pointer' }}>términos y condiciones</a>.
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          disabled={!acceptedTerms}  // Deshabilita el botón si los términos no están aceptados
        >
          Registrarse
        </Button>
      </Form.Item>

      {/* Modal de Términos y Condiciones */}
      <Modal
        title="Términos y Condiciones"
        open={termsModalVisible}
        onCancel={handleTermsModalCancel}
        footer={null}
        width={700}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <h3>Política de Privacidad</h3>
          <p><strong>1. Introducción</strong></p>
          <p>El Museo Nacional de Colombia se compromete a proteger la privacidad y la seguridad de los datos personales de nuestros usuarios, visitantes y participantes...</p>
          {/* Aquí puedes agregar el contenido de los términos y condiciones */}
        </div>
      </Modal>
    </Form>
  );
};

export default RegisterForm;
