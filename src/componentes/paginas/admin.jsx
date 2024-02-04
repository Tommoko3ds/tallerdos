import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setUsername('');
    setPassword('');
    setEmail('');
  };

  const handleAddUser = async () => {
    try {
      if (!username || !password || !email) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      const response = await axios.post('http://localhost:5000/users/usuarios', {
        usuario: username,
        contrasena: password,
        correo: email,
      });

      if (response.status === 200) {
        fetchUsers();
        setUsername('');
        setPassword('');
        setEmail('');
        closeModal();
      } else {
        console.error('Error al agregar usuario:', response.data.error);
      }
    } catch (error) {
      console.error('Error de red al agregar usuario:', error);
    }
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);

    const selectedUser = users.find((user) => user.id_usuario === userId);

    setUsername(selectedUser.usuario);
    setPassword(selectedUser.contrasena);
    setEmail(selectedUser.correo);

    openModal(); 
  };

  const handleUpdateUser = async () => {
    try {
      if (!username || !password || !email) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      const response = await axios.put(`http://localhost:5000/users/usuarios/${selectedUserId}`, {
        usuario: username,
        contrasena: password,
        correo: email,
      });

      if (response.status === 200) {
        fetchUsers();
        setUsername('');
        setPassword('');
        setEmail('');
        setSelectedUserId(null);
        closeModal();
      } else {
        console.error('Error al actualizar usuario:', response.data.error);
      }
    } catch (error) {
      console.error('Error de red al actualizar usuario:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/usuarios/${userId}`);

      if (response.status === 200) {
        fetchUsers();
      } else {
        console.error('Error al eliminar usuario:', response.data.error);
      }
    } catch (error) {
      console.error(`Error de red al eliminar usuario con ID ${userId}:`, error);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Listado de Usuarios</h3>
      <ul className="p-9">
        {users.map((user) => (
          <li className="text-xl font-bold mb-6 bg-green-300 rounded-lg p-4" key={user.id_usuario}>
            <div>
              {user.usuario} - {user.correo}
            </div>
            <div className='mt-4'>
              <button className="bg-blue-500 text-white rounded mr-2 hover:bg-blue-700" onClick={() => handleEditUser(user.id_usuario)}>
                Editar
              </button>
              <button className="bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleDeleteUser(user.id_usuario)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-700" onClick={openModal}>
        Agregar Usuario
      </button>

      
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <div className="relative p-8 bg-white w-96 rounded shadow-lg">
            <span className="absolute top-0 right-0 text-xl cursor-pointer" onClick={closeModal}>&times;</span>

            <h3 className="text-xl font-bold mb-4">
              {selectedUserId ? 'Editar Usuario' : 'Agregar Usuario'}
            </h3>
            <div>
              <label>Usuario:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Contraseña:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-700" onClick={selectedUserId ? handleUpdateUser : handleAddUser}>
              {selectedUserId ? 'Actualizar Usuario' : 'Agregar Usuario'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
