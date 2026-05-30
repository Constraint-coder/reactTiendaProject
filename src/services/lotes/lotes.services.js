import api from '../../utils/db/api'

// Obtener todos los lotes
export const getLotes = async()=>{

const { data } = await api.get(

'/lotes'

)

return data

}

// Crear nuevo lote
export const crearLote = async(data)=>{

const response = await api.post(

'/lotes',

data

)

return response

}

// Editar lote existente
export const editarLote = async(

id,
data

)=>{

const response = await api.put(

`/lotes/${id}`,

data

)

return response

}

// Desactivar lote
export const eliminarLote = async(id)=>{

const response = await api.delete(

`/lotes/${id}`

)

return response

}
