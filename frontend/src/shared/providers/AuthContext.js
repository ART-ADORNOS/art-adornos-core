import React, {createContext, useState, useEffect} from 'react';
import api from '../../core/api/axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            getUser();
        } else {
            api.defaults.headers['Authorization'] = null;
            setUser(null);
        }
    }, [token]);

    const login = async (username, password, typeUser = 'user') => {
        try {
            const response = await api.post('/api/token/', {username, password});
            const {access} = response.data;
            if (!access) {
                console.error("Error: No se recibió un token de acceso.");
                return false;
            }
            // Crea una nueva instancia de API con el token de acceso
            const temApi = api.create();
            temApi.defaults.headers['Authorization'] = `Bearer ${access}`;
            if (typeUser === 'seller') {
                const userResponse = await temApi.get('/api/me/');
                if (!userResponse.data.is_seller) throw new Error('NOT_SELLER');
            }
            localStorage.setItem('token', access);
            setToken(access);
            return true;
        } catch (error) {
            if (error.message === 'NOT_SELLER') {
                throw error;
            }
            return false;
        }
    };


    const getUser = async () => {
        try {
            const response = await api.get('/api/me/');
            const userData = response.data;
            if (!userData.is_seller) {
                logout();
                return;
            }
            setUser({...userData});
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

    const updateUser = async (userData) => {

        if (!userData.password) {
            delete userData.password;
            delete userData.confirm_password;
        }
        try {
            const response = await api.put('/update/', userData);
            setUser(response.data);
            return true;
        } catch (error) {
            console.error('error updating user', error.response?.data || error.message);
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
