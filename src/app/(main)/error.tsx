'use client'

export default function Error({
  error,
  reset,
}: {
  error: string
  reset: () => void
}) {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center gap-3'>
      <h2>{error}</h2>
      <button
        onClick={() => reset()}
        className='bg-black text-white py-2 px-5 rounded-md '
      >
        Try again
      </button>
    </div>
  )
}
