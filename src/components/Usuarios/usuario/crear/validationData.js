import * as yup from 'yup'

export const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido').min(3, 'Mínimo 3 caracteres'),
    email: yup.string().required('El email es requerido'),
    password: yup.string().required('La contraseña es requerida').min(8, 'Mínimo 8 caracteres'),
    password_confirmation: yup.string() .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
    roles: yup.string().required('El rol es requerido'),
    estado: yup.string().required('El estado es requerido'),
})