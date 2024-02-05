import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./componentes/paginas/login";
import Modal from "./componentes/paginas/modal";
import Header from "./componentes/header";
import UsersManagement from "./componentes/paginas/admin";
import SearchComponent from "./componentes/buscador";
import ListaTrabajos from "./componentes/listaTrabajos";
import { ProtectedRoute, ProtectedRouteLogin } from "./ProtectedRoute";



let isLoggedIn = false;
export function cambiarStatusLogin(acceso){
  console.log("Acceso ----> antes: " + acceso);
  if(acceso===1){
    isLoggedIn = true;
  }
  else{isLoggedIn = false;}
  console.log("Acceso ----> despues : " + acceso);
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route element={<ProtectedRouteLogin isLoggedIn />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute isLoggedIn/>}>
            <Route
              path="/Home/:id"
              element={
                <div className="p-0 ">
                  <Header />
                  <h1 className="font-bold  m-8 float-left font- text-2xl ">
                    LISTA DE TRABAJOS
                  </h1>
                  <p className="float-left text-slate-500 text-justify">
                    Haz click en el boton de “Nuevo” para agregar un trabajo a
                    la lista<br></br>
                    Haz click en un trabajo existente para ver los detalles o
                    actualizar la información
                  </p>
                  <Modal showModal={showModal} closeModal={closeModal} />
                  <ListaTrabajos />
                </div>
              }
            />

            {/* Nueva ruta para la gestión de usuarios */}
            <Route
              path="/users/:id"
              element={
                <div className="p-4">
                  <Header />
                  <UsersManagement />
                </div>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
