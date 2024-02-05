import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./componentes/paginas/login";
import Modal from "./componentes/paginas/modal";
import Header from "./componentes/header";
import {ProtectedRoute, ProtectedRouteLogin} from "./ProtectedRoute";


function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Router>
      <div>
        <Routes>
        <Route element={<ProtectedRouteLogin />} >
          <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />} >
          <Route
            path="/Home/:id"
            element={
              <div className="p-4">
                <Header />
                <h1 className="font-bold  m-8 float-left font- text-2xl ">
                  LISTA DE TRABAJOS
                </h1>
                <p className="float-left text-slate-500 text-justify">
                  Haz click en el boton de “Nuevo” para agregar un trabajo a la
                  lista<br></br>
                  Haz click en un trabajo existente para ver los detalles o
                  actualizar la información
                </p>
                <Modal showModal={showModal} closeModal={closeModal} />
                
              </div>
            }
          />
          </Route>

          {/* Nueva ruta para la gestión de usuarios */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
