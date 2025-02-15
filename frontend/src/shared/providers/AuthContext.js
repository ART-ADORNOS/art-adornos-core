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

    const getUser = async () => {
        try {
            const response = await api.get('/api/me/');
            const {first_name, last_name, email, username,is_staff,is_seller} = response.data;
            setUser({first_name, last_name, email, username,is_staff,is_seller});
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
