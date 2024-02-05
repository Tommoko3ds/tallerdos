import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Modal = ({ showModal, closeModal }) => {
  const [trabajos, setTrabajos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas, setHoras] = useState('');
  const [estatus, setEstatus] = useState('En proceso');
  const [precioMateriales, setPrecioMateriales] = useState('');
  const [tipoTrabajo, setTipoTrabajo] = useState('ReparacionMecanica');
  const [precioTotal, setPrecioTotal] = useState(0);
  const [formDataDisplay, setFormDataDisplay] = useState(null);

  const TrabajoItem = ({ trabajo, index }) => {
    if (!trabajo) {
      return null;
    }

    return (
      <div key={index} className="mb-4 border p-4 rounded">
        <h4 className="text-lg font-bold">{trabajo.titulo}</h4>
        <p>{trabajo.descripcion}</p>
        <p>Horas: {trabajo.horas}</p>
        <p>Estatus: {trabajo.estatus}</p>
        <p>Precio Total: ${trabajo.precioTotal.toFixed(2)}</p>
      </div>
    );
  };

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setTrabajos(response.data);
      } catch (error) {
        console.error('Error al obtener trabajos desde la base de datos:', error);
      }
    };

    fetchTrabajos();
  }, []);

  const handleTipoTrabajoChange = (event) => {
    setTipoTrabajo(event.target.value);
  };

  const calcularPrecioTotal = () => {
    const horasFloat = parseFloat(horas);
    const precioMaterialesFloat = parseFloat(precioMateriales);

    let precioTipoTrabajo = 0;

    switch (tipoTrabajo) {
      case 'ReparacionMecanica':
        precioTipoTrabajo = horasFloat * 350 + precioMaterialesFloat * 1.1;
        break;
      case 'ReparacionChapaPintura':
        precioTipoTrabajo = horasFloat * 350 + precioMaterialesFloat * 1.3;
        break;
      case 'Revision':
        precioTipoTrabajo = horasFloat * 350 + 450;
        break;
      default:
        break;
    }

    return precioTipoTrabajo;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (precioMateriales === '') {
      console.error('El campo precioMateriales no puede estar vacío');
      return;
    }

    const formData = {
      titulo,
      descripcion,
      tipo: tipoTrabajo,
      estatus,
      horas,
      precioMateriales,
    };

    const precioCalculado = calcularPrecioTotal();
    setPrecioTotal(precioCalculado);

    formData.precioTotal = precioCalculado;

    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:5000/api/jobs', formData);

      console.log(response.data.message);

      if (response.status === 200) {
        setTrabajos([...trabajos, response.data.trabajo]);

        await new Promise((resolve) => {
          calcularPrecioTotal();
          resolve();
        });

        setFormDataDisplay(formData);

        setTitulo('');
        setDescripcion('');
        setHoras('');
        setEstatus('En proceso');
        setPrecioMateriales('');
        setTipoTrabajo('ReparacionMecanica');
        setPrecioTotal(0);

        closeModal();
      } else {
        console.error('Error al guardar trabajo:', response.data.error);
      }
    } catch (error) {
      console.error('Error de red al enviar datos:', error);
    }
  };

  return (
    <div>
    <div>
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        showModal ? '' : 'hidden'
      }`}
    >
      <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={closeModal}></div>
     
      <div className="z-50 bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Formulario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="horas">Horas:</label>
            <input
              type="number"
              id="horas"
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estatus">Estatus:</label>
            <select
              id="estatus"
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="En proceso">En proceso</option>
              <option value="Terminado">Terminado</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="precioMateriales">Precio de Material:</label>
            <input
              type="number"
              id="precioMateriales"
              value={precioMateriales}
              onChange={(e) => setPrecioMateriales(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tipoTrabajo">Tipo de Trabajo:</label>
            <select
              id="tipoTrabajo"
              value={tipoTrabajo}
              onChange={handleTipoTrabajoChange}
              className="w-full p-2 border rounded"
            >
              <option value="ReparacionMecanica">Reparación Mecánica</option>
              <option value="ReparacionChapaPintura">Reparación Chapa y Pintura</option>
              <option value="Revision">Revisión</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Calcular Precio Total
          </button>
        </form>
        <div className="mt-4">
          <p>Precio Total: ${precioTotal.toFixed(2)}</p>
        </div>
        
      </div>
      </div>

    </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">LISTA DE TRABAJOS</h3>
        {Array.isArray(trabajos) && trabajos.length > 0 ? (
          trabajos.map((trabajo, index) => (
            <TrabajoItem key={index} trabajo={trabajo} index={index} />
          ))
        ) : (
          <p>No hay trabajos disponibles</p>
        )}
      </div>
      {/* ... (código previo) */}
    </div>
  );
};

export default Modal;
