import React from 'react'
import { Outlet } from 'react-router'
import Header from '../../components/share/Header.Component'
import { MenuLateral } from '../../components/share/MenuLateral.component'

export default function DashBoardView() {
  return (
   <div className="flex h-screen">
      <MenuLateral />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-4 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}