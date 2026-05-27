import * as yup from 'yup'
import Roles from '../../../Roles/Rol.component'

export const schemaEditar = yup.object({
  nombre:     yup.string().required('El nombre es requerido').min(3, 'Mínimo 3 caracteres'),
  email:    yup.string().email('Email inválido').required('El email es requerido'),
  password: yup.string().min(8, 'Mínimo 8 caracteres').optional(),
  password_confirmation: yup.string().min(8, 'Mínimo 8 caracteres')
    .oneOf([yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .optional(),
  roles:  yup.string().optional()
})