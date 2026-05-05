import api from "../../../utils/db/api"

const usuarios = async()=>{
    try {
        const response = await api.get('/users')
      return response.data
    } catch (error) {
        console.log(error.message)
    }
}

 const crearUsuario = async (data) => {
    console.log('Datos recibidos en crearUsuario:', data)
    const response = await api.post('/users', {
        ...data,
        estado: parseInt(data.estado),
        rolId:  parseInt(data.rolId)
    })
    return response
}

const eliminarUsuario = async(id)=>{
    try {
        const response = await api.delete('/users/'+id)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}
export {
    usuarios,
    crearUsuario,
    eliminarUsuario
}