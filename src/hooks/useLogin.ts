import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

interface IloginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (formLogin: IloginForm) => {
    setLoading(true);
    try {
      const response = await axios.post('https://nationalmuseum2.somee.com/api/Login', formLogin);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Guarda el token
        message.success('Inicio de sesión exitoso');
        return true; // Retorna true si el inicio de sesión es exitoso
      } else {
        message.error('Credenciales incorrectas');
        return false;
      }
    } catch (error) {
      message.error('Error al iniciar sesión');
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
