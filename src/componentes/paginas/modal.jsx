import React from 'react';
import { useState } from 'react';
import Formulario from '../formulario';


export default function Modal() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div>
      <button
        className='bg-blue-700 text-white m-9 rounded-lg p-4 font-bold'
        onClick={() => setModalAbierto(true)}
      >
        Agregar 
      </button>
      {modalAbierto && (
        <div className='fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center'>
          <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
          <Formulario />
            <button className='bg-blue-700 text-white m-2 rounded-lg p-2 font-bold' onClick={() => setModalAbierto(false)}>Listo</button>
          </div>
         
        </div>
      )}
    </div>
  );
}
