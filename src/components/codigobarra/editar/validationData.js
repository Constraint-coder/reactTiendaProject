import * as yup from 'yup'

export const schema = yup.object({
  codigoBarra: yup
    .string()
    .required('El código de barra es obligatorio')
    .max(191, 'Máximo 191 caracteres'),
  productoId: yup
    .number()
    .required('Selecciona un producto')
    .typeError('Debes seleccionar un producto'),
})