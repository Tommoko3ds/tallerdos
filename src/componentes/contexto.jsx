import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TrabajosContext = createContext();

export const useTrabajosContext = () => {
  return useContext(TrabajosContext);
};

const trabajosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRABAJOS':
      return action.payload;
    case 'ADD_TRABAJO':
      return [...state, action.payload];
    default:
      return state;
  }
};

export const TrabajosProvider = ({ children }) => {
  const [trabajos, dispatch] = useReducer(trabajosReducer, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_TRABAJOS', payload: data }))
      .catch(error => console.error(error));
  }, []);

  const addTrabajo = trabajo => {
    dispatch({ type: 'ADD_TRABAJO', payload: trabajo });
  };

  return (
    <TrabajosContext.Provider value={{ trabajos, addTrabajo }}>
      {children}
    </TrabajosContext.Provider>
  );
};
