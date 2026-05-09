import React from 'react'
import { Modal } from '../../share/modal.component'
import { useForm } from 'react-hook-form'
import { schema } from './validationData'
import { yupResolver } from '@hookform/resolvers/yup'
import { crearRol } from '../../../services/roles/roles.services'

export function CrearRolComponent({ isOpen, onClose, respuesta }) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombre: '',
      estado: 1,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await crearRol(data)
      reset()
      respuesta()
      onClose()
    } catch (error) {
      console.error(error.response?.data)
      alert(error.response?.data?.message || 'Error al crear rol')
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4'>Crear Rol</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input
            type='text'
            placeholder='Nombre del rol'
            className='border border-gray-300 rounded p-2 w-full'
            {...register('nombre')}

          />
          {errors.nombre && <p className='text-red-500 text-xs mt-1'>{errors.nombre.message}</p>}
        </div>
                <div>
          <select className='border border-gray-300 rounded p-2 w-full' {...register('estado')}>
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>


        <div className='flex gap-2'>
          <button type='submit' className='bg-green-500 text-white rounded p-2 flex-1'>Crear</button>
          <button type='button' onClick={handleCancel} className='bg-red-500 text-white rounded p-2 flex-1'>Cancelar</button>
        </div>

      </form>
    </Modal>
  )
}