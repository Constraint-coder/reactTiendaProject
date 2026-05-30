import api from '../../utils/db/api'

export const leerCodigoBarra = async (codigo) => {
  const { data } = await api.post(`/scan/${codigo}`)
  return data
}

export const cobrarVenta = async (ventaId) => {
  const { data } = await api.patch(`/scan/${ventaId}/cobrar`)
  return data
}

export const cancelarVenta = async (ventaId) => {
  const { data } = await api.patch(`/scan/${ventaId}/cancelar`)
  return data
}

export const eliminarProductoVenta = async (ventaId, productoId) => {
  const { data } = await api.delete(`/scan/${ventaId}/producto/${productoId}`)
  return data
}
export const getVentas = async () => {
  const { data } = await api.get('/ventas')
  return data
}

export const getVenta = async (id) => {
  const { data } = await api.get(`/ventas/${id}`)
  return data
}