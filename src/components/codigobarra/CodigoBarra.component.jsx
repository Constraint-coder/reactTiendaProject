import React from 'react'
import { TableComponent } from '../share/TableComponent'
import { CrearCodigoBarraComponent } from './crear/CrearCodigoBarra.component'

export default function CodigosBarra({ headers, items, actions, isOpen, onClose, respuesta }) {
  return (
    <div className='w-full'>
      <div className='overflow-x-auto shadow-md sm:rounded-lg mb-6'>
        <TableComponent headers={headers} items={items} actions={actions} />
      </div>
      <CrearCodigoBarraComponent isOpen={isOpen} onClose={onClose} respuesta={respuesta} />
    </div>
  )
}