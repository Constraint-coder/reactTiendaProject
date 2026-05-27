import { Routes, Route } from 'react-router'
import DashBoardView from '../../views/Layout/DashBoard.view'
import { UsuarioRoutes } from './usuario'
import { RolRoutes } from './rol'
import { ScanView } from '../../views/scan/ScanView'
import { ProductoRoutes } from './productos'
import ProtectedRoute from '../../middleware/ProtectedRoute'

export function DashboardRoute() {
  return (
    <Routes>

      {/* LAYOUT PADRE */}
      <Route path="/dashboard" element={<DashBoardView />}>

        <Route
          path="usuario/*"
          element={
            <ProtectedRoute permission="ver usuarios">
              <UsuarioRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="rol/*"
          element={
            <ProtectedRoute permission="ver roles">
              <RolRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="productos/*"
          element={
            <ProtectedRoute permission="ver productos">
              <ProductoRoutes />
            </ProtectedRoute>
          }
        />

        <Route path="scan" element={<ScanView />} />

      </Route>

    </Routes>
  )
}