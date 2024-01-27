import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState({
    titulo: '', // Ajustado a 'titulo' en español
    descripcion: '', // Ajustado a 'descripcion' en español
  });
  const [jobsList, setJobsList] = useState([]);

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
    axios.post('http://localhost:5000/api/jobs', jobData)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        handleModalClose();
        fetchJobs(); // Actualizar la lista de trabajos después de guardar uno nuevo
      })
      .catch((error) => {
        console.error('Error al enviar datos al servidor:', error);
      });
  };

  const fetchJobs = () => {
    axios.get('http://localhost:5000/api/jobs')
      .then((response) => {
        setJobsList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener trabajos desde el servidor:', error);
      });
  };

  useEffect(() => {
    fetchJobs(); // Cargar la lista de trabajos al montar el componente
  }, []);

  return (
    <div className="container mx-auto p-4">
      <button onClick={handleModalOpen} className="bg-blue-500 text-white px-4 py-2 rounded">
        Agregar Trabajo
      </button>

      {modalOpen && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
    <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={handleModalClose}></div>
    <div className="bg-white p-8 rounded shadow-lg z-10">
      <h2 className="text-2xl font-bold mb-4">Agregar Trabajo</h2>
      {/* Campos del formulario */}
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
      {/* Otros campos del formulario */}
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

      <h2 className="text-2xl font-bold mt-4">Lista de Trabajos</h2>
      <ul>
        {jobsList.map((job) => (
          <li key={job.id}>
            <strong>{job.titulo}</strong>: {job.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudComponent;
