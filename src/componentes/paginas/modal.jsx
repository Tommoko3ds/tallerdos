import React, { useState } from 'react';

const CrudComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState({
    titulo: '',
    descripcion: '',

  });

  const handleInputChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveJob = () => {

    console.log('Guardar trabajo:', jobData);


    handleModalClose();
  };

  return (
   
    <div className="container  p-4 ">
     <h1 className='font-bold text-left p-9'>LISTA DE TRABAJOS</h1>
      <button onClick={handleModalOpen} className="bg-blue-500 text-right text-white px-4 py-2 rounded">
        Agregar 
      </button>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={handleModalClose}></div>
          <div className="bg-white p-8 rounded shadow-lg z-10">
            <h2 className="text-2xl font-bold mb-4">Agregar Trabajo</h2>
       
            <div className="mb-4">
              <label htmlFor="titulo" className="block text-gray-600">
                Título:
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={jobData.titulo}
                onChange={handleInputChange}
                className="w-full border p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-gray-600">
                Descripción:
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={jobData.descripcion}
                onChange={handleInputChange}
                className="w-full border p-2"
              ></textarea>
            </div>
        
            <div className="flex justify-end">
              <button onClick={handleSaveJob} className="bg-blue-500 text-white px-4 py-2 rounded">
                Guardar
              </button>
              <button onClick={handleModalClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudComponent;
