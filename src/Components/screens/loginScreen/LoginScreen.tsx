import React, { useState } from 'react';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'; // Importa íconos de Ant Design
import { Button } from 'antd'; // Importa el botón de Ant Design
import './LoginScreen.css'; // Importa los estilos CSS


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Estado para el correo electrónico
  const [password, setPassword] = useState<string>(''); // Estado para la contraseña

  // Maneja el evento de inicio de sesión
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    console.log('Iniciar sesión:', { email, password }); // Imprime el email y la contraseña en la consola
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
        <form onSubmit={handleLogin}> {/* Formulario */}
          <div className="input-group"> {/* Grupo para el campo de email */}
            <label htmlFor="email">
              <MailOutlined className="icon" /> Correo Electrónico
            </label>
            <input
              type="email" // Tipo de input para email
              id="email"
              value={email} // Valor del estado email
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email al cambiar
              required // Campo requerido
            />
          </div>
          <div className="input-group"> {/* Grupo para el campo de contraseña */}
            <label htmlFor="password">
              <LockOutlined className="icon" /> Contraseña
            </label>
            <input
              type="password" // Tipo de input para contraseña
              id="password"
              value={password} // Valor del estado password
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado password al cambiar
              required // Campo requerido
            />
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
