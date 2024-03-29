import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./componentes/paginas/login";
import Modal from "./componentes/paginas/modal";
import Header from "./componentes/header";
import UsersManagement from "./componentes/paginas/admin";
import SearchComponent from "./componentes/buscador";
import ListaTrabajos from "./componentes/listaTrabajos";
import { ProtectedRoute, ProtectedRouteLogin,ProtectedAdmin } from "./ProtectedRoute";
import {useAuth,AuthProvider } from './AuthContext';





function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    
    <Router>
      <div>
        <Routes>
          <Route element={<ProtectedRouteLogin isLoggedIn={useAuth().isLoggedIn} />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute isLoggedIn={useAuth().isLoggedIn}/>}>
            <Route
              path="/Home/:id"
              element={
                <div className="p-0 ">
                <Header />
                <div className="m-8">
                  <div className="flex flex-col">
                    <h1 className="font-bold m-8 float-left text-2xl">
                      LISTA DE TRABAJOS
                    </h1>
                    <div className="flex flex-col m-8 mt-0 text-gray-500">
                      <p>
                        -Haz clic en el botón de "Agregar" para agregar un trabajo
                        a la lista.
                      </p>
                      <p>
                        -Haz clic en el icono del ojito para ver los detalles
                        o actualizar la información. 
                      </p>
                      <p>
                        -Haz clic en el icono de la basura para eliminar un trabajo.
                      </p>
                    </div>
                    <Modal showModal={showModal} closeModal={closeModal} />
                    <ListaTrabajos />
                  </div>
                </div>
              </div>
              }
            />
            <Route element={<ProtectedAdmin rol={useAuth().rol} />}>
            <Route
              path="/users/:id"
              element={
                <div className="p-0">
                  <Header />
                  <UsersManagement />
                </div>
              }
            />
            </Route>
            </Route>

            {/* Nueva ruta para la gestión de usuarios */}
            
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;
