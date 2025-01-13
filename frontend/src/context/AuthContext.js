import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      //getUser();
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/token/', { username, password });
      const { access } = response.data;

      localStorage.setItem('token', access);
      setToken(access);
      api.defaults.headers['Authorization'] = `Bearer ${access}`;
      return true; // Login exitoso
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return false; // Login fallido
    }
  };

  const logout = (redirectTo = '/login') => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    api.defaults.headers['Authorization'] = null; // Limpia el encabezado
    // Redirige si es necesario
    window.location.href = redirectTo;
  };

  // const getUser = async () => {
  //   try {
  //     const response = await api.get('/accounts/register/');
  //     setUser(response.data.user);
  //   } catch (error) {
  //     console.error('Error al obtener el usuario:', error);
  //     logout();
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
