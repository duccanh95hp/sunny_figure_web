import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));

    const login = (token) => {
        sessionStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        toast.warning("Bạn đã đăng xuất thành công");
        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
