import * as yup from 'yup'


export const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    estado: yup.string().required('El estado es requerido'),
})