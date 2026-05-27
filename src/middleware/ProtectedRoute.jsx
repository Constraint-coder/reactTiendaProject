import { Navigate } from 'react-router'
import { isAuthenticated, hasPermission } from '../../src/services/auth/auth.services'

export default function ProtectedRoute({ children, permission }) {

  // 🔒 no logueado
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // 🚫 sin permiso (si se envía uno)
  if (permission && !hasPermission(permission)) {
    return <Navigate to="/403" replace />
  }

  // ✅ permitido
  return children
}