import api from '../../utils/db/api'


export const getVentasPorMes = async (anio = new Date().getFullYear()) => {
  const { data } = await api.get('/reportes/ventasmes', {
    params: { anio }
  })
  return data
}


export const getComprasPorMes = async (anio = new Date().getFullYear()) => {
  const { data } = await api.get('/reportes/comprasmes', {
    params: { anio }
  })
  return data
}


export const getStockPorProducto = async () => {
  const { data } = await api.get('/reportes/stock')
  return data
}