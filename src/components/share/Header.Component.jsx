import React from 'react'
import { useLayout } from '../../context/SidebarContext'
import { FaAlignJustify } from "react-icons/fa6";


export default function Header() {
   const { toggleMenu } = useLayout()
  return (
    <header className="bg-white shadow-sm">
        <div className='absolute top-6 left-2 z-50'>
              <button onClick={toggleMenu}>
              <FaAlignJustify />
            </button>
            </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          <div className="flex items-center">
           
            
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">Super</span>
            </div>
            {/* <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Team</a>
                <a href="#" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                <a href="#" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
              </div>
            </div> */}
          </div>
          <div className="flex items-center">
            {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Crear Evento
            </button> */}
            <div className="ml-4 relative">
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}