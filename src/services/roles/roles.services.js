import api from '../../utils/db/api'


export const getRoles = async () => {
  const { data } = await api.get('/roles')
  return data
}

export const crearRol = async (payload) => {
  const { data } = await api.post('/roles', payload)
  return data
}

export const editarRol = async (id, payload) => {
  const { data } = await api.put(`/roles/${id}`, payload)
  return data
}

export const eliminarRol = async (id) => {
  const { data } = await api.delete(`/roles/${id}`)
  return data
}