// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/paginas/login';
import CrudComponent from './componentes/paginas/modal';
import Header from './componentes/header';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/contenido" element={
            <div className="p-4">
              <Header /> 
             <CrudComponent />
            </div>
          } />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
