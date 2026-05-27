import axios from 'axios'

// ==============================
// CONFIG BASE
// ==============================
const API_URL = import.meta.env.VITE_URL_BACK || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Accept':         'application/json',
    'Content-Type':   'application/json',
    'Authorization':  `Bearer ${localStorage.getItem('token')}`, // ✅ dentro de headers
  },
})

// ==============================
// TIEMPOS
// ==============================
const EXPIRACION_MS    = 8 * 60 * 60 * 1000  // 8 horas
const ADVERTIR_ANTES_MS = 5 * 60 * 1000       // advertir 5 min antes

let timerAdvertencia = null
let timerExpiracion  = null

// ==============================
// TEMPORIZADORES
// ==============================
const limpiarTimers = () => {
  clearTimeout(timerAdvertencia)
  clearTimeout(timerExpiracion)
}

const programarAdvertencia = () => {
  limpiarTimers()

  // Advertencia 5 minutos antes
  timerAdvertencia = setTimeout(() => {
    const continuar = confirm(
      ' Tu sesión expira en 5 minutos.\n¿Deseas continuar trabajando?'
    )

    if (continuar) {
      api.post('/renovar-token')
        .then(({ data }) => {
          setToken(data.access_token)
          programarAdvertencia() // reiniciar ciclo
        })
        .catch(() => logout())
    }
  }, EXPIRACION_MS - ADVERTIR_ANTES_MS)

  // Logout automático si no respondió el confirm
  timerExpiracion = setTimeout(() => {
    logout()
  }, EXPIRACION_MS)
}

// ==============================
// REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ==============================
// RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

      if (status === 401) {
        const url = error.config?.url

        // evita logout en requests de inicialización
        if (!url.includes('login')) {
          logout()
        }

        return Promise.reject(error)
      }

    if (status === 403) {
      const mensaje = error.response?.data?.message
      if (mensaje === 'Usuario inactivo') {
        loginfaild()
       
      }

      return Promise.reject(error)
    }

    if (!error.response) {
      console.error('Error de red:', error.message)
    }

    return Promise.reject(error)
  }
)

// ==============================
// HELPERS
// ==============================
export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const iniciarSesion = (token) => {
  setToken(token)
  programarAdvertencia()
}

export const logout = () => {
  limpiarTimers()
  localStorage.removeItem('token')
  window.location.href = '/login'
}

export const loginfaild = () => {
  limpiarTimers()
  localStorage.removeItem('token')

}


// ==============================
// EXPORT
// ==============================
export default api