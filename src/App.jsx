import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { DashboardRoute } from './Navigation/Dashboard'
import { Auth } from './Navigation/auth'
import './utils/css/app.css'
import { LayoutProvider } from './context/SidebarContext'

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'))

  return (
    <LayoutProvider>
      <Routes>
        <Route path='/login' element={<Auth />} />
        <Route 
          path='/*' 
          element={isLogin ? <DashboardRoute /> : <Navigate to='/login' />} 
        />
      </Routes>
    </LayoutProvider>
  )
}

export default App