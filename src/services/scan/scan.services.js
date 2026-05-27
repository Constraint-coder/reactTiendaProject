import api from '../../utils/db/api'

export const leerCodigoBarra = async (codigo, cantidad) => {
  const { data } = await api.post(`/scan/${codigo}`, { cantidad })
  return data
}

export const cobrarVenta = async (productos) => {
  const { data } = await api.post(`/ventas/cobrar`, { productos })
  return data
}