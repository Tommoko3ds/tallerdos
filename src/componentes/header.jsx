import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-xl">
      <div className="flex items-center ml-4">
        <img
          src="https://llantasymecanica.com/wp-content/uploads/2023/04/servicio.png"
          alt="Logo de MecanicApp"
          className="h-8 w-8 mr-2"
        />
        <h1 className="text-2xl font-bold">MecanicApp</h1>
      </div>
      <nav className="mt-2">
        {isLoggedIn ? (
          <button
            onClick={() => logout()}
            className="ml-4 bg-white rounded-lg p-3 text-black hover:text-gray-30"
          >
            Cerrar Sesión
          </button>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
