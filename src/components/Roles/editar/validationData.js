import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .required('El nombre del rol es requerido')
    .min(3, 'Mínimo 3 caracteres')
    .max(20, 'Máximo 20 caracteres'),
})