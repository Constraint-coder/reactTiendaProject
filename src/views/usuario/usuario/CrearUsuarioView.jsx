/* import React, { useState } from 'react'
import { CrearUsuario } from '@/components/Usuarios/usuario/crear/CrearUsuario.component'
import { crearUsuario } from '../../../services/usuario/usuario/usuarios.services'

export function CrearUsuarioView({ respuesta }) {

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);

      const response = await crearUsuario(data);
      console.log('response:', response);

      if (response) {
        respuesta(); // refrescar lista o lo que necesites
        setIsOpen(false);
      }

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <button
        onClick={() => setIsOpen(true)}
        className='bg-blue-500 text-white p-2 rounded'
      >
        Nuevo Usuario
      </button>

      <CrearUsuario
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreate}
      />

      {loading && (
        <p className="text-gray-500 mt-2">
          Creando usuario...
        </p>
      )}

    </div>
  );
} */