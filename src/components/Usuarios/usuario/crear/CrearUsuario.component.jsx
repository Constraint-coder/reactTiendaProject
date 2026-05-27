import React from 'react'
import { useEffect, useState } from 'react'
import { getRoles } from '../../../../services/roles/roles.services'
import { Modal } from '../../../share/modal.component'
import { useForm } from 'react-hook-form'
import { schema } from './validationData'
import { yupResolver } from '@hookform/resolvers/yup'
import { crearUsuario } from '../../../../services/usuario/usuario/usuarios.services'

export function CrearUsuario({ isOpen, onClose, respuesta }) {

   const [roles, setRoles] = useState([])

  useEffect(() => {
    const cargarRoles = async () => {
      try {
        const data = await getRoles()
        setRoles(data)
      } catch (error) {
        console.error('Error al cargar roles:', error)
      }
    }
    cargarRoles()
  }, [])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      nombre:     '',
      email:    '',
      password: '',
      password_confirmation: '',
      estado:   1,
      roles:    ''
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
  const errors = error.response?.data?.errors

  if (errors) {
    const mensajes = Object.values(errors).flat().join('\n')
    console.log(error.response?.data)
  } else {
    console.log(error.response?.data)
  }
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
          <input type='text' placeholder='Nombre' className='border border-gray-300 rounded p-2 w-full'  autoComplete='off'   {...register('nombre')} />
          {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
        </div>

        <div>
          <input type='email' placeholder='ejemplo@correo.com' className='border border-gray-300 rounded p-2 w-full'  autoComplete='off'   {...register('email')} />
          {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
        </div>

        <div>
          <input type='password' placeholder='Contraseña' className='border border-gray-300 rounded p-2 w-full'  autoComplete='off'   {...register('password')} />
          {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
        </div>

        <div>
          <input type='password' placeholder='Confirmar Contraseña' className='border border-gray-300 rounded p-2 w-full'  autoComplete='off'   {...register('password_confirmation')} />
          {errors.password_confirmation && <p className='text-red-500 text-xs mt-1'>{errors.password_confirmation.message}</p>}
        </div>

        <div>
          <select className='border border-gray-300 rounded p-2 w-full' {...register('estado')}>
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>

        <div>
            <select className='border border-gray-300 rounded p-2 w-full' {...register('roles')}>
                <option value=''>Selecciona un rol</option>
                {roles.map(rol => (
                  <option key={rol.id} value={rol.name}>  {/* ← value = name */}
                    {rol.name}
                  </option>
                ))}
            </select>
            {errors.roles && <p className='text-red-500 text-xs mt-1'>{errors.roles.message}</p>}</div>
            <div className='flex gap-2'>
          <button type='submit' className='bg-green-500 text-white rounded p-2 flex-1'>Crear</button>
          
          <button type='button' onClick={handleCancel} className='bg-red-500 text-white rounded p-2 flex-1'>Cancelar</button>
        </div>

      </form>
      <div></div>
    </Modal>
  )
}