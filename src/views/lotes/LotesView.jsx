import React, { useEffect, useState } from 'react'
import {
  getLotes,
  eliminarLote
} from '../../services/lotes/lotes.services'
import Lotes from '../../components/lotes/Lotes.component'
import { Titulos } from '../../components/share/Titulos.component'

export function LotesView() {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditar, setIsOpenEditar] = useState(false)
  const [loteSeleccionado, setLoteSeleccionado] = useState(null)

  const onClose = () => setIsOpen(false)
  const onCloseEditar = () => setIsOpenEditar(false)

  // Obtener lotes
  const respuesta = async () => {
    try {
      const data = await getLotes()
      console.log('Lotes obtenidos:', data)
      setData(data)
    } catch (error) {
      alert(error.message)
    }
  }

  // Eliminar (desactivar)
  const eliminar = async (item) => {
    const confirmar = confirm(`¿Deseas eliminar el lote "${item.numeroLote}"?`)
    if (!confirmar) return

    try {
      await eliminarLote(item.id)
      respuesta()
    } catch (error) {
      alert(error.response?.data?.message || 'Error al eliminar lote')
    }
  }

  // Editar
  const editar = (item) => {
    console.log('Lote seleccionado:', item)
    setLoteSeleccionado(item)
    setIsOpenEditar(true)
  }

  // Encabezados tabla
  const headers = [
    { key: 'numeroLote', label: 'Número de Lote' },
    { key: 'fechaIngreso', label: 'Fecha de Ingreso' },
    {key:'precioCompra', label:'Precio de Compra'},
    {key:'precioVenta', label:'Precio de Venta'},
    {key:'cantidadInicial', label:'Cantidad'},
    {key:'cantidadDisponible', label:'Cantidad Disponible'},
     {key: 'producto', label: 'Producto', render: (item) => item.productos?.nombre || '' },// Relación producto-lote
    
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

      <Titulos titulo="Lotes" />

      {/* Botón crear */}
      <div className='flex justify-end mb-4'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium'
        >
          Crear Lote
        </button>
      </div>

      {/* Tabla + modales */}
      <Lotes
        headers={headers}
        items={data}
        actions={actions}
        isOpen={isOpen}
        onClose={onClose}
        respuesta={respuesta}
        isOpenEditar={isOpenEditar}
        onCloseEditar={onCloseEditar}
        loteSeleccionado={loteSeleccionado}
      />

    </div>
  )
}