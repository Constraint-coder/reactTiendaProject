import React, {

  useEffect

} from 'react'

// Modal reutilizable
import {

  Modal

} from '../../share/modal.component'

// Formularios
import {

  useForm

} from 'react-hook-form'

// Validaciones
import {

  yupResolver

} from '@hookform/resolvers/yup'

import {

  schema

} from './validationData'

// Servicio editar
import {

  editarCodigoBarra

} from '../../../services/codigobarra/codigobarra.services'



export default function EditarCodigoBarraComponent({

  isOpen,

  onClose,

  respuesta,

  codigo

}) {



  const {

    register,

    handleSubmit,

    reset,

    formState: {

      errors

    }

  } = useForm({

    defaultValues: {

      codigoBarra: '',

      productoId: '',

      estado: 1

    },

    resolver:

      yupResolver(schema)

  })



  // Cargar información
  useEffect(() => {

    if (codigo) {

      reset({

        codigoBarra:

          codigo.codigoBarra,

        productoId:

          codigo.productoId,

        estado:

          codigo.estado

      })

    }

  }, [

    codigo,

    reset

  ])



  // Guardar cambios
  const onSubmit = async (

    data

  ) => {

    try {

      await editarCodigoBarra(

        codigo.id,

        data

      )

      reset()

      respuesta()

      onClose()

    }

    catch (error) {

      console.log(

        error.response?.data

      )

      alert(

        error.response?.data?.message ||

        'Error al editar'

      )

    }

  }



  // Cancelar
  const handleCancel = () => {

    reset()

    onClose()

  }



  return (

    <Modal

      isOpen={isOpen}

      onClose={onClose}

    >

      <h2 className='text-2xl font-bold mb-4'>

        Editar Código Barra

      </h2>



      <form

        className='flex flex-col gap-4'

        onSubmit={

          handleSubmit(

            onSubmit

          )

        }

      >


        {/* Código Barra */}

        <div>

          <input

            type='text'

            placeholder='Código Barra'

            className='border border-gray-300 rounded p-2 w-full'

            {

              ...register(

                'codigoBarra'

              )

            }

          />



          {

            errors.codigoBarra && (

              <p className='text-red-500 text-xs mt-1'>

                {

                  errors.codigoBarra.message

                }

              </p>

            )

          }

        </div>



        {/* Producto ID */}

        <div>

          <input

            type='number'

            placeholder='ID Producto'

            className='border border-gray-300 rounded p-2 w-full'

            {

              ...register(

                'productoId'

              )

            }

          />



          {

            errors.productoId && (

              <p className='text-red-500 text-xs mt-1'>

                {

                  errors.productoId.message

                }

              </p>

            )

          }

        </div>



        {/* Estado */}

        <div>

          <select

            className='border border-gray-300 rounded p-2 w-full'

            {

              ...register(

                'estado'

              )

            }

          >

            <option value={1}>

              Activo

            </option>

            <option value={0}>

              Inactivo

            </option>

          </select>

        </div>



        {/* Botones */}

        <div className='flex gap-2'>


          <button

            type='submit'

            className='bg-blue-500 text-white rounded p-2 flex-1'

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