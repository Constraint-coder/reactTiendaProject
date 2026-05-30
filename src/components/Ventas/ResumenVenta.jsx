export default function ResumenVenta({ total, onFinalizar, disabled }) {
  return (
    <div className='flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-6 py-4'>
      <h3 className='text-lg font-semibold text-gray-900'>
        Total: <span className='text-emerald-600'>${total}</span>
      </h3>
      <button
        onClick={onFinalizar}
        disabled={disabled}
        className='bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors'
      >
        Finalizar Venta
      </button>
    </div>
  )
}