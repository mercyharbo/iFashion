// useToken.ts
import { useEffect, useState } from 'react'

function useToken(): string | null {
  const [token, setToken] = useState<string | null>(null)

  console.log(token, 'as token')

  useEffect(() => {
    // Retrieve the token from localStorage when the component mounts
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  return token
}

export default useToken
