import React, { useEffect, useState } from 'react'
import { getVentas } from '../../services/ventas/ventas.services'
import { Titulos } from '../../components/share/Titulos.component'

export function HistorialVentasView() {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)

  useEffect(() => {
    getVentas()
      .then(setVentas)
      .finally(() => setLoading(false))
  }, [])

  const imprimirTicket = (venta) => {
    const ventana = window.open('', '_blank', 'width=400,height=600')
    ventana.document.write(`
      <html>
        <head>
          <title>Ticket de Venta #${venta.id}</title>
          <style>
            body { font-family: monospace; padding: 20px; font-size: 13px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { text-align: left; padding: 4px; border-bottom: 1px dashed #ccc; }
            .total { font-weight: bold; font-size: 15px; margin-top: 10px; text-align: right; }
            .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #555; }
          </style>
        </head>
        <body>
          <h2>🧾 Ticket de Venta</h2>
          <p><b>Venta #:</b> ${venta.id}</p>
          <p><b>Fecha:</b> ${new Date(venta.fecha || venta.created_at).toLocaleString()}</p>
          <p><b>Usuario:</b> ${venta.user?.nombre || 'Sin usuario'}</p>
          <p><b>Estado:</b> ${venta.estado}</p>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${(venta.detalles || []).map(d => `
                <tr>
                  <td>${d.nombreProducto || '-'}</td>
                  <td>${d.cantidad}</td>
                  <td>$${parseFloat(d.precioUnitario || 0).toFixed(2)}</td>
                  <td>$${parseFloat(d.subtotal || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total: $${parseFloat(venta.total).toFixed(2)}</div>
          <div class="footer">¡Gracias por su compra!</div>
        </body>
      </html>
    `)
    ventana.document.close()
    ventana.print()
  }

  if (loading) return <p className="p-4 text-gray-500">Cargando ventas...</p>

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Titulos titulo="Historial de Ventas" />

      <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ventas.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No hay ventas registradas
                </td>
              </tr>
            )}
            {ventas.map((venta) => (
              <React.Fragment key={venta.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{venta.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(venta.fecha || venta.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {venta.user?.nombre || 'Sin usuario'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      venta.estado === 'PAGADA'  ? 'bg-green-100 text-green-700' :
                      venta.estado === 'ANULADA' ? 'bg-red-100 text-red-700' :
                                                   'bg-yellow-100 text-yellow-700'
                    }`}>
                      {venta.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    ${parseFloat(venta.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm flex gap-2">
                    <button
                      onClick={() => setVentaSeleccionada(ventaSeleccionada?.id === venta.id ? null : venta)}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      {ventaSeleccionada?.id === venta.id ? 'Ocultar' : 'Ver detalle'}
                    </button>
                    <button
                      onClick={() => imprimirTicket(venta)}
                      className="text-green-600 hover:underline text-xs"
                    >
                      🖨️ Imprimir
                    </button>
                  </td>
                </tr>

                {ventaSeleccionada?.id === venta.id && (
                  <tr>
                    <td colSpan={6} className="bg-gray-50 px-6 py-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        Productos de la venta:
                      </p>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-xs text-gray-400">
                            <th className="pb-1">Producto</th>
                            <th className="pb-1">Cantidad</th>
                            <th className="pb-1">Precio</th>
                            <th className="pb-1">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(venta.detalles || []).map((d, i) => (
                            <tr key={i} className="border-t border-gray-200">
                              <td className="py-1">{d.nombreProducto || '-'}</td>
                              <td className="py-1">{d.cantidad}</td>
                              <td className="py-1">${parseFloat(d.precioUnitario || 0).toFixed(2)}</td>
                              <td className="py-1">${parseFloat(d.subtotal || 0).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}