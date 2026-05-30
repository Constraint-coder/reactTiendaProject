import React, { useEffect } from 'react'

// Modal reutilizable
import { Modal } from '../../share/modal.component'

// Manejo de formularios
import { useForm } from 'react-hook-form'

// Validaciones
import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './validationData'

// Servicio para editar lote
import {

  editarLote

} from '../../../services/lotes/lotes.services'


export default function EditarLoteComponent({

  isOpen,

  onClose,

  respuesta,

  lote

}) {


  // Configuración del formulario
  const {

    register,

    handleSubmit,

    reset,

    formState: { errors }

  } = useForm({

    defaultValues: {

      precioCompra: '',
      precioVenta: ''

    },

    resolver: yupResolver(schema)

  })


  // Cargar datos del lote seleccionado
  useEffect(() => {

    if (lote) {

      reset({

        precioCompra: lote.precioCompra,

        precioVenta: lote.precioVenta

      })

    }

  }, [lote, reset])


  // Guardar cambios
  const onSubmit = async (data) => {

    try {

      // Enviar cambios al backend
      await editarLote(

        lote.id,
        data

      )

      // Actualizar tabla
      respuesta()

      // Cerrar modal
      onClose()

    } catch (error) {

      console.log(error)

      alert(

        error.response?.data?.message ||

        'Error al editar lote'

      )

    }

  }


  // Cancelar edición
  const handleCancel = () => {

    reset()

    onClose()

  }


  return (

    <Modal

      isOpen={isOpen}

      onClose={onClose}

    >


      {/* Título */}

      <h2 className='text-2xl font-bold mb-4'>

        Editar Lote

      </h2>


      <form

        className='flex flex-col gap-4'

        onSubmit={handleSubmit(onSubmit)}

      >


        {/* Precio compra */}

        <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>  

          Precio de Compra  
        </label>
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
          <label className='block text-sm font-medium text-gray-700 mb-1'>

            Precio de Venta 
          </label>
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



        {/* Botones */}

        <div className='flex gap-2'>


          <button

            type='submit'

            className='bg-yellow-500 text-white rounded p-2 flex-1'

          >

            Guardar

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