import React,{useState, useEffect} from 'react'

// Modal reutilizable del proyecto
import { Modal } from '../../share/modal.component'

// Manejo de formularios
import { useForm } from 'react-hook-form'

// Validaciones
import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './validationData'

// Servicio para crear lote
import {

crearLote

} from '../../../services/lotes/lotes.services'

import {getProductos} from '../../../services/productos/productos.services'



export function CrearLoteComponent({

isOpen,

onClose,

respuesta

}){
   const [productos, setProductos] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductos()
        setProductos(data)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      }
    }
    cargarProductos()
  }, [])



const {

register,

handleSubmit,

reset,

formState:{ errors }

} = useForm({

defaultValues:{

numeroLote:'',

precioCompra:'',

precioVenta:'',

cantidadInicial:'',

productoId:''

},

resolver:yupResolver(schema)

})

// Guardar lote
const onSubmit = async(data)=>{

try{

// Enviar información al backend
await crearLote(data)

// Limpiar formulario
reset()

// Actualizar tabla
respuesta()

// Cerrar modal
onClose()

}catch(error){

console.log(error)

alert(

error.response?.data?.message ||

'Error al crear lote'

)

}

}

// Cancelar creación
const handleCancel = ()=>{

reset()

onClose()

}

return(

<Modal

isOpen={isOpen}

onClose={onClose}

>

{/* Título */}

<h2 className='text-2xl font-bold mb-4'>

Crear Lote

</h2>

<form

className='flex flex-col gap-4'

onSubmit={handleSubmit(onSubmit)}

>

{/* Número lote */}

<div>

<input

type='text'

placeholder='Número de lote'

className='border border-gray-300 rounded p-2 w-full'

{...register('numeroLote')}

/>

{

errors.numeroLote && (

<p className='text-red-500 text-xs mt-1'>

{errors.numeroLote.message}

</p>

)

}

</div>

{/* Precio compra */}

<div>

<input

type='number'

step='0.01'

placeholder='Precio compra'

className='border border-gray-300 rounded p-2 w-full'

{...register('precioCompra')}

/>

{

errors.precioCompra && (

<p className='text-red-500 text-xs mt-1'>

{errors.precioCompra.message}

</p>

)

}

</div>

{/* Precio venta */}

<div>

<input

type='number'

step='0.01'

placeholder='Precio venta'

className='border border-gray-300 rounded p-2 w-full'

{...register('precioVenta')}

/>

{

errors.precioVenta && (

<p className='text-red-500 text-xs mt-1'>

{errors.precioVenta.message}

</p>

)

}

</div>

{/* Cantidad inicial */}

<div>

<input

type='number'

placeholder='Cantidad inicial'

className='border border-gray-300 rounded p-2 w-full'

{...register('cantidadInicial')}

/>

{

errors.cantidadInicial && (

<p className='text-red-500 text-xs mt-1'>

{errors.cantidadInicial.message}

</p>

)

}

</div>

{/* Producto asociado */}

<div>
            <select className='border border-gray-300 rounded p-2 w-full' {...register('productoId')}>
                <option value=''>Selecciona un producto</option>
                {productos.map(producto => (
                  <option key={producto.id} value={producto.id}>  {/* ← value = id */}
                    {producto.nombre}
                  </option>
                ))}
            </select>

{

errors.productoId && (

<p className='text-red-500 text-xs mt-1'>

{errors.productoId.message}

</p>

)

}

</div>

{/* Botones */}

<div className='flex gap-2'>

<button

type='submit'

className='bg-green-500 text-white rounded p-2 flex-1'

>

Crear

</button>

<button

type='button'

onClick={handleCancel}

className='bg-red-500 text-white rounded p-2 flex-1'

>

Cancelar

</button>

</div>

</form>

</Modal>

)

}
