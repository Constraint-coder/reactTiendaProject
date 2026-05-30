import React, { useEffect, useState } from 'react'
import { Modal } from '../../share/modal.component'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { crearCodigoBarra } from '../../../services/codigoBarra/codigobarra.services'
import { getProductos } from '../../../services/productos/productos.services'

const schema = yup.object({
  codigoBarra: yup.string().required('El código de barra es obligatorio').max(191),
  productoId: yup.number().required('Selecciona un producto').typeError('Selecciona un producto'),
})

export function CrearCodigoBarraComponent({ isOpen, onClose, respuesta }) {

  const [productos, setProductos] = useState([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { codigoBarra: '', productoId: '' },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (isOpen) {
      getProductos().then(setProductos).catch(console.error)
    }
  }, [isOpen])

  const onSubmit = async (data) => {
    try {
      await crearCodigoBarra({ ...data, productoId: Number(data.productoId) })
      reset()
      await respuesta()
      onClose()
    } catch (error) {
      alert(error.response?.data?.message || 'Error al crear código de barra')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4'>Crear Código de Barra</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input
            type='text'
            placeholder='Código de barra'
            className='border border-gray-300 rounded p-2 w-full'
            {...register('codigoBarra')}
          />
          {errors.codigoBarra && <p className='text-red-500 text-xs mt-1'>{errors.codigoBarra.message}</p>}
        </div>

        <div>
          <select
            className='border border-gray-300 rounded p-2 w-full'
            {...register('productoId')}
          >
            <option value=''>Seleccionar producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
          {errors.productoId && <p className='text-red-500 text-xs mt-1'>{errors.productoId.message}</p>}
        </div>

        <div className='flex gap-2'>
          <button type='submit' className='bg-green-500 text-white rounded p-2 flex-1'>Crear</button>
          <button type='button' onClick={() => { reset(); onClose() }} className='bg-red-500 text-white rounded p-2 flex-1'>Cancelar</button>
        </div>

      </form>
    </Modal>
  )
}