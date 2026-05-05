import {Routes, Route} from 'react-router'
import DashBoardView from '../../views/Layout/DashBoard.view'
import { UsuarioRoutes } from './usuario'

export function DashboardRoute(){
return(
       <Routes>
        <Route path='/dashboard' element={<DashBoardView />}>
          <Route path="usuario/*" element={<UsuarioRoutes />} />

        </Route>
       </Routes>
    )
}