import * as yup from 'yup'

export const schemaEditar = yup.object({
  nombre:     yup.string().required('El nombre es requerido'),
  email:    yup.string().email('Email inválido').required('El email es requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').optional(),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .optional(),
  rolId:  yup.string().optional()
})