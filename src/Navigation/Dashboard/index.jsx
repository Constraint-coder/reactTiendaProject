import {Routes, Route} from 'react-router'
import DashBoardView from '../../views/Layout/DashBoard.view'
import { UsuarioRoutes } from './usuario'
import { RolRoutes } from './rol'
import { VentasView } from '../../views/ventas/VentasView'
import { ProductoRoutes } from './productos'

export function DashboardRoute(){
return(
       <Routes>
        <Route path='/dashboard' element={<DashBoardView />}>
          <Route path="usuario/*" element={<UsuarioRoutes />} />
          <Route path="rol/*" element={<RolRoutes />} />
          <Route path="ventas/*" element={<VentasView />} />
          <Route path="productos/*" element={<ProductoRoutes />} />

        </Route>
       </Routes>
    )
}