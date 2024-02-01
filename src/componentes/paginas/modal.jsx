import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Modal = ({ showModal, closeModal }) => {
  const handleDelete = async (id_trabajo) => {
    console.log('Eliminando trabajo con ID:', id_trabajo);
  
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id_trabajo}`);
      console.log(`Trabajo con ID ${id_trabajo} eliminado correctamente`);
  
      // Actualiza la lista después de eliminar
      const response = await axios.get('http://localhost:5000/api/jobs');
      setTrabajos(response.data);
  
      // Otras acciones que puedas necesitar después de eliminar el trabajo
  
    } catch (error) {
      console.error(`Error al eliminar trabajo con ID ${id_trabajo}:`, error);
    }
  };
  

  const handleEdit = (trabajo) => {
    // Implement your edit logic here
    console.log('Editing job:', trabajo);
  };
  const [trabajos, setTrabajos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas, setHoras] = useState('');
  const [estatus, setEstatus] = useState('En proceso');
  const [precioMateriales, setPrecioMateriales] = useState('');
  const [tipoTrabajo, setTipoTrabajo] = useState('ReparacionMecanica');
  const [precioTotal, setPrecioTotal] = useState(0);
  const [formDataDisplay, setFormDataDisplay] = useState(null);
  const [busqueda, setBusqueda] = useState('');

 
  
  const TrabajoItem = ({ trabajo, index, onEdit, onDelete }) => {
    if (!trabajo) {
      return null;
    }
    const handleDelete = () => {
      onDelete(trabajo.id_trabajo);
    };
   
    const handleEdit = () => {
      onEdit(trabajo);
    };

    return (
      <div key={index} className="mb-4 border p-4 rounded">
        <h4 className="text-lg font-bold">{trabajo.titulo}</h4>
        <p>{trabajo.descripcion}</p>
        <p>Horas: {trabajo.horas}</p>
        <p>Estatus: {trabajo.estatus}</p>
        <p>Precio Total: ${trabajo.precioTotal.toFixed(2)}</p>


         <button onClick={handleEdit} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
        Editar
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">
        Eliminar
      </button>
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
    
       
        setFormDataDisplay(formData);
  
        setTitulo('');
        setDescripcion('');
        setHoras('');
        setEstatus('En proceso');
        setPrecioMateriales('');
        setTipoTrabajo('ReparacionMecanica');
        setPrecioTotal(0);
    
        // Cierra el modal
        closeModal();
      } else {
        // Si la respuesta no es 200, imprime un mensaje de error
        console.error('Error al guardar trabajo:', response.data.error);
      }
    } catch (error) {
      // Captura errores de red al enviar datos
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
       
      </div>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 inline-block bg-orange-300 rounded-lg p-4">EN PROCESO</h3>
            {trabajos
  .filter((trabajo) => trabajo && trabajo.estatus === 'En proceso' && trabajo.titulo.toLowerCase().includes(busqueda.toLowerCase()))
  .map((trabajo, index) => (
    <TrabajoItem key={index} trabajo={trabajo} index={index} onDelete={handleDelete} onEdit={handleEdit} />
  ))}


          </div>
        </div>
        <div className="w-1/2 pl-4">
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 inline-block bg-green-300 rounded-lg p-4">TERMINADOS</h3>
            {trabajos
  .filter((trabajo) => trabajo && trabajo.estatus === 'Terminado' && trabajo.titulo.toLowerCase().includes(busqueda.toLowerCase()))
  .map((trabajo, index) => (
    <TrabajoItem key={index} trabajo={trabajo} index={index} onDelete={handleDelete} onEdit={handleEdit} />
  ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
