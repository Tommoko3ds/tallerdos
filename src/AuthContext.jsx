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

  const [rol, setRol] = useState(() => { 
    const storedState = localStorage.getItem('rol');
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    // Almacenar el estado en el almacenamiento local cada vez que cambie
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('rol', JSON.stringify(rol));
  }, [rol]);
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);
  const rolando = () => setRol(true);
  const noRolando = () => setRol(false);

  const val = {
    isLoggedIn,
    rol,
    login,
    logout,
    rolando,
    noRolando, 
  };

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
