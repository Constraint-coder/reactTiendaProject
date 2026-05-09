import api from "../../../utils/db/api"

const usuarios = async () => {
    const response = await api.get('/users')
    return response.data
}

const crearUsuario = async (data) => {
    const response = await api.post('/users', {
        ...data,
        estado: parseInt(data.estado),
        rolId:  parseInt(data.rolId)
    })
    return response
}

const editarUsuario = async (id, data) => {
    const response = await api.put(`/users/${id}`, {
        ...data,
        estado: parseInt(data.estado),
        rolId:  parseInt(data.rolId)
    })
    return response
}

const eliminarUsuario = async (id) => {
  const response = await api.delete(`/users/${id}`)
  return response
}

export {
    usuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}