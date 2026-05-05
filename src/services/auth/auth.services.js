import api, { iniciarSesion } from  "../../utils/db/api"

export const login = async ({ email, password }) => {
  const { data } = await api.post('/login', { email, password })
    console.log('Enviando:', { email, password }) // ← agrega esto

  iniciarSesion(data.access_token)
  localStorage.setItem('user', JSON.stringify(data.user))

  return data.user
}

export const logout = async () => {
  try {
    await api.post('/logout')
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}