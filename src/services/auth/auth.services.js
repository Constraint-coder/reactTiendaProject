import api, { iniciarSesion } from "../../utils/db/api"

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export const login = async ({ email, password }) => {

  console.log('Enviando:', { email, password })

  const { data } = await api.post('/login', {
    email,
    password
  })

  /*
  |--------------------------------------------------------------------------
  | GUARDAR TOKEN
  |--------------------------------------------------------------------------
  */

  iniciarSesion(data.access_token)

  localStorage.setItem(
    'token',
    data.access_token
  )

  /*
  |--------------------------------------------------------------------------
  | GUARDAR USUARIO
  |--------------------------------------------------------------------------
  */

  localStorage.setItem(
    'user',
    JSON.stringify(data.user)
  )
  window.location.href = '/dashboard'
  return data.user
}

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

export const logout = async () => {

  try {

    await api.post('/logout')

  } catch (error) {

    console.log(error)

  } finally {

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    window.location.href = '/login'
  }
}

/*
|--------------------------------------------------------------------------
| OBTENER USUARIO
|--------------------------------------------------------------------------
*/

export const getUser = () => {

  const user = localStorage.getItem('user')

  return user
    ? JSON.parse(user)
    : null
}

/*
|--------------------------------------------------------------------------
| OBTENER TOKEN
|--------------------------------------------------------------------------
*/

export const getToken = () => {

  return localStorage.getItem('token')
}

/*
|--------------------------------------------------------------------------
| VERIFICAR LOGIN
|--------------------------------------------------------------------------
*/

export const isAuthenticated = () => {

  return !!getToken()
}

/*
|--------------------------------------------------------------------------
| VERIFICAR PERMISOS
|--------------------------------------------------------------------------
*/

export const hasPermission = (permission) => {

  const user = getUser()

  if (!user) return false

  return user.permissions?.includes(permission)
}

/*
|--------------------------------------------------------------------------
| VERIFICAR ROLES
|--------------------------------------------------------------------------
*/

export const hasRole = (role) => {

  const user = getUser()

  if (!user) return false

  return user.roles?.includes(role)
}