import React from 'react'

export default function CancelarVenta({disabled, onCancelar,}) {
  return (
    <div className='flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-6 py-4'>

      <button
        onClick={onCancelar}
        disabled={disabled}
        className='bg-red-500 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors'
      >
        Cancelar
      </button>
    </div>
  )
}
