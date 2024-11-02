// LoginScreen.tsx
import React, { useState } from 'react';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import './LoginScreen.css';

interface LoginScreenProps {
  toggleScreen: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ toggleScreen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciar sesión:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>
          <UserOutlined className="user-icon" /> Bienvenido
        </h2>
        <p className="subtitle">Inicia sesión en tu cuenta</p>
        <form onSubmit={handleLogin}>
          {/* Campos de entrada */}
          <div className="input-group">
            <label htmlFor="email">
              <MailOutlined className="icon" /> Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <LockOutlined className="icon" /> Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Ingresar</button>
        </form>
        <p className="register-text">¿No tienes cuenta?</p>
        <button onClick={toggleScreen} className="register-button">
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
