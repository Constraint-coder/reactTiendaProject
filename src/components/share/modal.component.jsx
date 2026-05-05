import React from 'react'

export function Modal({isOpen, onClose, children}) {
    if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
        <div className='relative bg-white rounded-lg p-6 w-1/2'>
            {children}
        </div>
    </div>
  )
}
