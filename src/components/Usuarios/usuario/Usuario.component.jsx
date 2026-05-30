import React from 'react'
import { TableComponent } from '../../share/TableComponent'
import { CrearUsuario } from './crear/CrearUsuario.component'
import { EditarUsuario } from './editar/EditarUsuario.component'

export default function Usuarios({ headers, items, actions, isOpen, onClose, respuesta, isOpenEditar, onCloseEditar, usuarioSeleccionado }) {
  return (
    <div className='w-full'>
      <div className='overflow-x-auto shadow-md sm:rounded-lg mb-6'>
        <TableComponent headers={headers} items={items} actions={actions} />
      </div>
      

        <CrearUsuario isOpen={isOpen} onClose={onClose} respuesta={respuesta} />
   
      <EditarUsuario isOpen={isOpenEditar} onClose={onCloseEditar} respuesta={respuesta} usuario={usuarioSeleccionado} />
    </div>
  )
}