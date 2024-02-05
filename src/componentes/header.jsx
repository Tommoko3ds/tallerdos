import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Lógica para verificar el estado de autenticación al cargar el componente o en eventos específicos
    // Puedes realizar una solicitud al servidor para obtener el estado actual del usuario
    // y actualizar isLoggedIn en consecuencia
    // Aquí es solo un ejemplo de cómo podrías hacerlo, ajusta según tus necesidades
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/auth/check-auth", { method: "GET", credentials: "include" });
    
        if (!response.ok) {
          // Si la respuesta no es exitosa, manejar el error
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
    
        const contentType = response.headers.get("content-type");
    
        if (contentType && contentType.includes("application/json")) {
          // La respuesta es JSON válido
          const data = await response.json();
    
          if (data.status) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        } else {
          // La respuesta no es JSON, manejar de acuerdo a tus necesidades
          console.error("La respuesta no es JSON válido:", await response.text());
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
      }
    };
    

    checkAuthentication();
  }, []); // El segundo parámetro [] significa que este efecto se ejecutará solo una vez al montar el componente

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/logout", { method: "GET", credentials: "include" });
      const data = await response.json();

      if (data.status) {
        // Cierre de sesión exitoso
        setLoggedIn(false);
      } else {
        // Manejar error en el cierre de sesión
        console.error("Error al cerrar sesión:", data.error);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-xl">
      <div className="flex items-center ml-4">
        <img src="https://llantasymecanica.com/wp-content/uploads/2023/04/servicio.png" alt="Logo de MecanicApp" className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">MecanicApp</h1>
      </div>
      <nav className="mt-2">
        <Link to="#inicio" className="mr-4 hover:text-gray-300">
          Inicio
        </Link>
        <Link to="#acerca-de" className="mr-4 hover:text-gray-300">
          <img src="https://cdn-icons-png.flaticon.com/512/3106/3106773.png" alt="Eye Icon" width="20" height="20" />
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="ml-4 bg-white rounded-lg p-3 text-black hover:text-gray-30">
            Cerrar Sesión
          </button>
        ) : null}
        {/* {isLoggedIn ? <p>Usuario autenticado</p> : <p>Usuario no autenticado</p>} */}
      </nav>
    </header>
  );
};

export default Header;
