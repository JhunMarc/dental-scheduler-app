
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, userId: null, role: null });
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ token, userId: decoded.userId, role: decoded.role });
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false); // done checking
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setAuth({ token, userId: decoded.userId, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, userId: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};