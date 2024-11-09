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
        visible={termsModalVisible}
        onCancel={handleTermsModalCancel}
        footer={null}
        width={700}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <h3>Política de Privacidad</h3>
          <p><strong>1. Introducción</strong></p>
          <p>El Museo Nacional de Colombia se compromete a proteger la privacidad y la seguridad de los datos personales de nuestros usuarios, visitantes y participantes. Estos términos y condiciones explican cómo recopilamos, utilizamos y protegemos sus datos personales de conformidad con la Ley 1581 de 2012 y demás normativas vigentes sobre protección de datos personales en Colombia.</p>

          <p><strong>2. Responsable del Tratamiento de Datos</strong></p>
          <p>El responsable del tratamiento de los datos personales es el Museo Nacional de Colombia, ubicado en [Cra. 7 #N. 28-66, Bogotá], y con contacto a través del correo electrónico [info@museonacional.gov.co].</p>

          <p><strong>3. Finalidad del Tratamiento de Datos</strong></p>
          <p>Los datos personales que recopilamos serán utilizados con las siguientes finalidades:</p>
          <ul>
            <li>Registro de visitantes: Para llevar un control de los visitantes y participantes en actividades del Museo (exposiciones).</li>
            <li>Comunicación: Para enviar información sobre actividades, eventos y exposiciones futuras del Museo, así como boletines informativos.</li>
            <li>Evaluación de la experiencia: Para recibir comentarios y sugerencias que nos permitan mejorar nuestros servicios y la experiencia de los visitantes.</li>
            <li>Cumplimiento legal: Para cumplir con obligaciones legales y normativas relacionadas con la operación del Museo.</li>
          </ul>

          <p><strong>4. Tipos de Datos Recopilados</strong></p>
          <ul>
            <li>Datos de contacto: Nombre, correo electrónico, número de teléfono, dirección, etc.</li>
            <li>Datos de identificación: Tipo de documento de identidad, número de documento, etc.</li>
            <li>Datos de actividad en el Museo: Información sobre las visitas, participación en eventos, y preferencias relacionadas con las actividades del Museo.</li>
            <li>Datos sensibles (si aplica): En caso de que el Museo reciba datos sensibles, como información sobre discapacidad, se solicitará el consentimiento expreso para su tratamiento.</li>
          </ul>

          <p><strong>5. Derechos de los Titulares de los Datos</strong></p>
          <ul>
            <li>Acceder: A sus datos personales de forma gratuita y obtener información sobre cómo se están utilizando.</li>
            <li>Rectificar y actualizar: Sus datos personales cuando estos sean inexactos o estén desactualizados.</li>
            <li>Suprimir: Sus datos personales en caso de que ya no sean necesarios para las finalidades del tratamiento.</li>
            <li>Revocar la autorización: Para el tratamiento de sus datos personales en cualquier momento, sin efectos retroactivos.</li>
            <li>Oponerse: Al tratamiento de sus datos en los casos previstos por la ley.</li>
          </ul>

          <p><strong>6. Autorización del Titular</strong></p>
          <p>Al ingresar al Museo, inscribirse en nuestras actividades o interactuar con nuestros servicios, los usuarios dan su consentimiento expreso para el tratamiento de sus datos personales, conforme a los términos expuestos en este documento.</p>

          <p><strong>7. Modificaciones a la Política de Privacidad</strong></p>
          <p>El Museo se reserva el derecho de modificar esta política de privacidad en cualquier momento. Las modificaciones serán publicadas en el sitio web oficial y estarán disponibles para consulta por los usuarios.</p>

          <p><strong>8. Contacto</strong></p>
          <p>Si tiene alguna duda, comentario o solicitud sobre el tratamiento de sus datos personales, puede contactar al Museo Nacional de Colombia a través del correo electrónico [info@museonacional.gov.co].</p>

          <div style={{ marginTop: '20px' }}>
            <Checkbox>
              Acepto los términos y condiciones
            </Checkbox>
          </div>
        </div>
      </Modal>
    </Form>
  );
};

export default RegisterForm;
