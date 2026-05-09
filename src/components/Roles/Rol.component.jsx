import React from 'react'
import { TableComponent } from '../share/TableComponent'
import { CrearRolComponent } from './crear/CrearRol.component'
import EditarRolComponent from './editar/EditarRol.component'

export default function Roles({ headers, items, actions, isOpen, onClose, respuesta, isOpenEditar, onCloseEditar, rolSeleccionado }) {
  return (
    <div className='w-full'>
      <div className='overflow-x-auto shadow-md sm:rounded-lg mb-6'>
        <TableComponent headers={headers} items={items} actions={actions} />
      </div>
      <CrearRolComponent isOpen={isOpen} onClose={onClose} respuesta={respuesta} />
      <EditarRolComponent isOpen={isOpenEditar} onClose={onCloseEditar} respuesta={respuesta} rol={rolSeleccionado} />
    </div>
  )
}