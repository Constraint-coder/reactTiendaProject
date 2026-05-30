import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { usuarios, eliminarUsuario } from '../../../services/usuario/usuario/usuarios.services'
import Usuarios from '../../../components/Usuarios/usuario/Usuario.component'
import { Titulos } from '../../../components/share/Titulos.component'
import { Modal } from '../../../components/share/modal.component'
import { hasPermission } from '../../../services/auth/auth.services'

export function UsuariosView() {
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditar, setIsOpenEditar] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const onClose = () => setIsOpen(false)  
  const onCloseEditar = () => setIsOpenEditar(false) 

  
  const respuesta = async () => {
    try {
      const data = await usuarios()
      setData(data)
      console.log('estos son usuarios:', data)
    } catch (error) {
      alert(error.message)
    }
  }



const editar = (item) => {
  setUsuarioSeleccionado(item)
  setIsOpenEditar(true)
}

  const headers = [
    { key: "nombre", label: "Nombre" },
    {
      key: "email", label: "Email"
    },
  { 
    key: "roles", 
    label: "Rol",
   render: (item) => item.roles.length > 0 ? item.roles[0].name : 'Sin rol'
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
  
  const inactiv = async (item) => {}

const eliminar = async (item) => {
  const confirmar = confirm(`¿Deseas desactivar a ${item.nombre}?`)
  if (!confirmar) return

  try {
    await eliminarUsuario(item.id)
    respuesta()
  } catch (error) {
    alert(error.response?.data?.message || 'Error al eliminar usuario')
  }
}
  const items = data;

  const actions = [
    {
      label: "Editar",
      className: "bg-blue-500 hover:bg-blue-600",
     onClick: (item) => editar(item)
    },
    {
      label: (item) => item.estado ? "Desactivar" : "Inactivo",
      className: (item) => item.estado ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600 hidden",
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
      {hasPermission('crear usuarios') && (
      <div className='flex justify-end mb-4'>
        <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium'>Crear Usuario</button>
      </div>
      )}

      <Usuarios headers={headers} items={items} actions={actions} isOpen={isOpen} onClose={onClose}   respuesta={respuesta}         isOpenEditar={isOpenEditar}
        onCloseEditar={onCloseEditar}
        usuarioSeleccionado={usuarioSeleccionado}  />
      
      </div>

    </>
  )
}
