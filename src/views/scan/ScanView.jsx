import React, { useState } from 'react'
import { leerCodigoBarra, cobrarVenta } from '../../services/scan/scan.services'
import ScannerInput from '../../components/scan/ScannerInput'
import TablaProductos from '../../components/scan/TablaProductos'
import ResumenVenta from '../../components/scan/ResumenVenta'
import CancelarVenta from '../../components/scan/CancelarVenta'
import { Titulos } from '../../components/share/Titulos.component'

export function ScanView() {
  const [codigo,    setCodigo]    = useState('')
  const [mensaje,   setMensaje]   = useState('')
  const [productos, setProductos] = useState([])
  const [total,     setTotal]     = useState(0)
  const [cantidad,  setCantidad]  = useState('')

  const handleScan = async (e) => {
    e.preventDefault()
    if (!codigo) return

    try {
      const data = await leerCodigoBarra(codigo, cantidad)

      // buscael producto si ya está en la lista
      const index = productos.findIndex(p => p.productoId === data.productoId)

      if (index >= 0) {
        const lista = [...productos]
        lista[index].cantidad += data.cantidad
        lista[index].subtotal  = lista[index].cantidad * lista[index].precioUnitario
        setProductos(lista)
      } else {
      
        setProductos([...productos, data])
      }

      //  total
      setTotal(prev => prev + data.subtotal)

      setCodigo('')
      setCantidad('')
      setMensaje('Producto agregado')
    } catch (error) {
      setMensaje('Producto no encontrado')
      console.error(error)
      setCantidad('') 
      setCodigo('')
    }
  }

  const cambiarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return
    const lista = [...productos]
    const diferencia   = nuevaCantidad - lista[index].cantidad
    lista[index].cantidad = nuevaCantidad
    lista[index].subtotal = nuevaCantidad * lista[index].precioUnitario
    setProductos(lista)
    setTotal(prev => prev + diferencia * lista[index].precioUnitario) // nuevo total
  }

  const eliminarProducto = (index) => {
    const lista = [...productos]
    setTotal(prev => prev - lista[index].subtotal) //nuevodel total
    lista.splice(index, 1)
    setProductos(lista)
  }
const finalizarVenta = async () => {
  if (productos.length === 0) return;

  try {

    const response = await cobrarVenta(productos);

    const venta = response.venta;

    imprimirTicketProfesional(venta);

    setProductos([]);
    setTotal(0);
    setMensaje('Venta registrada correctamente');

  } catch (error) {
    console.error(error);
    setMensaje('Error al registrar la venta');
  }
};

const imprimirTicketProfesional = (venta) => {

  const total = venta.detalles.reduce(
    (acc, item) => acc + parseFloat(item.subtotal),
    0
  );

  const fecha = new Date(venta.created_at).toLocaleString();

  const ventana = window.open('', 'PRINT', 'height=700,width=500');

  ventana.document.write(`
    <html>
      <head>
        <title>Ticket #${venta.id || ''}</title>

        <style>

          *{
            box-sizing:border-box;
          }

          body{
            font-family: Arial, sans-serif;
            padding:20px;
            color:#222;
          }

          .ticket{
            max-width:350px;
            margin:auto;
            border:1px solid #ddd;
            padding:20px;
            border-radius:10px;
          }

          .header{
            text-align:center;
            margin-bottom:20px;
          }

          .header h1{
            margin:0;
            font-size:22px;
          }

          .header p{
            margin:3px 0;
            font-size:12px;
            color:#666;
          }

          .info{
            margin-bottom:15px;
            font-size:13px;
          }

          .divider{
            border-top:1px dashed #999;
            margin:10px 0;
          }

          table{
            width:100%;
            border-collapse:collapse;
            font-size:13px;
          }

          thead{
            background:#f5f5f5;
          }

          th{
            padding:8px 4px;
            text-align:left;
            border-bottom:1px solid #ddd;
          }

          td{
            padding:8px 4px;
            border-bottom:1px solid #eee;
          }

          .right{
            text-align:right;
          }

          .total{
            margin-top:15px;
            text-align:right;
          }

          .total h2{
            margin:0;
            font-size:22px;
          }

          .footer{
            margin-top:25px;
            text-align:center;
            font-size:12px;
            color:#777;
          }

          @media print {

            body{
              padding:0;
            }

            .ticket{
              border:none;
              width:100%;
              max-width:100%;
              border-radius:0;
            }

          }

        </style>
      </head>

      <body>

        <div class="ticket">

          <div class="header">
            <h1>Mi Negocio</h1>
            <p>San Salvador, El Salvador</p>
            <p>Tel: 0000-0000</p>
          </div>

          <div class="info">
            <strong>Fecha:</strong> ${fecha}<br/>
            <strong>Ticket:</strong> #${venta.id || '0001'}
          </div>

          <div class="divider"></div>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th class="right">Cant.</th>
                <th class="right">Precio</th>
                <th class="right">Sub.</th>
              </tr>
            </thead>

            <tbody>

              ${venta.detalles.map(item => `
                <tr>
                  <td>${item.nombreProducto}</td>
                  <td class="right">${item.cantidad}</td>
                  <td class="right">$${item.precioUnitario}</td>
                  <td class="right">$${item.subtotal}</td>
                </tr>
              `).join('')}

            </tbody>
          </table>

          <div class="total">
            <p>Total pagado</p>
            <h2>$${total.toFixed(2)}</h2>
          </div>

          <div class="divider"></div>

          <div class="footer">
            <p>Gracias por su compra</p>
            <p>Vuelva pronto</p>
          </div>

        </div>

        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          }
        </script>

      </body>
    </html>
  `);

  ventana.document.close();
};

const cancelVenta=()=>{
  setProductos([]);
  setTotal(0);
  setMensaje('Venta cancelada');

}
  return (
    <div className='w-full px-4 sm:px-6 lg:px-8'>
      <Titulos titulo="scan" />

      <ScannerInput
        codigo={codigo}
        setCodigo={setCodigo}
        cantidad={cantidad}
        setCantidad={setCantidad}
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
        disabled={productos.length === 0}
      />
      <CancelarVenta disabled={productos.length ===0}
      onCancelar={cancelVenta} />
    </div>

  )
}