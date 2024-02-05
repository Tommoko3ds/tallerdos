import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ListaTrabajos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [editarModal, setEditarModal] = useState(false);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
  const [trabajoEditado, setTrabajoEditado] = useState({
    titulo: '',
    descripcion: '',
    tipo: '',
    estatus: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(response => response.json())
      .then(data => setTrabajos(data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = async (id_trabajo) => {
    console.log('Eliminando trabajo con ID:', id_trabajo);
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id_trabajo}`);
      console.log(`Trabajo con ID ${id_trabajo} eliminado correctamente`);
      const response = await axios.get('http://localhost:5000/api/jobs');
      setTrabajos(response.data);
    } catch (error) {
      console.error(`Error al eliminar trabajo con ID ${id_trabajo}:`, error);
    }
  };

  const handleEdit = (id_trabajo) => {
    const trabajoSeleccionado = trabajos.find((trabajo) => trabajo.id_trabajo === id_trabajo);
    setTrabajoSeleccionado(trabajoSeleccionado);
    setTrabajoEditado({
      titulo: trabajoSeleccionado.titulo,
      descripcion: trabajoSeleccionado.descripcion,
      tipo: trabajoSeleccionado.tipo,
      estatus: trabajoSeleccionado.estatus,
    });
    setEditarModal(true);
  };

  const handleUpdateTrabajo = async () => {
    try {
      if (!trabajoEditado.titulo || !trabajoEditado.descripcion || !trabajoEditado.estatus) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/jobs/${trabajoSeleccionado.id_trabajo}`,
        trabajoEditado
      );

      if (response.status === 200) {
        const updatedResponse = await axios.get('http://localhost:5000/api/jobs');
        setTrabajos(updatedResponse.data);
        setTrabajoEditado({
          titulo: '',
          descripcion: '',
          tipo: '',
          estatus: '',
        });
        setEditarModal(false);
      } else {
        console.error('Error al actualizar trabajo:', response.data.error);
      }
    } catch (error) {
      console.error('Error de red al actualizar trabajo:', error);
    }
  };

  const trabajosEnProceso = trabajos.filter((trabajo) => trabajo.estatus === 'En proceso');
  const trabajosTerminados = trabajos.filter((trabajo) => trabajo.estatus === 'Terminado');

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h3 className="text-lg font-bold mb-2 bg-orange-300 rounded-lg p-2 w-fit">En proceso</h3>
          <ul>
            {trabajosEnProceso.map((trabajo) => (
              <li key={trabajo.id_trabajo} className="mb-4 border p-4 rounded">

            <h4 className="text-lg font-bold">{trabajo.titulo}</h4>
            <p>Descripción: {trabajo.descripcion}</p>
            <p>Estatus: {trabajo.estatus}</p>
            <p>Precio Total: ${trabajo.precioTotal.toFixed(2)}</p>
            <button onClick={() => handleEdit(trabajo.id_trabajo)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
  Editar
</button>
            {editarModal && trabajoSeleccionado && (
              <div className='fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center'>
                <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
                  <h4 className="text-lg font-bold">Editar Trabajo</h4>
                  <label htmlFor="tituloEdit">Título:</label>
                  <input
                    type="text"
                    id="tituloEdit"
                    value={tituloEdit}
                    onChange={(e) => setTituloEdit(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <label htmlFor="descripcionEdit">Descripción:</label>
                  <textarea
                    id="descripcionEdit"
                    value={descripcionEdit}
                    onChange={(e) => setDescripcionEdit(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <label htmlFor="estatusEdit">Estatus:</label>
                  <select
  id="estatusEdit"
  value={trabajoSeleccionado ? estatusEdit : "En proceso"} // Add a conditional check
  onChange={(e) => setEstatusEdit(e.target.value)}
  className="w-full p-2 border rounded"
>
  <option value="En proceso">En proceso</option>
  <option value="Terminado">Terminado</option>
</select>


                  <button
                    className='bg-blue-700 text-white m-2 rounded-lg p-2 font-bold'
                    onClick={handleUpdateTrabajo}
                  >
                    Guardar
                  </button>
                  <button
                    className='bg-red-500 text-white m-2 rounded-lg p-2 font-bold'
                    onClick={() => setEditarModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            <button onClick={() => handleDelete(trabajo.id_trabajo)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700" >
              Eliminar
            </button>
          
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-4">
          <h3 className="text-lg font-bold mb-2 bg-green-300 rounded-lg p-2 w-fit">Terminados</h3>
          <ul>
            {trabajosTerminados.map((trabajo) => (
              <li key={trabajo.id_trabajo} className="mb-4 border p-4 rounded">
                    
            <h4 className="text-lg font-bold">{trabajo.titulo}</h4>
            <p>Descripción: {trabajo.descripcion}</p>
            <p>Estatus: {trabajo.estatus}</p>
            <p>Precio Total: ${trabajo.precioTotal.toFixed(2)}</p>
            <button onClick={() => handleEdit(trabajo.id_trabajo)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
  Editar
</button>
            {editarModal && trabajoSeleccionado && (
              <div className='fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center'>
                <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
                  <h4 className="text-lg font-bold">Editar Trabajo</h4>
                  <label htmlFor="tituloEdit">Título:</label>
                  <input
                    type="text"
                    id="tituloEdit"
                    value={tituloEdit}
                    onChange={(e) => setTituloEdit(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <label htmlFor="descripcionEdit">Descripción:</label>
                  <textarea
                    id="descripcionEdit"
                    value={descripcionEdit}
                    onChange={(e) => setDescripcionEdit(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <label htmlFor="estatusEdit">Estatus:</label>
                  <select
  id="estatusEdit"
  value={trabajoSeleccionado ? estatusEdit : "En proceso"} // Add a conditional check
  onChange={(e) => setEstatusEdit(e.target.value)}
  className="w-full p-2 border rounded"
>
  <option value="En proceso">En proceso</option>
  <option value="Terminado">Terminado</option>
</select>


                  <button
                    className='bg-blue-700 text-white m-2 rounded-lg p-2 font-bold'
                    onClick={handleUpdateTrabajo}
                  >
                    Guardar
                  </button>
                  <button
                    className='bg-red-500 text-white m-2 rounded-lg p-2 font-bold'
                    onClick={() => setEditarModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            <button onClick={() => handleDelete(trabajo.id_trabajo)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700" >
              Eliminar
            </button>
         
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListaTrabajos;
