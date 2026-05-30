import { Routes, Route } from 'react-router'
import { CodigosBarraView } from '../../views/codigodeBarra/CodigoBarraview'

export const CodigoBarraRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<CodigosBarraView />} />
    </Routes>
  )
}