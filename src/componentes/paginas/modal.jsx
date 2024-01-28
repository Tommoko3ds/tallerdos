import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ showModal, closeModal, trabajos, setTrabajos }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas, setHoras] = useState('');
  const [estatus, setEstatus] = useState('En proceso');
  const [precioMateriales, setPrecioMateriales] = useState('');
  const [tipoTrabajo, setTipoTrabajo] = useState('ReparacionMecanica');
  const [precioTotal, setPrecioTotal] = useState(0);



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

    setPrecioTotal(precioTipoTrabajo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    calcularPrecioTotal();

    // Verificar que el campo precioMateriales tiene un valor antes de enviar la solicitud
    if (precioMateriales === '') {
      console.error('El campo precioMateriales no puede estar vacío');
      return;  // Salir de la función si precioMateriales está vacío
    }

    try {
      const response = await axios.post('http://localhost:5000/api/jobs', {
        titulo,
        descripcion,
        tipo: tipoTrabajo,
        estatus,
        horas,
        precioMateriales,
        precioTotal,
      });

      console.log(response.data.message);

      if (response.status === 200) {
        // Actualizar la lista de trabajos
        setTrabajos([...trabajos, response.data.trabajo]);

        // Limpiar los campos
        setTitulo('');
        setDescripcion('');
        setHoras('');
        setEstatus('En proceso');
        setPrecioMateriales('');
        setTipoTrabajo('ReparacionMecanica');
        setPrecioTotal(0);

        // Puedes realizar acciones adicionales después de guardar, como cerrar el modal
        closeModal();
      } else {
        console.error('Error al guardar trabajo:', response.data.error);
        // Puedes manejar el error de alguna manera
      }
    } catch (error) {
      console.error('Error de red al enviar datos:', error);
      // Puedes manejar el error de red de alguna manera
    }
  };

  return (
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
       {/* Lista de trabajos */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Lista de Trabajos</h3>
          <ul>
          {trabajos &&
  trabajos.map((trabajo) => (
    <li key={trabajo.id_trabajo}>
      {trabajo.titulo && <span>{trabajo.titulo} - </span>}
      {trabajo.descripcion && <span>{trabajo.descripcion} - </span>}
      {trabajo.precioTotal !== undefined && <span>{trabajo.precioTotal}</span>}
    </li>
  ))}


          </ul>
        </div>
    </div>
    
  );
};

export default Modal;
