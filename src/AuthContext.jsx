// En AuthContext.js
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// ...

// Asegúrate de que isLoggedIn esté en el objeto devuelto por useAuth
export const AuthProvider = ({ children }) => {
  const value = {
    isLoggedIn: false, // O el valor real de isLoggedIn
    // Otros valores y funciones
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
