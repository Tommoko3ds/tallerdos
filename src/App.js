import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/paginas/login';
import Modal from './componentes/paginas/modal';
import Header from './componentes/header';

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/contenido"
            element={
              <div className="p-4">
                <Header />
                <button onClick={openModal}>Abrir Modal</button>
                <Modal showModal={showModal} closeModal={closeModal} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
