import api from '../../utils/db/api'

// Obtener productos
export const getProductos = async () => {
  const { data } = await api.get('/productos')
  return data
}

// Crear producto
export const crearProducto = async (data) => {
  const response = await api.post('/productos', data)
  return response
}

// Editar producto
export const editarProducto = async (id, data) => {
  const response = await api.put(`/productos/${id}`, data)
  return response
}

// Eliminar (desactivar) producto
export const eliminarProducto = async (id) => {
  const response = await api.delete(`/productos/${id}`)
  return response
}