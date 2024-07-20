import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
    const navigate = useNavigate();

    const login = (newToken) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken('');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
