import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CrudComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'reparacion-mecanica', 
    estatus: 'en-proceso', 
    horas:'',
    precioMateriales: '',
    precioTotal: '',
  });
  const [jobsList, setJobsList] = useState([]);
  const [showDetails, setShowDetails] = useState({}); 
  const [inProcessJobs, setInProcessJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);


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

  const toggleDetails = (jobId) => {
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [jobId]: !prevShowDetails[jobId],
    }));
  };
  const calculatePrecioTotal = () => {
    const horas = parseFloat(jobData.horas);
    const precioMateriales = parseFloat(jobData.precioMateriales);

    if (!isNaN(horas) && !isNaN(precioMateriales)) {
      const calculatedPrecioTotal = horas * precioMateriales;

      setJobData((prevData) => ({
        ...prevData,
        precioTotal: calculatedPrecioTotal.toString(), 
      }));
    }
  };

  const handleSaveJob = async () => {
    const horas = parseFloat(jobData.horas);
    const precioMateriales = parseFloat(jobData.precioMateriales);

    if (!isNaN(horas) && !isNaN(precioMateriales)) {
      const calculatedPrecioTotal = horas * precioMateriales;

      axios.post('http://localhost:5000/api/jobs', {
        ...jobData,
        precioTotal: calculatedPrecioTotal.toString(), 
      })
        .then((response) => {
          console.log('Respuesta del servidor:', response.data);
          fetchJobs(); 
          handleModalClose();
        })
        .catch((error) => {
          console.error('Error al enviar datos al servidor:', error);
        });

      setJobData({
        titulo: '',
        descripcion: '',
        tipo: 'reparacion-mecanica',
        estatus: 'en-proceso',
        horas: '',
        precioMateriales: '',
        precioTotal: '',
      });
    } else {
      console.error('Las cantidades de horas y precio de materiales deben ser números válidos');
    }
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
    fetchJobs(); 
  }, []);

  return (
    <div className="container mx-auto p-4">
         <h2 className="text-2xl text-left font-bold mt-4 p-9">LISTA DE TRABAJOS</h2>
      <button onClick={handleModalOpen} className="mb-9 bg-blue-500 text-white px-4 py-2 rounded text-right p-9 self-end">
        Agregar Trabajo
      </button>
      <ul>
        {jobsList.map((job) => (
          <li className='mb-4 border border-b-2 border-solid border-gray-300 p-6 rounded-lg relative' key={job.id_trabajo}>
            <div>
              <h2 className='text-lg font-bold text-left'>{job.titulo}</h2>
              <p>
                <span className='text-sm'>Tipo: {job.tipo}</span> - Horas: {job.horas}
              </p>
            </div>
            <div className='absolute right-0 top-0 mt-6 mr-6'>
              <button onClick={() => toggleDetails(job.id_trabajo)}>
                {showDetails[job.id_trabajo] ? (
                  <img
                    src="https://static.thenounproject.com/png/22249-200.png"
                    alt="Eye Icon"
                    width="40"
                    height="20"
                  />
                ) : (
                  <img
                    src="https://cdn.icon-icons.com/icons2/2551/PNG/512/eye_icon_152844.png"
                    alt="Eye Icon"
                    width="40"
                    height="20"
                  />
                )}
              </button>
            </div>
            {showDetails[job.id_trabajo] && (
              <div>
                <p>Descripción: {job.descripcion}</p>
                <p>Tipo: {job.tipo}</p>
                <p>Estatus: {job.estatus}</p>
                <p>Horas: {job.horas}</p>
                <p>Precio Materiales: {job.precioMateriales}</p>
                <p>Precio Total: {job.precioTotal}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center size-">
          <div className="absolute w-full h-full bg-gray-800 opacity-50" onClick={handleModalClose}></div>
          <div className="bg-white  p-8 rounded shadow-lg z-10">
            <h2 className="text-2xl font-bold mb-4">Ingresa los detalles del trabajo</h2>
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
            <div className="mb-4">
              <label htmlFor="tipo" className="block text-gray-600">
                Tipo:
              </label>
              <select
                id="tipo"
                name="tipo"
                value={jobData.tipo}
                onChange={handleInputChange}
                className="w-full border p-2"
              >
                <option value="reparacion-mecanica">Reparación Mecánica</option>
                <option value="reparacion-chapa-pintura">Reparación de Chapa y Pintura</option>
                <option value="revision">Revisión</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="estatus" className="block text-gray-600">
                Estatus:
              </label>
              <select
                id="estatus"
                name="estatus"
                value={jobData.estatus}
                onChange={handleInputChange}
                className="w-full border p-2"
              >
                <option value="en-proceso">En Proceso</option>
                <option value="terminado">Terminado</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="horas" className="block text-gray-600">
                Horas:
              </label>
              <input
                type="number"
                id="horas"
                name="horas"
                value={jobData.horas}
                onChange={handleInputChange}
                className="w-full border p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="precioMateriales" className="block text-gray-600">
                Precio de Materiales:
              </label>
              <input
                type="number"
                id="precioMateriales"
                name="precioMateriales"
                value={jobData.precioMateriales}
                onChange={handleInputChange}
                className="w-full border p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="precioTotal" className="block text-gray-600">
                Precio Total:
              </label>
              <input
                type="number"
                id="precioTotal"
                name="precioTotal"
                value={jobData.precioTotal}
                readOnly
                className="w-full border p-2"
              />
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