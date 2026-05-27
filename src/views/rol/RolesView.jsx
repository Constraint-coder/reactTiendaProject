import React, { useEffect, useState } from 'react'
import { getRoles, eliminarRol } from '../../services/roles/roles.services'
import Roles from '../../components/Roles/Rol.component'
import { Titulos } from '../../components/share/Titulos.component'

export  function RolesView() {
  const [data, setData]     = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditar, setIsOpenEditar] = useState(false)
  const [rolSeleccionado, setRolSeleccionado] = useState(null)

  const onClose       = () => setIsOpen(false)
  const onCloseEditar = () => setIsOpenEditar(false)

  const respuesta = async () => {
    try {
      const data = await getRoles()
      setData(data)
      console.log('data:', data)
    } catch (error) {
      alert(error.message)
    }
  }

  const eliminar = async (item) => {
    const confirmar = confirm(`¿Deseas eliminar el rol "${item.id}"?`)

    if (!confirmar) return

    try {
      const res = await eliminarRol(item.id)
      console.log('Respuesta de eliminación:', res)
      respuesta()
    } catch (error) {
      alert(error.response?.data?.message || 'Error al eliminar rol')
    }
  }

const editar = (item) => {
  console.log('item:', item)
  console.log('isOpenEditar antes:', isOpenEditar)
  setRolSeleccionado(item)
  setIsOpenEditar(true)
  console.log('isOpenEditar despues:', isOpenEditar)
}

  const headers = [
    { key: 'name', label: 'Nombre' },
    {
      key: 'guard_name',
      label: 'guard_name',
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.estado ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
  ]

  const actions = [
    {
      label: 'Editar',
      className: 'bg-blue-500 hover:bg-blue-600',
      onClick: (item) => editar(item),
    },
    {
      label: 'Eliminar',
      className: 'bg-red-500 hover:bg-red-600',
      onClick: (item) => eliminar(item),
    },
  ]

  useEffect(() => {
    respuesta()
  }, [])

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8'>
      <Titulos titulo="Roles" />

      <div className='flex justify-end mb-4'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium'
        >
          Crear Rol
        </button>
      </div>

      <Roles
        headers={headers}
        items={data}
        actions={actions}
        isOpen={isOpen}
        onClose={onClose}
        respuesta={respuesta}
        isOpenEditar={isOpenEditar}
        onCloseEditar={onCloseEditar}
        rolSeleccionado={rolSeleccionado}
      />
    </div>
  )
}