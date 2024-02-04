import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [titulo, setTitulo] = useState('');
  const [trabajos, setTrabajos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs?titulo=${titulo}`);
      setTrabajos(response.data);
    } catch (error) {
      console.error('Error al buscar trabajos:', error);
    }
  };

  useEffect(() => {
    // Lógica para cargar todos los trabajos inicialmente
    // Puedes adaptar esto según tu caso
    const fetchTrabajos = async () => {
      try {
        const response = await axios.get('hhttp://localhost:5000/api/jobs');
        setTrabajos(response.data.trabajos);
      } catch (error) {
        console.error('Error al obtener trabajos:', error);
      }
    };

    fetchTrabajos();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {/* Mostrar los trabajos encontrados */}
     
    </div>
  );
};

export default SearchComponent;
