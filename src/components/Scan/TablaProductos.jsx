import React from 'react'

const calcularSubtotal = (precioUnitario, cantidad) => {
  return precioUnitario * cantidad
}

export default function TablaProductos({ productos, cambiarCantidad, eliminarProducto }) {
  if (!productos || productos.length === 0) {
    return <p className='text-sm text-gray-500 text-center py-8'>No hay productos escaneados</p>
  }

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg mb-6'>
      <table className='w-full text-sm text-left text-gray-700'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-500'>
          <tr>
            <th className='px-4 py-3'>Producto</th>
            <th className='px-4 py-3'>Precio</th>
            <th className='px-4 py-3'>Cantidad</th>
            <th className='px-4 py-3'>Subtotal</th>
            <th className='px-4 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item, index) => (
            <tr key={index} className='border-b hover:bg-gray-50'>
              <td className='px-4 py-3'>{item.nombre}</td>
              <td className='px-4 py-3'>${Number(item.precioUnitario).toFixed(2)}</td>
              <td className='px-4 py-3'>
                <input
                  type='number'
                  min='1'
                  value={item.cantidad}                 
                  onChange={(e) => cambiarCantidad(index, Number(e.target.value))} 
                  className='border border-gray-300 rounded px-2 py-1 w-16 text-center'
                />
              </td>
              <td className='px-4 py-3'>
                ${calcularSubtotal(item.precioUnitario, item.cantidad).toFixed(2)} 
              </td>
              <td className='px-4 py-3'>
                <button
                  onClick={() => eliminarProducto(index)} 
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs'
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}