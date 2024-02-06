import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ListaTrabajos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [editarModal, setEditarModal] = useState(false);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
  const [tituloEdit, setTituloEdit] = useState("");
  const [descripcionEdit, setDescripcionEdit] = useState("");
  const [tipoEdit, setTipoEdit] = useState("");
  const [estatusEdit, setEstatusEdit] = useState("");
  const [horasEdit, setHorasEdit] = useState("");
  const [precioMaterialesEdit, setPrecioMaterialesEdit] = useState("");
  const[precioTotalEdit, setPrecioTotalEdit] = useState("");
  const[tipoMaterialEdit, setTipoMaterialEdit] = useState("");
    const [expandedDetails, setExpandedDetails] = useState({});


  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((response) => response.json())
      .then((data) => setTrabajos(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id_trabajo) => {
    console.log("Eliminando trabajo con ID:", id_trabajo);
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id_trabajo}`);
      console.log(`Trabajo con ID ${id_trabajo} eliminado correctamente`);
      const response = await axios.get("http://localhost:5000/api/jobs");
      setTrabajos(response.data);
    } catch (error) {
      console.error(`Error al eliminar trabajo con ID ${id_trabajo}:`, error);
    }
  };
  const handleEdit = (id_trabajo) => {
    const trabajoSeleccionado = trabajos.find(
      (trabajo) => trabajo.id_trabajo === id_trabajo
    );
    setTrabajoSeleccionado(trabajoSeleccionado);
    setTituloEdit(trabajoSeleccionado.titulo);
    setDescripcionEdit(trabajoSeleccionado.descripcion);
    setTipoEdit(trabajoSeleccionado.tipo);
    setEstatusEdit(trabajoSeleccionado.estatus);
    setHorasEdit(trabajoSeleccionado.horas);
    setPrecioMaterialesEdit(trabajoSeleccionado.precioMateriales);
    setEditarModal(true);
  };
  
  const handleUpdateTrabajo = async () => {
    try {
      if (!tituloEdit ) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/jobs/${trabajoSeleccionado.id_trabajo}`,
        {
          titulo: tituloEdit,
          descripcion: descripcionEdit,
          estatus: estatusEdit,
          tipo: tipoEdit,
          horas: horasEdit,
          precioMateriales: precioMaterialesEdit,
          precioTotal: precioTotalEdit,
        }
      );
      if (response.status === 200) {
        const updatedResponse = await axios.get(
          "http://localhost:5000/api/jobs"
        );
        setTrabajos(updatedResponse.data);
        setTituloEdit("");
        setDescripcionEdit("");
        setEstatusEdit("");
        setTipoEdit("");
        setHorasEdit("");
        setEditarModal(false);
      } else {
        console.error("Error al actualizar trabajo:", response.data.error);
      }
    } catch (error) {
      console.error("Error de red al actualizar trabajo:", error);
    }
  };

 
  const trabajosEnProceso = trabajos.filter((trabajo) => trabajo.estatus === "En proceso");
  const trabajosTerminados = trabajos.filter((trabajo) => trabajo.estatus === "Terminado");


  const handleViewDetails = (id_trabajo) => {
    // Encuentra el trabajo correspondiente en los trabajos terminados
    const trabajoSeleccionado = trabajosTerminados.find(
      (trabajo) => trabajo.id_trabajo === id_trabajo
    );
    // Actualiza los detalles del trabajo seleccionado
    setTrabajoSeleccionado(trabajoSeleccionado);
    // Actualiza el estado para mostrar los detalles
    setExpandedDetails((prevDetails) => ({
      ...prevDetails,
      [id_trabajo]: !prevDetails[id_trabajo]
    }));
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h3 className="text-lg font-bold mb-2 bg-orange-300 rounded-lg p-2 w-fit">
            En proceso
          </h3>
          <ul>
             {trabajosEnProceso.map((trabajo) => (
              <li key={trabajo.id_trabajo} className="mb-4 border p-4 rounded shadow-md flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold">{trabajo.titulo}</h4>
                  <div className="flex flex-row">
                    <p className="mr-8">Tipo: {trabajo.tipo}</p>
                    <p>Horas: {trabajo.horas}</p>
                  </div>
                  {expandedDetails[trabajo.id_trabajo] && (
                    <div className="expanded-details">
                      {/* Renderiza los detalles adicionales aquí */}
                      <p>Descripción: {trabajo.descripcion}</p>
                      <p>Estatus: {trabajo.estatus}</p>
                      <p>Precio de materiales: {trabajo.precioMateriales}</p>
                      <p>Total: ${trabajo.precioTotal}</p>
                    </div>
                  )}
                </div>
                <div>
                <FontAwesomeIcon
  icon={faEye}
  className="mr-2 text-gray-500 hover:text-gray-700 cursor-pointer"
  onClick={() => handleViewDetails(trabajo.id_trabajo)} // Usa el nuevo método handleViewDetails
/>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="mr-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => handleEdit(trabajo.id_trabajo)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(trabajo.id_trabajo)}
                  />
                 </div>

                 {editarModal && trabajoSeleccionado && trabajoSeleccionado.id_trabajo === trabajo.id_trabajo && (
  <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center">
    <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
      <h4 className="text-lg font-bold">Editar Trabajo</h4>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <label htmlFor="tituloEdit">Título:</label>
          <input
            type="text"
            id="tituloEdit"
            value={tituloEdit}
            onChange={(e) => setTituloEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="descripcionEdit">Descripción:</label>
          <textarea
            id="descripcionEdit"
            value={descripcionEdit}
            onChange={(e) => setDescripcionEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="estatusEdit">Estatus:</label>
          <select
            id="estatusEdit"
            value={estatusEdit}
            onChange={(e) => setEstatusEdit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="En proceso">En proceso</option>
            <option value="Terminado">Terminado</option>
          </select>
        </div>
        <div>
          <label htmlFor="horasEdit">Horas:</label>
          <input
            type="number"
            id="horasEdit"
            value={horasEdit}
            onChange={(e) => setHorasEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="precioMaterialesEdit">Precio de Materiales:</label>
          <input
            type="number"
            id="precioMaterialesEdit"
            value={precioMaterialesEdit}
            onChange={(e) => setPrecioMaterialesEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        className="bg-blue-700 text-white m-2 rounded-lg p-2 font-bold"
        onClick={handleUpdateTrabajo}
      >
        Guardar
      </button>
      <button
        className="bg-red-500 text-white m-2 rounded-lg p-2 font-bold"
        onClick={() => setEditarModal(false)}
      >
        Cancelar
      </button>
    </div>
  </div>
)}







  </li>
))}
          </ul>
        </div>
        <div className="w-1/2 pl-4">
          <h3 className="text-lg font-bold mb-2 bg-green-300 rounded-lg p-2 w-fit">
            Terminados
          </h3>
          <ul>
          {trabajosTerminados.map((trabajo) => (
  <li key={trabajo.id_trabajo} className="mb-4 border shadow-md p-4 rounded flex justify-between items-center">
    <div>
      <h4 className="text-lg font-bold">{trabajo.titulo}</h4>
      <div className="flex flex-row">
        <p className="mr-8">Tipo: {trabajo.tipo}</p>
        <p>Horas: {trabajo.horas}</p>
      </div>
      {expandedDetails[trabajo.id_trabajo] && (
        <div className="expanded-details">
          <p>Descripción: {trabajo.descripcion}</p>
          <p>Estatus: {trabajo.estatus}</p>
          <p>Precio de materiales: {trabajo.precioMateriales}</p>
          <p>Total: ${trabajo.precioTotal}</p>
        </div>
      )}
    </div>
    <div>
      <FontAwesomeIcon
        icon={faEye}
        className="mr-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => handleViewDetails(trabajo.id_trabajo)}
      />
      <FontAwesomeIcon
        icon={faPenToSquare}
        className="mr-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => handleEdit(trabajo.id_trabajo)}
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => handleDelete(trabajo.id_trabajo)}
      />
    </div>





    {editarModal && trabajoSeleccionado && trabajoSeleccionado.id_trabajo === trabajo.id_trabajo && (
  <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center">
    <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
      <h4 className="text-lg font-bold">Editar Trabajo</h4>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <label htmlFor="tituloEdit">Título:</label>
          <input
            type="text"
            id="tituloEdit"
            value={tituloEdit}
            onChange={(e) => setTituloEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="descripcionEdit">Descripción:</label>
          <textarea
            id="descripcionEdit"
            value={descripcionEdit}
            onChange={(e) => setDescripcionEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="estatusEdit">Estatus:</label>
          <select
            id="estatusEdit"
            value={estatusEdit}
            onChange={(e) => setEstatusEdit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="En proceso">En proceso</option>
            <option value="Terminado">Terminado</option>
          </select>
        </div>
        <div>
          <label htmlFor="horasEdit">Horas:</label>
          <input
            type="number"
            id="horasEdit"
            value={horasEdit}
            onChange={(e) => setHorasEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="precioMaterialesEdit">Precio de Materiales:</label>
          <input
            type="number"
            id="precioMaterialesEdit"
            value={precioMaterialesEdit}
            onChange={(e) => setPrecioMaterialesEdit(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        className="bg-blue-700 text-white m-2 rounded-lg p-2 font-bold"
        onClick={handleUpdateTrabajo}
      >
        Guardar
      </button>
      <button
        className="bg-red-500 text-white m-2 rounded-lg p-2 font-bold"
        onClick={() => setEditarModal(false)}
      >
        Cancelar
      </button>
    </div>
  </div>
)}


  </li>
))}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListaTrabajos;