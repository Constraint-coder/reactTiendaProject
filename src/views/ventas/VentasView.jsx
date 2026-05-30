import React, { useState } from 'react'
import { leerCodigoBarra, cobrarVenta } from '../../services/ventas/ventas.services'
import ScannerInput from '../../components/ventas/ScannerInput'
import TablaProductos from '../../components/ventas/TablaProductos'
import ResumenVenta from '../../components/ventas/ResumenVenta'
import { Titulos } from '../../components/share/Titulos.component'

export function VentasView() {
  const [codigo,    setCodigo]    = useState('')
  const [mensaje,   setMensaje]   = useState('')
  const [productos, setProductos] = useState([])
  const [ventaId,   setVentaId]   = useState(null)
  const [total,     setTotal]     = useState(0)

  const handleScan = async (e) => {
    e.preventDefault()
    if (!codigo) return
    try {
      const data = await leerCodigoBarra(codigo)
          console.log('respuesta backend:', data);
      setVentaId(data.venta.id)
      setTotal(data.venta.total)
      setProductos(data.venta.detalles)
      setCodigo('')
      setMensaje('Producto agregado')
    } catch (error) {
      setMensaje('Producto no encontrado')
    }
  }

  const cambiarCantidad = (index, nuevaCantidad) => {
    const lista = [...productos]
    lista[index].cantidad = Number(nuevaCantidad)
    setProductos(lista)
  }

  const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index))
  }

  const finalizarVenta = async () => {
    if (!ventaId) return
    try {
      await cobrarVenta(ventaId)
      setProductos([])
      setVentaId(null)
      setTotal(0)
      setMensaje('Venta registrada correctamente')
    } catch (error) {
      alert('Error al registrar la venta')
    }
  }

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8'>
      <Titulos titulo="Ventas" />

      <ScannerInput
        codigo={codigo}
        setCodigo={setCodigo}
        onScan={handleScan}
        mensaje={mensaje}
      />

      <TablaProductos
        productos={productos}
        cambiarCantidad={cambiarCantidad}
        eliminarProducto={eliminarProducto}
      />

        <ResumenVenta
        total={total}
        onFinalizar={finalizarVenta}
        disabled={!productos || productos.length === 0}
        />
    </div>
  )
}