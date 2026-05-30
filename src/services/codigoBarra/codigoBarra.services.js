import api from '../../utils/db/api'

export const getCodigosBarra = async () => {
  const { data } = await api.get('/codigosbarra')
  return data
}

export const crearCodigoBarra = async (data) => {
  const response = await api.post('/codigosbarra', data)
  return response
}

export const eliminarCodigoBarra = async (id) => {
  const response = await api.delete(`/codigosbarra/${id}`)
  return response
}