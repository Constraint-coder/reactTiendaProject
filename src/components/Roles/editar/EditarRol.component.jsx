import React, { useEffect, useState } from 'react'
import { Modal } from '../../share/modal.component'
import { useForm } from 'react-hook-form'
import { schema } from './validationData'
import { yupResolver } from '@hookform/resolvers/yup'
import { editarRol } from '../../../services/roles/roles.services'

const PERMISOS = [
  "ver usuarios",
  "crear usuarios",
  "editar usuarios",
  "eliminar usuarios",
  "ver roles",
  "crear roles",
  "editar roles",
  "eliminar roles",
  "ver productos",
  "crear productos",
  "editar productos",
  "eliminar productos",
  "ver codigos",
  "crear codigos",
  "editar codigos",
  "eliminar codigos",
  "ver lotes",
  "crear lotes",
  "editar lotes",
  "eliminar lotes",
  "ver ventas",
  "crear ventas",
  "ver detalleventa",
  "editar detalleventa",
  "eliminar detalleventa",
  "usar pos",
  "ver reportes",
]

export default function EditarRolComponent({
  isOpen,
  onClose,
  respuesta,
  rol
}) {

  const [selectedPermissions, setSelectedPermissions] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {

    if (rol) {

      reset({
        name: rol.name
      })

      setSelectedPermissions(
        rol.permissions?.map(p => p.name) || []
      )
    }

  }, [rol, reset])

  const togglePermission = (perm) => {

    setSelectedPermissions((prev) =>

      prev.includes(perm)
        ? prev.filter(p => p !== perm)
        : [...prev, perm]
    )
  }

  const onSubmit = async (data) => {

    try {

      await editarRol(rol.id, {
        name: data.name,
        permissions: selectedPermissions
      })

      reset()
      setSelectedPermissions([])
      respuesta()
      onClose()
      alert('Rol editado exitosamente');

    } catch (error) {

      console.error(error.response?.data)

      const errors = error.response?.data?.errors

      if (errors) {

        const mensajes = Object
          .values(errors)
          .flat()
          .join('\n')

        alert(mensajes)

      } else {

        alert(
          error.response?.data?.message ||
          'Error al editar rol'
        )
      }
    }
  }

  const handleCancel = () => {

    reset()

    setSelectedPermissions([])

    onClose()
  }

  return (

    <Modal isOpen={isOpen} onClose={onClose}>

      <h2 className='text-2xl font-bold mb-4'>
        Editar Rol
      </h2>

      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* NOMBRE */}
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

        {/* PERMISOS */}
        <div className='border p-3 rounded bg-gray-50'>

          <p className='font-semibold mb-2'>
            Permisos
          </p>

          <div className='grid grid-cols-2 gap-2'>

            {PERMISOS.map((perm) => (

              <label
                key={perm}
                className='flex items-center gap-2 text-sm'
              >

                <input
                  type='checkbox'
                  checked={selectedPermissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                />

                {perm}

              </label>
            ))}

          </div>

        </div>

        {/* BOTONES */}
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