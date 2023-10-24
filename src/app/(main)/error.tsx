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
      <h2>{error} || Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
