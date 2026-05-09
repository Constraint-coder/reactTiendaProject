import React, { useEffect } from 'react'
import { Modal } from '../../share/modal.component'
import { useForm } from 'react-hook-form'
import { schema } from './validationData'
import { yupResolver } from '@hookform/resolvers/yup'
import { editarProducto } from '../../../services/productos/productos.services'

export default function EditarProductoComponent({ isOpen, onClose, respuesta, producto }) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombre: '',
      estado: 1,
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (producto) {
      reset({
        nombre: producto.nombre,
        estado: producto.estado
      })
    }
  }, [producto, reset])

  const onSubmit = async (data) => {
    console.log('Datos a enviar:', producto.id, data)

    try {
      await editarProducto(producto.id, data)
      reset()
      respuesta()
      onClose()
    } catch (error) {
      console.error(error.response?.data)
      alert(error.response?.data?.message || 'Error al editar producto')
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4'>Editar Producto</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

        {/* Nombre del producto */}
        <div>
          <input
            type='text'
            placeholder='Nombre del producto'
            className='border border-gray-300 rounded p-2 w-full'
            {...register('nombre')}
          />
          {errors.nombre && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Estado */}
        <div>
          <select
            className='border border-gray-300 rounded p-2 w-full'
            {...register('estado')}
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
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