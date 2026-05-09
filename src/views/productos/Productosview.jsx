import React, { useEffect, useState } from 'react'
import {
  getProductos,
  eliminarProducto
} from '../../services/productos/productos.services'
import Productos from '../../components/productos/Producto.component'
import { Titulos } from '../../components/share/Titulos.component'

export function ProductosView() {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditar, setIsOpenEditar] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const onClose = () => setIsOpen(false)
  const onCloseEditar = () => setIsOpenEditar(false)

  // Obtener productos
  const respuesta = async () => {
    try {
      const data = await getProductos()
      setData(data)
    } catch (error) {
      alert(error.message)
    }
  }

  // Eliminar (desactivar)
  const eliminar = async (item) => {
    const confirmar = confirm(`¿Deseas eliminar el producto "${item.nombre}"?`)
    if (!confirmar) return

    try {
      await eliminarProducto(item.id)
      respuesta()
    } catch (error) {
      alert(error.response?.data?.message || 'Error al eliminar producto')
    }
  }

  // Editar
  const editar = (item) => {
    console.log('Producto seleccionado:', item)
    setProductoSeleccionado(item)
    setIsOpenEditar(true)
  }

  // Encabezados tabla
  const headers = [
    { key: 'nombre', label: 'Nombre' },
    {
      key: 'estado',
      label: 'Estado',
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.estado
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {item.estado ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
  ]

  // Acciones tabla
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

      <Titulos titulo="Productos" />

      {/* Botón crear */}
      <div className='flex justify-end mb-4'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium'
        >
          Crear Producto
        </button>
      </div>

      {/* Tabla + modales */}
      <Productos
        headers={headers}
        items={data}
        actions={actions}
        isOpen={isOpen}
        onClose={onClose}
        respuesta={respuesta}
        isOpenEditar={isOpenEditar}
        onCloseEditar={onCloseEditar}
        productoSeleccionado={productoSeleccionado}
      />

    </div>
  )
}