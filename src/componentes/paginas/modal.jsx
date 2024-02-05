import React, { useState, useEffect } from 'react';
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
      <button
        className='bg-blue-700 text-white m-9 rounded-lg p-9 font-bold'
        onClick={() => setModalAbierto(true)}
      >
        Agregar Trabajo
      </button>
      {modalAbierto && (
        <div className='fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center'>
          <div className='bg-white p-5 rounded flex flex-col justify-center items-center gap-5'>
          <Formulario />
            <button className='bg-blue-700 text-white m-2 rounded-lg p-2 font-bold' onClick={() => setModalAbierto(false)}>Listo</button>
          </div>
         
        </div>
      )}
    </div>
  );
}
