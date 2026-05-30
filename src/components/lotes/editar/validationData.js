import * as yup from 'yup'

// Validaciones para editar lote
export const schema = yup.object({

  // Validar precio compra
  precioCompra: yup

    .number()

    .typeError('Ingrese precio válido')

    .positive('Debe ser mayor a 0')

    .required('Ingrese precio compra'),


  // Validar precio venta
  precioVenta: yup

    .number()

    .typeError('Ingrese precio válido')

    .positive('Debe ser mayor a 0')

    .required('Ingrese precio venta')

})