import React, { useState } from 'react';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'; // Importa íconos de Ant Design
import { Button, Input } from 'antd'; // Importa el botón de Ant Design
import './LoginScreen.css'; // Importa los estilos CSS
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../assets/lib/zod/validations';
import { object } from 'zod';

interface IloginForm {
  email: string;
  password: string;
}
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Estado para el correo electrónico
  const [password, setPassword] = useState<string>(''); // Estado para la contraseña
  const { control, handleSubmit, formState: { errors } } = useForm<IloginForm>({ defaultValues: { email: "", password: "" }, resolver: zodResolver(loginSchema) })

  // Maneja el evento de inicio de sesión
  const handleLogin = (formlogin: IloginForm) => {
    console.log('Iniciar sesión:', formlogin); // Imprime el email y la contraseña en la consola
  };

  // Maneja el evento de registro
  const handleRegister = () => {
    console.log('Ir a Registrarse'); // Imprime un mensaje en la consola
  };

  return (
    <div className="login-container"> {/* Contenedor principal */}
      <div className="login-box"> {/* Caja de login */}
        <h2>
          <UserOutlined className="user-icon" /> Bienvenido {/* Título de bienvenida */}
        </h2>
        <p className="subtitle">Inicia sesión en tu cuenta</p> {/* Subtítulo */}
        <form onSubmit={handleSubmit(handleLogin)}> {/* Formulario */}
          <div className="input-group"> {/* Grupo para el campo de email */}
            <label htmlFor="email">
              <MailOutlined className="icon" /> Correo Electrónico
            </label>
            <Controller control={control}
              name="email"
              render={({ field }) => <Input {...field}// destructuracion {...field}
                placeholder='pedroelcapito@gmail.com'
              />}
            />
            {errors.email ? <p>{errors.email.message}</p> : null}
          </div>
          <div className="input-group"> {/* Grupo para el campo de contraseña */}
            <label htmlFor="password">
              <LockOutlined className="icon" /> Contraseña
            </label>
            <Controller control={control}
              name='password'
              render={({ field }) => <Input.Password {...field}
                placeholder="*****"
              />}
            />
            {errors.password ? <p>{errors.password.message}</p> : null}
          </div>
          {/* Botón de Ant Design para iniciar sesión */}
          <Button type="primary" htmlType="submit" className="login-button">
            Ingresar
          </Button>
        </form>
        <p className="register-text">¿No tienes cuenta?</p> {/* Texto para registro */}
        {/* Botón de Ant Design para registrarse */}
        <Button type="link" onClick={handleRegister} className="register-button">
          Registrarse
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
