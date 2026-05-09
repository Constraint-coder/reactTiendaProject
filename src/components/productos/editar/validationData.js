import * as yup from 'yup'

export const schema = yup.object({
  nombre: yup
    .string()
    .required('El nombre del producto es requerido')
    .max(191, 'El nombre no puede superar los 191 caracteres'),
})