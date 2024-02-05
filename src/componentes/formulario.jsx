import React, { useState } from 'react';
import axios from 'axios';

export default function Formulario() {
    const [trabajos, setTrabajos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas, setHoras] = useState('');
  const [estatus, setEstatus] = useState('En proceso');
  const [precioMateriales, setPrecioMateriales] = useState('');
  const [tipoTrabajo, setTipoTrabajo] = useState('ReparacionMecanica');
  const [precioTotal, setPrecioTotal] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        // Assuming response.data.trabajo contains the newly added job details
        // Update the state with the new job
        setTrabajos([...trabajos, response.data.trabajo]);

        // Reset form fields
        setTitulo('');
        setDescripcion('');
        setHoras('');
        setEstatus('En proceso');
        setPrecioMateriales('');
        setTipoTrabajo('ReparacionMecanica');
        setPrecioTotal(0);
      } else {
        // If the response status is not 200, log an error message
        console.error('Error al guardar trabajo:', response.data.error);
      }
    } catch (error) {
      // Catch network errors when sending data
      console.error('Error de red al enviar datos:', error);
    }
  };
  const handleTipoTrabajoChange = (event) => {
    setTipoTrabajo(event.target.value);
  };

  // Assume you have the following function defined for calculating the total price
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



  return (
    <div className="z-50 bg-white p-8 rounded shadow-md w-96">
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
    </div>
  );
}
