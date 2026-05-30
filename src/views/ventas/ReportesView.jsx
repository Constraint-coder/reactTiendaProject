import { useState, useEffect } from 'react'
import {  Chart as ChartJS,  CategoryScale,  LinearScale,  BarElement,  Title,  Tooltip,  Legend,} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import {  getVentasPorMes,  getComprasPorMes,  getStockPorProducto} from '../../services/ventas/reportes.services'

ChartJS.register(  CategoryScale,  LinearScale,  BarElement,  Title,  Tooltip,  Legend)

const opciones = (titulo) => ({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    y: { beginAtZero: true }
  }
})

export  function ReportesView() {

  const [anio, setAnio]       = useState(new Date().getFullYear())
  const [ventas, setVentas]   = useState([])
  const [compras, setCompras] = useState([])
  const [stock, setStock]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [anio])

  const cargarDatos = async () => {
    setLoading(true)
    try {
      const [v, c, s] = await Promise.all([
        getVentasPorMes(anio),
        getComprasPorMes(anio),
        getStockPorProducto()
      ])
      setVentas(v)
      setCompras(c)
      setStock(s)
      console.log('Ventas por mes:', v)
      console.log('Compras por mes:', c)
      console.log('Stock por producto:', s)

    } catch (error) {
      console.error('Error al cargar reportes:', error)
    } finally {
      setLoading(false)
    }
  }

  const anios = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  const dataVentas = {
    labels: ventas.map(v => v.mes),
    datasets: [
      {
        label: 'Total Ventas',
        data: ventas.map(v => v.totalventas),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 6,
      },
      {
        label: 'Ingresos ($)',
        data: ventas.map(v => v.ingresos),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 6,
      }
    ]
  }

  const dataCompras = {
    labels: compras.map(c => c.mes),
    datasets: [
      {
        label: 'Total Lotes',
        data: compras.map(c => c.totallotes),
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderRadius: 6,
      },
      {
        label: 'Unidades Compradas',
        data: compras.map(c => c.unidadescompradas),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 6,
      },
      {
        label: 'Total Invertido ($)',
        data: compras.map(c => c.totalinvertido),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderRadius: 6,
      }
    ]
  }

  const dataStock = {
    labels: stock.map(s => s.producto),
    datasets: [
      {
        label: 'Stock Total',
        data: stock.map(s => s.stockTotal),
        backgroundColor: stock.map(s =>
          s.stockBajo
            ? 'rgba(239, 68, 68, 0.7)'
            : 'rgba(16, 185, 129, 0.7)'
        ),
        borderRadius: 6,
      }
    ]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando reportes...</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">


      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Reportes</h1>
        <select
          value={anio}
          onChange={(e) => setAnio(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {anios.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

  
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Ventas por Mes — {anio}
        </h2>
        {ventas.length === 0
          ? <p className="text-gray-400 text-sm">Sin datos de ventas.</p>
          : <Bar data={dataVentas} options={opciones()} />
        }
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Compras por Mes — {anio}
        </h2>
        {compras.length === 0
          ? <p className="text-gray-400 text-sm">Sin datos de compras.</p>
          : <Bar data={dataCompras} options={opciones()} />
        }
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Stock por Producto
          <span className="ml-2 text-xs text-red-500 font-normal">
            stock bajo con menos de 10 unidades
          </span>
        </h2>
        {stock.length === 0
          ? <p className="text-gray-400 text-sm">Sin datos de stock.</p>
          : (
            <>
              <Bar data={dataStock} options={{
                ...opciones(),
                indexAxis: 'y',
              }} />

              {stock.some(s => s.stockBajo) && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-red-600 mb-2">
                    ⚠️ Productos con stock bajo
                  </p>
                  <div className="space-y-1">
                    {stock.filter(s => s.stockBajo).map((s, i) => (
                      <div key={i} className="flex justify-between text-sm bg-red-50 border border-red-100 rounded px-3 py-1">
                        <span className="text-gray-700">{s.producto}</span>
                        <span className="text-red-600 font-semibold">{s.stockTotal} uds</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )
        }
      </div>

    </div>
  )
}