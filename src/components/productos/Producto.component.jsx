import React from 'react'
import { TableComponent } from '../share/TableComponent'
import { CrearProductoComponent } from  './crear/CrearProducto.component'
import EditarProductoComponent from   './editar/EditarProducto.component'
import { crearProducto } from '../../services/productos/productos.services'
export default function Productos({
  headers,
  items,
  actions,
  isOpen,
  onClose,
  respuesta,
  isOpenEditar,
  onCloseEditar,
  productoSeleccionado
}) {
  return (
    <div className='w-full'>

      {/* Tabla de productos */}
      <div className='overflow-x-auto shadow-md sm:rounded-lg mb-6'>
        <TableComponent
          headers={headers}
          items={items}
          actions={actions}
        />
      </div>

      {/* Modal crear producto */}
      <CrearProductoComponent
        isOpen={isOpen}
        onClose={onClose}
        respuesta={respuesta}
      />

      {/* Modal editar producto */}
      <EditarProductoComponent
        isOpen={isOpenEditar}
        onClose={onCloseEditar}
        respuesta={respuesta}
        producto={productoSeleccionado}
      />

    </div>
  )
}