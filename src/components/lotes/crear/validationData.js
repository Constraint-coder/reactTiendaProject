import * as yup from 'yup'

// Validaciones del formulario crear lote
export const schema = yup.object({

  // Número identificador del lote
  numeroLote: yup

    .string()

    .required('Ingrese número de lote'),

  // Precio de compra
  precioCompra: yup

    .number()

    .typeError('Ingrese un número válido')

    .positive('Debe ser mayor a 0')

    .required('Ingrese precio compra'),

  // Precio de venta
  precioVenta: yup

    .number()

    .typeError('Ingrese un número válido')

    .positive('Debe ser mayor a 0')

    .required('Ingrese precio venta'),

  // Cantidad inicial del lote
  cantidadInicial: yup

    .number()

    .typeError('Ingrese cantidad válida')

    .integer('Debe ser entero')

    .positive('Debe ser mayor a 0')

    .required('Ingrese cantidad'),

  // Producto asociado
  productoId: yup

    .number()

    .typeError('Ingrese ID producto válido')

    .required('Ingrese producto')

})