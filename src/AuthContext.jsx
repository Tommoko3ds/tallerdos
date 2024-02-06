// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    // Intentar obtener el estado desde el almacenamiento local al inicio
    const storedState = localStorage.getItem('isLoggedIn');
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    // Almacenar el estado en el almacenamiento local cada vez que cambie
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  const val = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
