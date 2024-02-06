import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Formulario() {
  const [trabajos, setTrabajos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas, setHoras] = useState('');
  const [precioMateriales, setPrecioMateriales] = useState('');
  const [tipoTrabajo, setTipoTrabajo] = useState('Reparacion Mecanica');
  const [precioTotal, setPrecioTotal] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!titulo || !descripcion || !horas || !precioMateriales) {
      alert("Ey, no pueden haber campos vacíos.");
      return;
    }

    const formData = {
      titulo,
      descripcion,
      tipo: tipoTrabajo,
      estatus: 'En proceso', // Estableciendo por defecto "En proceso"
      horas,
      precioMateriales,
    };

    const precioCalculado = calcularPrecioTotal();
    setPrecioTotal(precioCalculado);

    formData.precioTotal = precioCalculado;

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
        setPrecioMateriales('');
        setTipoTrabajo('Reparacion Mecanica');
        setPrecioTotal(0);
        window.location.reload();

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

  const calcularPrecioTotal = () => {
    const horasFloat = parseFloat(horas);
    const precioMaterialesFloat = parseFloat(precioMateriales);

    let precioTipoTrabajo = 0;

    switch (tipoTrabajo) {
      case 'Reparacion Mecanica':
        precioTipoTrabajo = horasFloat * 350 + precioMaterialesFloat * 1.1;
        break;
      case 'Reparacion Chapa y Pintura':
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
    <form onSubmit={handleSubmit} className="space-y-2 w-96">
      <h1 className='font-bold text-2xl'>Ingresa los detalles del trabajo</h1>
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-600">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="horas" className="block text-sm font-medium text-gray-600">
          Horas:
        </label>
        <input
          type="number"
          id="horas"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="precioMateriales" className="block text-sm font-medium text-gray-600">
          Precio de Material:
        </label>
        <input
          type="number"
          id="precioMateriales"
          value={precioMateriales}
          onChange={(e) => setPrecioMateriales(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="tipoTrabajo" className="block text-sm font-medium text-gray-600">
          Tipo de Trabajo:
        </label>
        <select
          id="tipoTrabajo"
          value={tipoTrabajo}
          onChange={handleTipoTrabajoChange}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="Reparacion Mecanica">Reparación Mecánica</option>
          <option value="Reparacion Chapa y Pintura">Reparación Chapa y Pintura</option>
          <option value="Revision">Revisión</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto block"
      >
        Guardar
      </button>
    </form>
  );
}
