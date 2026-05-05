import React from 'react'
import { Modal } from '../../../share/modal.component'
import { useForm } from 'react-hook-form'
import { schema } from './validationData'
import { yupResolver } from '@hookform/resolvers/yup'
import { crearUsuario } from '../../../../services/usuario/usuario/usuarios.services'

export function CrearUsuario({ isOpen, onClose, respuesta }) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombre:     '',
      email:    '',
      password: '',
      password_confirmation: '',
      estado:   1,
      rolId:    ''
    },
    resolver: yupResolver(schema),
  })

const onSubmit = async (data) => {
  try {
    await crearUsuario(data)
    reset()
    respuesta()
    onClose()
} catch (error) {
  console.error(error.response?.data) // ← ver errores de validación
  alert(error.response?.data?.message || 'Error al crear usuario')
}
}

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4'>Crear Usuario</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input type='text' placeholder='Nombre' className='border border-gray-300 rounded p-2 w-full' {...register('nombre')} />
          {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
        </div>

        <div>
          <input type='email' placeholder='ejemplo@correo.com' className='border border-gray-300 rounded p-2 w-full' {...register('email')} />
          {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
        </div>

        <div>
          <input type='password' placeholder='Contraseña' className='border border-gray-300 rounded p-2 w-full' {...register('password')} />
          {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
        </div>

        <div>
          <input type='password' placeholder='Confirmar Contraseña' className='border border-gray-300 rounded p-2 w-full' {...register('password_confirmation')} />
          {errors.password_confirmation && <p className='text-red-500 text-xs mt-1'>{errors.password_confirmation.message}</p>}
        </div>

        <div>
          <select className='border border-gray-300 rounded p-2 w-full' {...register('estado')}>
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>

        <div>
          <select className='border border-gray-300 rounded p-2 w-full' {...register('rolId')}>
            <option value=''>Selecciona un rol</option>
            <option value='1'>Admin</option>
            <option value='2'>Supervisor</option>
            <option value='3'>Cajero</option>
            <option value='4'>Invitado</option>
          </select>
          {errors.rolId && <p className='text-red-500 text-xs mt-1'>{errors.rolId.message}</p>}
        </div>

        <div className='flex gap-2'>
          <button type='submit' className='bg-green-500 text-white rounded p-2 flex-1'>Crear</button>
          
          <button type='button' onClick={handleCancel} className='bg-red-500 text-white rounded p-2 flex-1'>Cancelar</button>
        </div>

      </form>
      <div></div>
    </Modal>
  )
}