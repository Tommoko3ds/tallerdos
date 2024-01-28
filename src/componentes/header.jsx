import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div className="flex items-center"> 
      <img src="https://llantasymecanica.com/wp-content/uploads/2023/04/servicio.png" alt="Logo de MecanicApp" className="h-8 w-8 mr-2" /> {/* Ajusta la ruta y el tamaño según tus necesidades */}
      <h1 className="text-2xl font-bold">MecanicApp</h1>
    </div>
    <nav className="mt-2">
      <a className="mr-4 hover:text-gray-300" href="#inicio">
        Inicio
      </a>
      <button className=" bg-gray-300 rounded-lg p-4 text-black hover:text-gray-30" href="#acerca-de">
      <img
                    src="https://cdn-icons-png.flaticon.com/512/3106/3106773.png"
                    alt="Eye Icon"
                    width="20"
                    height="20"
                  />
      </button>
      
      <button className="ml-4 bg-white rounded-lg p-3 text-black hover:text-gray-30" href="#acerca-de">
        Cerrar Sesión
      </button>
    </nav>
  </header>
  
  
  );
}

export default Header;
