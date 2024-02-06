import React, { useState } from "react";
import Formulario from "../formulario";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Modal() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-700 text-white m-9 rounded-lg p-2 font-bold"
        onClick={() => setModalAbierto(true)}
      >
        Agregar
      </button>
      {modalAbierto && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-5 rounded relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-lg p-2"
              onClick={() => setModalAbierto(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <Formulario />
          </div>
        </div>
      )}
    </div>
  );
}
