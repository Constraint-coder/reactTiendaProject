import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { usuarios, eliminarUsuario } from '../../../services/usuario/usuario/usuarios.services'
import Usuarios from '../../../components/Usuarios/usuario/Usuario.component'
import { Titulos } from '../../../components/share/Titulos.component'
import { Modal } from '../../../components/share/modal.component'

export function UsuariosView() {
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const respuesta = async () => {
    try {
      const data = await usuarios()
      setData(data)
      console.log('estos son usuarios:', data)
    } catch (error) {
      alert(error.message)
    }
  }
  const headers = [
    { key: "nombre", label: "Nombre" },
    {
      key: "email", label: "Email"
    },
  { 
    key: "rol", 
    label: "Rol",
    render: (item) => item.rol?.nombre ?? 'Sin rol'  // ← extraer el nombre
  },
    {
      key: "estado",
      label: "Estado",
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.estado ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
  ];
  const eliminar = async (item) => {
    const response = await eliminarUsuario(item.id)
    console.log(response)
    if (response.status === 200) {
      respuesta()
    }
  }
  const items = data;

  const actions = [
    {
      label: "Ver",
      className: "bg-gray-500 hover:bg-gray-600",
      onClick: (item) => console.log("Ver", item),
    },
    {
      label: "Editar",
      className: "bg-blue-500 hover:bg-blue-600",
      onClick: (item) => console.log("Editar", item),
    },
    {
      label: (item) => item.estado ? "Desactivar" : "Activar",
      className: (item) => item.estado ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600",
      onClick: (item) => eliminar(item),
    },
  ];

  useEffect(() => {
    respuesta()
  }, [])
  
  return (
    <>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <Titulos titulo="Usuarios" />
      <div className='flex justify-end mb-4'>
        <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium'>Crear Usuario</button>
      </div>

      <Usuarios headers={headers} items={items} actions={actions} isOpen={isOpen} onClose={onClose}   respuesta={respuesta}   />
      
      </div>

    </>
  )
}
