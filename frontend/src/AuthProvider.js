import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ login: '', role: '', isLogged: false });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            updateAuthState(token);
        }
    }, []);

    const updateAuthState = (token) => {
        const decoded = jwtDecode(token);
        setAuth({ login: decoded.sub, role: decoded.role, isLogged: true });
    };

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        updateAuthState(token);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setAuth({ login: '', role: '', isLogged: false });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;