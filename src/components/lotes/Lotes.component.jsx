import React from 'react'

// Tabla reutilizable del proyecto
import { TableComponent } from '../share/TableComponent'

// Modal crear lote
import { CrearLoteComponent } from './crear/CrearLote.component'

// Modal editar lote
import EditarLoteComponent from './editar/EditarLote.component'

export default function Lotes({

  headers,
  items,
  actions,

  isOpen,
  onClose,

  respuesta,

  isOpenEditar,
  onCloseEditar,

  loteSeleccionado

}) {

  return (

    <div className='w-full'>


      {/* Tabla principal donde se muestran lotes */}

      <div className='overflow-x-auto shadow-md sm:rounded-lg mb-6'>

        <TableComponent

          headers={headers}

          items={items}

          actions={actions}

        />

      </div>


      {/* Modal crear lote */}

      <CrearLoteComponent

        isOpen={isOpen}

        onClose={onClose}

        respuesta={respuesta}

      />


      {/* Modal editar lote */}

      <EditarLoteComponent

        isOpen={isOpenEditar}

        onClose={onCloseEditar}

        respuesta={respuesta}

        lote={loteSeleccionado}

      />


    </div>

  )

}