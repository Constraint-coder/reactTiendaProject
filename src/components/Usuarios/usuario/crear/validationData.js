import * as yup from 'yup'

export const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    email: yup.string().required('El email es requerido'),
    password: yup.string().required('La contraseña es requerida'),
    password_confirmation: yup.string() .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
    rolId: yup.string().required('El rol es requerido'),
    estado: yup.string().required('El estado es requerido'),
})