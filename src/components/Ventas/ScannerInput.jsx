export default function ScannerInput({ codigo, setCodigo, onScan, mensaje }) {
  return (
    <div className='mb-6'>
      <form onSubmit={onScan} className='flex gap-2'>
        <input
          autoFocus
          type='text'
          placeholder='Escanear código de barras'
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className='border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500'
        />
        <button type='submit' className='bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium'>
          Agregar
        </button>
      </form>
      {mensaje && <p className='text-sm mt-2 text-gray-500'>{mensaje}</p>}
    </div>
  )
}