import React, { } from 'react';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import './LoginScreen.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../assets/lib/zod/validations';
import { useAuth } from '../../../Context/AuthContext'; // Importa el contexto
import myApi from '../../../assets/lib/axios/myApi';
import { useNavigate } from 'react-router-dom';

interface IloginForm {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const { login, state } = useAuth(); // Usa el contexto de autenticación
  const { control, handleSubmit, formState: { errors } } = useForm<IloginForm>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate()
  console.log(state);
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
  }
  // Maneja el evento de inicio de sesión

  const handleLogin = async (formLogin: IloginForm) => { // Funcion asyncrona
    const valid = await validatedLogin(formLogin)
    console.log(formLogin);

    if (!valid) {
      message.error("Credenciales Invalidas")
      return
    }

    // Supongamos que has autenticado al usuario correctamente aquí
    const user = {
      email: formLogin.email,
    };

    // Envía la acción para establecer el usuario en el contexto
    login(user);
    navigate("/")
 

    console.log(state);

  };

  // Maneja el evento de registro
  const handleRegister = () => {
    console.log('Ir a Registrarse');
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
        <Button type="link" onClick={handleRegister} className="register-button">
          Registrarse
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
