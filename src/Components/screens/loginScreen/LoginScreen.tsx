// src/components/LoginScreen.tsx
import React, { useState } from 'react';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';
import './LoginScreen.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../assets/lib/zod/validations';
import { useAuth } from '../../../Context/AuthContext';
import myApi from '../../../assets/lib/axios/myApi';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm'; // Importa tu formulario de registro

interface IloginForm {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const { login, state } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<IloginForm>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar el modal

  const validatedLogin = async (formLogin: IloginForm) => {
    try {
      const valid = await myApi.post("/login", formLogin);
      if (valid.data) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return false;
  };

  const handleLogin = async (formLogin: IloginForm) => {
    const valid = await validatedLogin(formLogin);
    console.log(formLogin);

    if (!valid) {
      message.error("Credenciales Invalidas");
      return;
    }

    const user = {
      email: formLogin.email,
    };

    login(user);
    navigate("/");
    console.log(state);
  };

  const showRegisterModal = () => {
    setIsModalVisible(true); // Muestra el modal
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Cierra el modal
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>
          <UserOutlined className="user-icon" /> Bienvenido
        </h2>
        <p className="subtitle">Inicia sesión en tu cuenta</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="input-group">
            <label htmlFor="email">
              <MailOutlined className="icon" /> Correo Electrónico
            </label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input {...field} placeholder="pedroelcapito@gmail.com" />
              )}
            />
            {errors.email ? <p>{errors.email.message}</p> : null}
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <LockOutlined className="icon" /> Contraseña
            </label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input.Password {...field} placeholder="*****" />
              )}
            />
            {errors.password ? <p>{errors.password.message}</p> : null}
          </div>
          <Button type="primary" htmlType="submit" className="login-button">
            Ingresar
          </Button>
        </form>
        <p className="register-text">¿No tienes cuenta?</p>
        <Button type="link" onClick={showRegisterModal} className="register-button">
          Registrarse
        </Button>
      </div>

      {/* Modal para el formulario de registro */}
      <Modal
        title="Registro de Usuario"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null} // No mostrar los botones predeterminados de 'Ok' y 'Cancel'
      >
        <RegisterForm /> {/* Muestra el formulario de registro en el modal */}
      </Modal>
    </div>
  );
};

export default LoginScreen;
