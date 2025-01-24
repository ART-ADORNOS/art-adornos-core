import React, {createContext, useState, useEffect} from 'react';
import api from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Sincronizar el token con Axios al cambiar
    useEffect(() => {
        if (token) {
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            getUser();
        } else {
            api.defaults.headers['Authorization'] = null;
            setUser(null);
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await api.post('/api/token/', {username, password});
            const {access} = response.data;
            if (!access) {
                return false;
            }
            localStorage.setItem('token', access);
            setToken(access);
            return true;
        } catch (error) {
            return false;
        }
    };

    // Obtener el usuario actual
    const getUser = async () => {
        try {
            const response = await api.get('/api/me/');
            setUser(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                logout();
            }
        }
    };

    const logout = (redirectTo = '/login') => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        window.location.href = redirectTo;
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
