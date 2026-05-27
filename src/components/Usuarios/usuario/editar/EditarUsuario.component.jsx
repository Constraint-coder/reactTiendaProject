import React, { useEffect, useState } from 'react'
import { Modal } from '../../../share/modal.component'
import { useForm } from 'react-hook-form'
import { schemaEditar } from './validationData'
import { yupResolver } from '@hookform/resolvers/yup'
import { editarUsuario } from '../../../../services/usuario/usuario/usuarios.services'
import { getRoles } from '../../../../services/roles/roles.services'

export function EditarUsuario({ isOpen, onClose, respuesta, usuario }) {

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
      nombre: '',
      email: '',
      password: '',
      password_confirmation: '',
      estado: 1,
      roles: ''
    },
    resolver: yupResolver(schemaEditar),
  })

  useEffect(() => {
    if (usuario) {
      reset({
        nombre: usuario.nombre,
        email: usuario.email,
        password: '',
        password_confirmation: '',
        estado: usuario.estado ? 1 : 0,
        roles: usuario.roles.length > 0 ? usuario.roles[0].name : ''
      })
    }
  }, [usuario])

  const onSubmit = async (data) => {
    try {
      await editarUsuario(usuario.id, data)
      reset()
      respuesta()
      onClose()
      alert('Usuario editado exitosamente');
      
    } catch (error) {
      const errors = error.response?.data?.errors
      if (errors) {
        const mensajes = Object.values(errors).flat().join('\n')
        alert(mensajes)
      } else {
        alert(error.response?.data?.message || 'Error al editar usuario')
      }
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className='text-2xl font-bold mb-4'>Editar Usuario</h2>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input type='text' placeholder='Nombre'
            className='border border-gray-300 rounded p-2 w-full'
            autoComplete='off'
            {...register('nombre')} />
          {errors.nombre && <p className='text-red-500 text-xs mt-1'>{errors.nombre.message}</p>}
        </div>

        <div>
          <input type='email' placeholder='ejemplo@correo.com'
            className='border border-gray-300 rounded p-2 w-full'
            autoComplete='off'
            {...register('email')} />
          {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
        </div>

        <div>
          <input type='password' placeholder='Nueva contraseña (opcional)'
            className='border border-gray-300 rounded p-2 w-full'
            autoComplete='new-password'
            {...register('password')} />
          {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
        </div>

        <div>
          <input type='password' placeholder='Confirmar contraseña'
            className='border border-gray-300 rounded p-2 w-full'
            autoComplete='new-password'
            {...register('password_confirmation')} />
          {errors.password_confirmation && <p className='text-red-500 text-xs mt-1'>{errors.password_confirmation.message}</p>}
        </div>

        {usuario?.estado === false && (
          <div>
            <select className='border border-gray-300 rounded p-2 w-full' {...register('estado')}>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
        )}

        <div>
          <select className='border border-gray-300 rounded p-2 w-full' {...register('roles')}>
            <option value=''>Selecciona un rol</option>
            {roles.map(rol => (
              <option key={rol.id} value={rol.name}>
                {rol.name}
              </option>
            ))}
          </select>
          {errors.roles && <p className='text-red-500 text-xs mt-1'>{errors.roles.message}</p>}
        </div>

        <div className='flex gap-2'>
          <button type='submit' className='bg-blue-500 text-white rounded p-2 flex-1'>Guardar</button>
          <button type='button' onClick={handleCancel} className='bg-red-500 text-white rounded p-2 flex-1'>Cancelar</button>
        </div>

      </form>
    </Modal>
  )
}