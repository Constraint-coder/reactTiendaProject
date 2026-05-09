import api from '../../utils/db/api'

export const getRoles = async () => {
  const { data } = await api.get('/roles')
  return data
}

export const crearRol = async (data) => {
  const response = await api.post('/roles', data)
  return response
}

export const editarRol = async (id, data) => {
  const response = await api.put(`/roles/${id}`, data)
  return response
}

export const eliminarRol = async (id) => {
  const response = await api.delete(`/roles/${id}`)
  return response
}