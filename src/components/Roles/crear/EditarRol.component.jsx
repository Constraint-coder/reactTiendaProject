import React, { useEffect } from 'react'
import { Modal } from '../../share/modal.component'
import { useForm } from 'react-hook-form'
import { schema } from './validationData'
import { yupResolver } from '@hookform/resolvers/yup'
import { editarRol } from '../../../services/roles/roles.services'

export default function EditarRolComponent({ isOpen, onClose, respuesta, rol }) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (rol) {
      reset({ name: rol.name }) // 👈 Spatie usa "name"
    }
  }, [rol])

  const onSubmit = async (data) => {
    try {
      await editarRol(rol.id, {
        name: data.name
      })

      reset()
      respuesta()
      onClose()

    } catch (error) {
      console.error(error.response?.data)
      alert(error.response?.data?.message || 'Error al editar rol')
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4'>Editar Rol</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input
            type='text'
            placeholder='Nombre del rol'
            className='border border-gray-300 rounded p-2 w-full'
            {...register('name')}
          />
          {errors.name && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className='flex gap-2'>
          <button type='submit' className='bg-blue-500 text-white rounded p-2 flex-1'>
            Guardar
          </button>

          <button type='button' onClick={handleCancel} className='bg-red-500 text-white rounded p-2 flex-1'>
            Cancelar
          </button>
        </div>

      </form>
    </Modal>
  )
}