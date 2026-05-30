import React, { useEffect, useState } from 'react'
import { getCodigosBarra, eliminarCodigoBarra } from '../../services/codigoBarra/codigobarra.services'
import CodigosBarra from '../../components/codigobarra/CodigoBarra.component'
import { Titulos } from '../../components/share/Titulos.component'

export function CodigosBarraView() {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

  const cargarDatos = async () => {
    try {
      const result = await getCodigosBarra()
      setData(result)
    } catch (error) {
      console.error('Error al cargar:', error)
      alert('Error al cargar códigos de barra')
    }
  }

  const eliminar = async (item) => {
    const confirmar = confirm(`¿Deseas eliminar el código "${item.codigoBarra}"?`)
    if (!confirmar) return
    try {
      await eliminarCodigoBarra(item.id)
      await cargarDatos()
    } catch (error) {
      console.error('Error al eliminar:', error)
      alert(error.response?.data?.message || 'Error al eliminar')
    }
  }

  const headers = [
    { key: 'codigoBarra', label: 'Código de Barra' },
    { key: 'producto', label: 'Producto', render: (item) => item.producto?.nombre ?? '—' },
    {
      key: 'estado', label: 'Estado',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.estado ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
  ]

  const actions = [
    { label: 'Eliminar', className: 'bg-red-500 hover:bg-red-600', onClick: (item) => eliminar(item) },
    
  ]

  useEffect(() => {
    cargarDatos()
  }, [])

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8'>
      <Titulos titulo="Códigos de Barra" />
      <div className='flex justify-end mb-4'>
        <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium'>
          Crear Código de Barra
        </button>
      </div>
      <CodigosBarra
        headers={headers}
        items={data}
        actions={actions}
        isOpen={isOpen}
        onClose={onClose}
        respuesta={cargarDatos}
      />
    </div>
  )
}